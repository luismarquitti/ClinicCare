import { describe, it, expect, beforeEach, vi } from 'vitest';

// Because vi.mock is hoisted, we need to put mock variables in vi.hoisted or define them inside the mock.
const {
  mockSignIn,
  mockSignOut,
  mockAddDoc,
  mockUpdateDoc,
  mockCollection,
  mockDoc,
  mockOnSnapshot
} = vi.hoisted(() => ({
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
  mockAddDoc: vi.fn(),
  mockUpdateDoc: vi.fn(),
  mockCollection: vi.fn((db, name) => name),
  mockDoc: vi.fn((db, collection, id) => `${collection}/${id}`),
  mockOnSnapshot: vi.fn((ref, callback) => {
    callback({ docs: [] });
    return vi.fn(); // return unsubscribe function
  })
}));

// Mock firebase/auth
vi.mock('firebase/auth', () => ({
  getAuth: vi.fn(() => ({})),
  setPersistence: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn(),
  browserLocalPersistence: 'browserLocalPersistence',
  signInWithEmailAndPassword: (...args: any[]) => mockSignIn(...args),
  signOut: (...args: any[]) => mockSignOut(...args),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => ({}))
}));

vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: mockCollection,
  onSnapshot: mockOnSnapshot,
  doc: mockDoc,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc
}));

vi.mock('firebase/storage', () => ({
  getStorage: vi.fn()
}));

vi.mock('firebase/functions', () => ({
  getFunctions: vi.fn()
}));

import { useAppStore } from './index';

describe('useAppStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAppStore.setState({
      user: null,
      isLoadingAuth: true,
      medications: [],
      administrations: []
    });
  });

  describe('Auth Persistence', () => {
    it('should have initial isLoadingAuth set to true', () => {
      const state = useAppStore.getState();
      expect(state.isLoadingAuth).toBe(true);
    });

    it('should update isLoadingAuth via setAuthLoading action', () => {
      const { setAuthLoading } = useAppStore.getState();

      setAuthLoading(false);
      expect(useAppStore.getState().isLoadingAuth).toBe(false);

      setAuthLoading(true);
      expect(useAppStore.getState().isLoadingAuth).toBe(true);
    });

    it('should have initial user set to null', () => {
      const state = useAppStore.getState();
      expect(state.user).toBeNull();
    });
  });

  describe('Authentication', () => {
    it('login calls signInWithEmailAndPassword', async () => {
      const { login } = useAppStore.getState();
      await login('test@test.com', 'password');
      expect(mockSignIn).toHaveBeenCalledWith(expect.anything(), 'test@test.com', 'password');
    });

    it('logout calls signOut and resets user', async () => {
      // Setup some user state first
      useAppStore.setState({ user: { id: '1', name: 'User', role: 'admin' } as any });
      expect(useAppStore.getState().user).not.toBeNull();

      const { logout } = useAppStore.getState();
      await logout();

      expect(mockSignOut).toHaveBeenCalled();
      expect(useAppStore.getState().user).toBeNull();
    });
  });

  describe('Firestore Actions', () => {
    it('addResident calls addDoc with residents collection', async () => {
      mockAddDoc.mockResolvedValueOnce({ id: 'new-id' });
      const { addResident } = useAppStore.getState();

      const resident = { name: 'João' } as any;
      await addResident(resident);

      expect(mockCollection).toHaveBeenCalledWith(undefined, 'residents');
      expect(mockAddDoc).toHaveBeenCalledWith('residents', resident);
    });

    it('addMedication adds medication, generates administrations and notification', async () => {
      mockAddDoc.mockResolvedValue({ id: 'med-id' });
      const { addMedication } = useAppStore.getState();

      const medication = { name: 'Aspirina', residentId: 'res-1' } as any;
      await addMedication(medication);

      expect(mockCollection).toHaveBeenCalledWith(undefined, 'medications');
      // 1 medication + 3 schedules + 1 notification = 5 calls
      expect(mockAddDoc).toHaveBeenCalledTimes(5);

      // Check the medication was added
      expect(mockAddDoc).toHaveBeenCalledWith('medications', medication);

      // Check the administrations were generated
      expect(mockAddDoc).toHaveBeenCalledWith('administrations', expect.objectContaining({
        medicationId: 'med-id',
        residentId: 'res-1',
        status: 'pendente'
      }));

      // Check the notification was added
      expect(mockAddDoc).toHaveBeenCalledWith('notifications', expect.objectContaining({
        type: 'info',
        targetRole: 'saude'
      }));
    });

    it('updateAdministrationStatus updates doc and handles billing generation if administrado', async () => {
      useAppStore.setState({
        medications: [{ id: 'med-1', name: 'Aspirina' } as any],
        administrations: [{ id: 'admin-1', medicationId: 'med-1', residentId: 'res-1' } as any]
      });

      const { updateAdministrationStatus } = useAppStore.getState();

      // Call with 'administrado'
      await updateAdministrationStatus('admin-1', 'administrado', 'user-1', 'notes here');

      // Check updateDoc
      expect(mockDoc).toHaveBeenCalledWith(undefined, 'administrations', 'admin-1');
      expect(mockUpdateDoc).toHaveBeenCalledWith('administrations/admin-1', expect.objectContaining({
        status: 'administrado',
        administeredBy: 'user-1',
        notes: 'notes here'
      }));

      // Check billingItem was added
      expect(mockCollection).toHaveBeenCalledWith(undefined, 'billingItems');
      expect(mockAddDoc).toHaveBeenCalledWith('billingItems', expect.objectContaining({
        residentId: 'res-1',
        type: 'variavel',
        description: 'Administração de Aspirina',
        status: 'pendente'
      }));
    });

    it('updateAdministrationStatus does not generate billing if status is not administrado', async () => {
      useAppStore.setState({
        medications: [{ id: 'med-1', name: 'Aspirina' } as any],
        administrations: [{ id: 'admin-1', medicationId: 'med-1', residentId: 'res-1' } as any]
      });

      const { updateAdministrationStatus } = useAppStore.getState();

      // Call with 'recusado'
      await updateAdministrationStatus('admin-1', 'recusado', 'user-1');

      expect(mockUpdateDoc).toHaveBeenCalledWith('administrations/admin-1', expect.objectContaining({
        status: 'recusado',
        administeredBy: 'user-1'
      }));

      // Check billingItem was NOT added
      expect(mockAddDoc).not.toHaveBeenCalled();
    });
  });

  describe('Listeners', () => {
    it('initializeListeners sets up onSnapshot for multiple collections and returns an unsubscribe function', () => {
      const { initializeListeners } = useAppStore.getState();
      const unsubscribe = initializeListeners();

      expect(mockOnSnapshot).toHaveBeenCalled();
      // Should have been called for 'residents', 'vitalSigns', etc.
      expect(mockCollection).toHaveBeenCalledWith(undefined, 'residents');

      expect(typeof unsubscribe).toBe('function');

      unsubscribe();
      // the unsubscribe mock functions returned by mockOnSnapshot should have been called
    });
  });
});
