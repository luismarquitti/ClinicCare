import { create } from 'zustand';
import { User, Resident, Role, VitalSign, EvolutionRecord, Medication, MedicationAdministration, BillingItem, MaintenanceLog, Employee, InventoryItem, ExpenseItem, ShoppingList, PriceHistory, Asset, WorkOrder, SalaryAdvance } from '../types';
import { db, auth } from '../services/firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, Timestamp, setDoc } from 'firebase/firestore';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole: Role | 'all';
  read: boolean;
  createdAt: string;
}

interface AppState {
  theme: 'light' | 'dark';
  user: User | null;
  residents: Resident[];
  vitalSigns: VitalSign[];
  evolutionRecords: EvolutionRecord[];
  medications: Medication[];
  administrations: MedicationAdministration[];
  billingItems: BillingItem[];
  maintenanceLogs: MaintenanceLog[];
  notifications: Notification[];
  employees: Employee[];
  inventory: InventoryItem[];
  expenses: ExpenseItem[];
  shoppingLists: ShoppingList[];
  priceHistories: PriceHistory[];
  assets: Asset[];
  workOrders: WorkOrder[];
  salaryAdvances: SalaryAdvance[];

  // Listeners initialization
  initializeListeners: () => () => void; // Returns an unsubscribe function

  // Actions
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  addResident: (resident: Omit<Resident, 'id'>) => Promise<void>;
  updateResident: (id: string, resident: Partial<Resident>) => Promise<void>;

  addVitalSign: (vitalSign: Omit<VitalSign, 'id'>) => Promise<void>;
  addEvolutionRecord: (record: Omit<EvolutionRecord, 'id'>) => Promise<void>;

  addMedication: (medication: Omit<Medication, 'id'>) => Promise<void>;
  addAdministration: (admin: Omit<MedicationAdministration, 'id'>) => Promise<void>;
  updateAdministrationStatus: (id: string, status: MedicationAdministration['status'], userId: string, notes?: string) => Promise<void>;

  addBillingItem: (item: Omit<BillingItem, 'id'>) => Promise<void>;
  addExpense: (expense: Omit<ExpenseItem, 'id'>) => Promise<void>;

  addMaintenanceLog: (log: Omit<MaintenanceLog, 'id'>) => Promise<void>;

  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => Promise<void>;
  updateInventoryQuantity: (id: string, newQuantity: number) => Promise<void>;
  addShoppingList: (list: Omit<ShoppingList, 'id'>) => Promise<void>;
  updateShoppingListStatus: (id: string, status: ShoppingList['status']) => Promise<void>;
  addPriceHistory: (history: Omit<PriceHistory, 'id'>) => Promise<void>;

