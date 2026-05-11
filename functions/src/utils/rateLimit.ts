import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';

async function increment(key: string, maxRequests: number, windowSeconds: number): Promise<boolean> {
  const db = getFirestore();
  const windowMs = windowSeconds * 1000;
  const now = Date.now();
  const ref = db.collection('_rateLimits').doc(key);
  let limited = false;

  await db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    const data = doc.data();

    if (!data || (data.expiresAt as Timestamp).toMillis() < now) {
      tx.set(ref, { count: 1, expiresAt: Timestamp.fromMillis(now + windowMs) });
      return;
    }

    if ((data.count as number) >= maxRequests) {
      limited = true;
      return;
    }

    tx.update(ref, { count: FieldValue.increment(1) });
  });

  return limited;
}

/** Throws HttpsError when limit is exceeded — use inside onCall handlers. */
export async function checkRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<void> {
  const limited = await increment(key, maxRequests, windowSeconds);
  if (limited) {
    throw new HttpsError('resource-exhausted', 'Rate limit exceeded. Please try again later.');
  }
}

/** Throws plain Error when limit is exceeded — use inside onRequest handlers. */
export async function checkIpRateLimit(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<void> {
  const limited = await increment(key, maxRequests, windowSeconds);
  if (limited) {
    throw new Error('Rate limit exceeded');
  }
}
