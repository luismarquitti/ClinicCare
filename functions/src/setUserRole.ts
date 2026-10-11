import { onCall, HttpsError, CallableRequest } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { writeAuditLog } from './utils/audit';
import { checkRateLimit } from './utils/rateLimit';

const VALID_ROLES = ['admin', 'clinico', 'tecnico', 'financeiro', 'rh'] as const;
type Role = (typeof VALID_ROLES)[number];

interface SetUserRoleData {
  uid: string;
  role: string;
}

export const setUserRole = onCall(
  { region: 'us-central1' },
  async (request: CallableRequest<SetUserRoleData>) => {
    if (!request.auth) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }

    if (request.auth.token['role'] !== 'superAdmin') {
      throw new HttpsError('permission-denied', 'Only superAdmin can assign roles.');
    }

    await checkRateLimit(`setUserRole:${request.auth.uid}`, 20, 3600);

    const { uid, role } = request.data;

    if (!uid || typeof uid !== 'string') {
      throw new HttpsError('invalid-argument', 'uid is required.');
    }

    if (!VALID_ROLES.includes(role as Role)) {
      throw new HttpsError(
        'invalid-argument',
        `role must be one of: ${VALID_ROLES.join(', ')}`
      );
    }

    await getAuth().setCustomUserClaims(uid, { role });

    await writeAuditLog({
      action: 'setUserRole',
      by: request.auth.uid,
      uid,
      role,
      timestamp: new Date(),
    });

    return { success: true };
  }
);
