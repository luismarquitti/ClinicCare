import { onCall, HttpsError, CallableRequest } from 'firebase-functions/v2/https';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { randomBytes } from 'crypto';
import { writeAuditLog } from './utils/audit';
import { checkRateLimit } from './utils/rateLimit';

const VALID_ROLES = ['admin', 'clinico', 'tecnico', 'financeiro', 'rh'] as const;
type Role = (typeof VALID_ROLES)[number];

const INVITE_TTL_HOURS = 48;

interface SendInviteData {
  email: string;
  role: string;
}

export const sendInvite = onCall(
  { region: 'us-central1' },
  async (request: CallableRequest<SendInviteData>) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }

    const callerRole = request.auth.token['role'] as string | undefined;
    if (callerRole !== 'superAdmin' && callerRole !== 'admin') {
      throw new HttpsError('permission-denied', 'Only superAdmin or admin can send invites.');
    }

    await checkRateLimit(`sendInvite:${request.auth.uid}`, 10, 3600);

    const { email, role } = request.data;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      throw new HttpsError('invalid-argument', 'A valid email address is required.');
    }

    if (!VALID_ROLES.includes(role as Role)) {
      throw new HttpsError(
        'invalid-argument',
        `role must be one of: ${VALID_ROLES.join(', ')}`
      );
    }

    // Prevent admins from inviting other admins (privilege escalation)
    if (callerRole === 'admin' && role === 'admin') {
      throw new HttpsError('permission-denied', 'Admins cannot invite other admins.');
    }

    const db = getFirestore();
    const token = randomBytes(32).toString('hex');
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + INVITE_TTL_HOURS * 3_600_000)
    );

    await db.collection('invites').doc(token).set({
      email,
      role,
      invitedBy: request.auth.uid,
      createdAt: Timestamp.now(),
      expiresAt,
      consumed: false,
    });

    // Trigger Email extension picks up documents in the `mail` collection.
    // Requires the "Trigger Email from Firestore" extension to be installed.
    const appUrl = process.env.APP_URL ?? 'https://cliniccare-app-lm.web.app';
    await db.collection('mail').add({
      to: email,
      message: {
        subject: 'Convite para o ClinicCare',
        html: `
          <p>Você foi convidado para acessar o ClinicCare com o perfil <strong>${role}</strong>.</p>
          <p>
            <a href="${appUrl}/invite/accept?token=${token}">Clique aqui para aceitar o convite</a>
          </p>
          <p>Este link expira em ${INVITE_TTL_HOURS} horas.</p>
        `,
      },
    });

    await writeAuditLog({
      action: 'sendInvite',
      by: request.auth.uid,
      email,
      role,
      timestamp: new Date(),
    });

    return { success: true };
  }
);