  addAsset: (asset: Omit<Asset, 'id'>) => Promise<void>;
  updateAsset: (id: string, asset: Partial<Asset>) => Promise<void>;
  addWorkOrder: (order: Omit<WorkOrder, 'id'>) => Promise<void>;
  updateWorkOrderStatus: (id: string, status: WorkOrder['status'], completedAt?: string, cost?: number) => Promise<void>;

  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  addSalaryAdvance: (advance: Omit<SalaryAdvance, 'id'>) => Promise<void>;
  updateSalaryAdvanceStatus: (id: string, status: SalaryAdvance['status']) => Promise<void>;

  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAppStore = create<AppState>((set, get) => ({
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  user: null, // Start unauthenticated
  residents: [],
  vitalSigns: [],
  evolutionRecords: [],
  medications: [],
  administrations: [],
  billingItems: [],
  maintenanceLogs: [],
  notifications: [],
  expenses: [],
  shoppingLists: [],
  priceHistories: [],
  assets: [],
  workOrders: [],
  salaryAdvances: [],
  employees: [
    { id: '1', name: 'Dra. Silva', role: 'Médica', status: 'on_duty' },
    { id: '2', name: 'Enf. João', role: 'Enfermeiro', status: 'on_duty' },
    { id: '3', name: 'Maria Souza', role: 'Técnica', status: 'off_duty' }
  ],
  inventory: [
    { id: '1', name: 'Dipirona 500mg', category: 'medication', quantity: 50, minQuantity: 100, unit: 'un' },
    { id: '2', name: 'Luvas P', category: 'supply', quantity: 2, minQuantity: 5, unit: 'cx' },
    { id: '3', name: 'Insulina', category: 'medication', quantity: 15, minQuantity: 10, unit: 'frasco' }
  ],

  initializeListeners: () => {
    import('firebase/auth').then(({ onAuthStateChanged }) => {
      import('firebase/firestore').then(({ doc, getDoc }) => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userDocRef = doc(db, 'users', firebaseUser.uid);
              const userDoc = await getDoc(userDocRef);
              const userData = userDoc.exists() ? userDoc.data() : { role: 'saude' as Role };

              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email || '',
                  displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                  role: userData.role as Role
                }
              });
            } catch (err) {
              console.error('Failed to fetch user role:', err);
              // Fallback
              set({ user: { uid: firebaseUser.uid, email: firebaseUser.email || '', displayName: 'User', role: 'saude' } });
            }
          } else {
            set({ user: null });
          }
        });
      });
    });

    const unsubResidents = onSnapshot(collection(db, 'residents'), (snapshot) => {
      set({ residents: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Resident)) });
    });
    const unsubVitalSigns = onSnapshot(collection(db, 'vitalSigns'), (snapshot) => {
      set({ vitalSigns: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as VitalSign)) });
    });
    const unsubEvolution = onSnapshot(collection(db, 'evolutionRecords'), (snapshot) => {
      set({ evolutionRecords: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EvolutionRecord)) });
    });
    const unsubMedications = onSnapshot(collection(db, 'medications'), (snapshot) => {
      set({ medications: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Medication)) });
    });
    const unsubAdministrations = onSnapshot(collection(db, 'administrations'), (snapshot) => {
      set({ administrations: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MedicationAdministration)) });
    });
    const unsubBilling = onSnapshot(collection(db, 'billingItems'), (snapshot) => {
      set({ billingItems: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BillingItem)) });
    });
    const unsubMaintenance = onSnapshot(collection(db, 'maintenanceLogs'), (snapshot) => {
      set({ maintenanceLogs: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MaintenanceLog)) });
    });
    const unsubNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      set({ notifications: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)) });
    });
    const unsubExpenses = onSnapshot(collection(db, 'expenses'), (snapshot) => {
      set({ expenses: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExpenseItem)) });
    });
    const unsubInventory = onSnapshot(collection(db, 'inventoryItems'), (snapshot) => {
      set({ inventory: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as InventoryItem)) });
    });
    const unsubShoppingLists = onSnapshot(collection(db, 'shoppingLists'), (snapshot) => {
      set({ shoppingLists: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ShoppingList)) });
    });
    const unsubPriceHistories = onSnapshot(collection(db, 'priceHistories'), (snapshot) => {
      set({ priceHistories: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PriceHistory)) });
    });
    const unsubAssets = onSnapshot(collection(db, 'assets'), (snapshot) => {
      set({ assets: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Asset)) });
    });
    const unsubWorkOrders = onSnapshot(collection(db, 'workOrders'), (snapshot) => {
      set({ workOrders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WorkOrder)) });
    });
    const unsubEmployees = onSnapshot(collection(db, 'employees'), (snapshot) => {
      set({ employees: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee)) });
    });
    const unsubSalaryAdvances = onSnapshot(collection(db, 'salaryAdvances'), (snapshot) => {
      set({ salaryAdvances: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SalaryAdvance)) });
    });

    return () => {
      unsubResidents();
      unsubVitalSigns();
      unsubEvolution();
      unsubMedications();
      unsubAdministrations();
      unsubBilling();
      unsubMaintenance();
      unsubNotifications();
      unsubExpenses();
      unsubInventory();
      unsubShoppingLists();
      unsubPriceHistories();
      unsubAssets();
      unsubWorkOrders();
      unsubEmployees();
      unsubSalaryAdvances();
    };
  },

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    set({ theme });
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
  },

  login: async (email, password) => {
    // Note: the login action signature changed, requiring a small update to Login.tsx as well
    // we use dynamic import to avoid altering the root imports if possible, or just standard if acceptable
    const { signInWithEmailAndPassword } = await import('firebase/auth');
    await signInWithEmailAndPassword(auth, email, password);
  },
  logout: async () => {
    const { signOut } = await import('firebase/auth');
    await signOut(auth);
    set({ user: null });
  },

  addResident: async (resident) => {
    await addDoc(collection(db, 'residents'), resident);
  },
  updateResident: async (id, updated) => {
    await updateDoc(doc(db, 'residents', id), updated);
  },

  addVitalSign: async (vitalSign) => {
    await addDoc(collection(db, 'vitalSigns'), vitalSign);
  },
  addEvolutionRecord: async (record) => {
    await addDoc(collection(db, 'evolutionRecords'), record);
  },

  addMedication: async (medication) => {
    const medRef = await addDoc(collection(db, 'medications'), medication);

    // Auto-generate some initial MedicationAdministration records for the Nursing dashboard
    const now = new Date();
    const schedules = [
      new Date(now.getTime() - 1000 * 60 * 60), // 1 hour ago (Pending)
      new Date(now.getTime() + 1000 * 60 * 60 * 4), // 4 hours from now
      new Date(now.getTime() + 1000 * 60 * 60 * 24), // Tomorrow
    ];

    for (const schedule of schedules) {
      await addDoc(collection(db, 'administrations'), {
        medicationId: medRef.id,
        residentId: medication.residentId,
        scheduledTime: schedule.toISOString(),
        status: 'pendente'
      } as Partial<MedicationAdministration>);
    }

    // Cloud Functions should ideally handle the notification creation server-side,
    // but we simulate it here by adding to the notifications collection:
    const newNotification: Omit<Notification, 'id'> = {
      message: `Nova medicação prescrita: ${medication.name}`,
      type: 'info',
      targetRole: 'saude',
      read: false,
      createdAt: new Date().toISOString()
    };
    await addDoc(collection(db, 'notifications'), newNotification);
  },
  addAdministration: async (admin) => {
    await addDoc(collection(db, 'administrations'), admin);
  },
  updateAdministrationStatus: async (id, status, userId, notes) => {
    const admin = get().administrations.find(a => a.id === id);
    if (!admin) return;

    await updateDoc(doc(db, 'administrations', id), {
      status,
      administeredBy: userId,
      administeredTime: new Date().toISOString(),
      notes
    });

    // Simulate Cloud Function Trigger for Billing
    if (status === 'administrado' && admin.medicationId) {
      const med = get().medications.find(m => m.id === admin.medicationId);
      if (med) {
        await addDoc(collection(db, 'billingItems'), {
          residentId: admin.residentId,
          date: new Date().toISOString(),
          description: `Administração de ${med.name}`,
          amount: 15.00, // Mock cost
          type: 'variavel',
          status: 'pendente'
        });
      }
    }
  },

  addBillingItem: async (item) => {
    await addDoc(collection(db, 'billingItems'), item);
  },

  addExpense: async (expense) => {
    await addDoc(collection(db, 'expenses'), expense);
  },

  addMaintenanceLog: async (log) => {
    await addDoc(collection(db, 'maintenanceLogs'), log);
  },

  addInventoryItem: async (item) => {
    await addDoc(collection(db, 'inventoryItems'), item);
  },
  updateInventoryQuantity: async (id, newQuantity) => {
    await updateDoc(doc(db, 'inventoryItems', id), { quantity: newQuantity });
  },
  addShoppingList: async (list) => {
    await addDoc(collection(db, 'shoppingLists'), list);
  },
  updateShoppingListStatus: async (id, status) => {
    await updateDoc(doc(db, 'shoppingLists', id), { status });
  },
  addPriceHistory: async (history) => {
    await addDoc(collection(db, 'priceHistories'), history);
  },

  addAsset: async (asset) => {
    await addDoc(collection(db, 'assets'), asset);
  },
  updateAsset: async (id, updated) => {
    await updateDoc(doc(db, 'assets', id), updated);
  },
  addWorkOrder: async (order) => {
    await addDoc(collection(db, 'workOrders'), order);
  },
  updateWorkOrderStatus: async (id, status, completedAt, cost) => {
    const data: Partial<WorkOrder> = { status };
    if (completedAt) data.completedAt = completedAt;
    if (cost) data.cost = cost;
    await updateDoc(doc(db, 'workOrders', id), data);
  },
  addEmployee: async (employee) => {
    await addDoc(collection(db, 'employees'), employee);
  },
  updateEmployee: async (id, updated) => {
    await updateDoc(doc(db, 'employees', id), updated);
  },
  addSalaryAdvance: async (advance) => {
    await addDoc(collection(db, 'salaryAdvances'), advance);
  },
  updateSalaryAdvanceStatus: async (id, status) => {
    await updateDoc(doc(db, 'salaryAdvances', id), { status });
  },

  addNotification: async (notification) => {
    await addDoc(collection(db, 'notifications'), {
      ...notification,
      read: false,
      createdAt: new Date().toISOString()
    });
  },
  markNotificationAsRead: async (id) => {
    await updateDoc(doc(db, 'notifications', id), { read: true });
  },
}));
