import { getFirestore, Timestamp } from 'firebase-admin/firestore';

interface AuditLogEntry {
  action: string;
  timestamp: Date;
  [key: string]: unknown;
}

export async function writeAuditLog(entry: AuditLogEntry): Promise<void> {
  const { timestamp, ...rest } = entry;
  await getFirestore()
    .collection('auditLogs')
    .add({ ...rest, timestamp: Timestamp.fromDate(timestamp) });
}
