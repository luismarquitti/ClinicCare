import { initializeApp } from 'firebase-admin/app';

initializeApp();

export { setUserRole } from './setUserRole';
export { sendInvite } from './sendInvite';
export { acceptInvite } from './acceptInvite';
