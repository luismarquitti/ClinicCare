import { onRequest } from 'firebase-functions/v2/https';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { writeAuditLog } from './utils/audit';
import { checkIpRateLimit } from './utils/rateLimit';

export const acceptInvite = onRequest(
  { region: 'us-central1', cors: false },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const clientIp =
      (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0].trim() ??
      req.ip ??
      'unknown';

    try {
      await checkIpRateLimit(`acceptInvite:${clientIp}`, 5, 3600);
    } catch {
      res.status(429).json({ error: 'Too many requests. Please try again later.' });
      return;
    }

    const body = req.body as { token?: unknown; password?: unknown };
    const { token, password } = body;

    if (!token || typeof token !== 'string') {
      res.status(400).json({ error: 'token is required.' });
      return;
    }

    if (!password || typeof password !== 'string') {
      res.status(400).json({ error: 'password is required.' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters.' });
      return;
    }

    const db = getFirestore();
    const inviteRef = db.collection('invites').doc(token);
    const inviteDoc = await inviteRef.get();

    if (!inviteDoc.exists) {
      res.status(400).json({ error: 'Invalid or expired invite.' });
      return;
    }

    const invite = inviteDoc.data()!;

    if (invite['consumed'] === true) {
      res.status(400).json({ error: 'This invite has already been used.' });
      return;
    }

    const expiresAt = invite['expiresAt'] as Timestamp;
    if (expiresAt.toMillis() < Date.now()) {
      res.status(400).json({ error: 'This invite has expired.' });
      return;
    }

    const email = invite['email'] as string;
    const role = invite['role'] as string;
    const invitedBy = invite['invitedBy'] as string;

    try {
      const userRecord = await getAuth().createUser({ email, password });

      await getAuth().setCustomUserClaims(userRecord.uid, { role });

      await inviteRef.update({
        consumed: true,
        consumedAt: Timestamp.now(),
        consumedBy: userRecord.uid,
      });

      await writeAuditLog({
        action: 'acceptInvite',
        uid: userRecord.uid,
        email,
        role,
        invitedBy,
        timestamp: new Date(),
      });

      res.status(200).json({ success: true, uid: userRecord.uid });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/email-already-exists') {
        res.status(409).json({ error: 'An account with this email already exists.' });
      } else {
        console.error('acceptInvite error:', err);
        res.status(500).json({ error: 'Failed to create account. Please try again.' });
      }
    }
  }
);
