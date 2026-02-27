import { create } from 'zustand';
import { User, Resident, Role, VitalSign, EvolutionRecord, Medication, MedicationAdministration, BillingItem, MaintenanceLog } from '../types';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetRole: Role | 'all';
  read: boolean;
  createdAt: string;
}

interface AppState {
  user: User | null;
  residents: Resident[];
  vitalSigns: VitalSign[];
  evolutionRecords: EvolutionRecord[];
  medications: Medication[];
  administrations: MedicationAdministration[];
  billingItems: BillingItem[];
  maintenanceLogs: MaintenanceLog[];
  notifications: Notification[];
  
  // Actions
  login: (email: string, role: Role) => void;
  logout: () => void;
  
  addResident: (resident: Omit<Resident, 'id'>) => void;
  updateResident: (id: string, resident: Partial<Resident>) => void;
  
  addVitalSign: (vitalSign: Omit<VitalSign, 'id'>) => void;
  addEvolutionRecord: (record: Omit<EvolutionRecord, 'id'>) => void;
  
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  addAdministration: (admin: Omit<MedicationAdministration, 'id'>) => void;
  updateAdministrationStatus: (id: string, status: MedicationAdministration['status'], userId: string, notes?: string) => void;
  
  addBillingItem: (item: Omit<BillingItem, 'id'>) => void;
  
  addMaintenanceLog: (log: Omit<MaintenanceLog, 'id'>) => void;

  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationAsRead: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock Initial Data
const mockResidents: Resident[] = [
  { id: 'r1', name: 'João Silva', birthDate: '1945-05-12', cpf: '111.222.333-44', room: '101A', status: 'ativo', emergencyContact: '(11) 98888-7777', admissionDate: '2023-01-10', allergies: ['Penicilina'], comorbidities: ['Hipertensão'], bloodType: 'O+' },
  { id: 'r2', name: 'Maria Oliveira', birthDate: '1938-11-20', cpf: '555.666.777-88', room: '102B', status: 'ativo', emergencyContact: '(11) 99999-0000', admissionDate: '2022-06-15', allergies: [], comorbidities: ['Diabetes', 'Artrose'], bloodType: 'A-' },
];

export const useAppStore = create<AppState>((set) => ({
  user: null, // Start unauthenticated
  residents: mockResidents,
  vitalSigns: [],
  evolutionRecords: [],
  medications: [
    { id: 'm1', residentId: 'r1', name: 'Losartana 50mg', dosage: '1 comp', frequency: '12/12h', startDate: '2023-01-10', active: true }
  ],
  administrations: [
    { id: 'a1', medicationId: 'm1', residentId: 'r1', scheduledTime: new Date().toISOString(), status: 'pendente' }
  ],
  billingItems: [],
  maintenanceLogs: [
    { id: 'm1', date: new Date().toISOString(), description: 'Troca do filtro do ar condicionado', location: 'Quarto 101A', type: 'preventiva', cost: 150, recordedBy: 'u1' }
  ],
  notifications: [
    { id: 'n1', message: 'Novo ticket de manutenção aberto: Ar condicionado', type: 'warning', targetRole: 'manutencao', read: false, createdAt: new Date().toISOString() },
    { id: 'n2', message: 'Medicação pendente para João Silva', type: 'info', targetRole: 'saude', read: false, createdAt: new Date().toISOString() }
  ],

  login: (email, role) => set({ user: { uid: generateId(), email, displayName: email.split('@')[0], role } }),
  logout: () => set({ user: null }),

  addResident: (resident) => set((state) => ({ residents: [...state.residents, { ...resident, id: generateId() }] })),
  updateResident: (id, updated) => set((state) => ({ residents: state.residents.map(r => r.id === id ? { ...r, ...updated } : r) })),

  addVitalSign: (vitalSign) => set((state) => ({ vitalSigns: [...state.vitalSigns, { ...vitalSign, id: generateId() }] })),
  addEvolutionRecord: (record) => set((state) => ({ evolutionRecords: [...state.evolutionRecords, { ...record, id: generateId() }] })),

  addMedication: (medication) => set((state) => {
    // Mock Cloud Function trigger: Notify nurses when new medication is added
    const newNotification: Notification = {
      id: generateId(),
      message: `Nova medicação prescrita: ${medication.name}`,
      type: 'info',
      targetRole: 'saude',
      read: false,
      createdAt: new Date().toISOString()
    };
    return { 
      medications: [...state.medications, { ...medication, id: generateId() }],
      notifications: [newNotification, ...state.notifications]
    };
  }),
  addAdministration: (admin) => set((state) => ({ administrations: [...state.administrations, { ...admin, id: generateId() }] })),
  updateAdministrationStatus: (id, status, userId, notes) => set((state) => {
    const admin = state.administrations.find(a => a.id === id);
    if (!admin) return state;
    
    // Simulate Cloud Function Trigger for Billing
    let newBillingItems = [...state.billingItems];
    if (status === 'administrado' && admin.medicationId) {
      const med = state.medications.find(m => m.id === admin.medicationId);
      if (med) {
        newBillingItems.push({
          id: generateId(),
          residentId: admin.residentId,
          date: new Date().toISOString(),
          description: `Administração de ${med.name}`,
          amount: 15.00, // Mock cost
          type: 'variavel',
          status: 'pendente'
        });
      }
    }

    return {
      administrations: state.administrations.map(a => a.id === id ? { ...a, status, administeredBy: userId, administeredTime: new Date().toISOString(), notes } : a),
      billingItems: newBillingItems
    };
  }),

  addBillingItem: (item) => set((state) => ({ billingItems: [...state.billingItems, { ...item, id: generateId() }] })),
  
  addMaintenanceLog: (log) => set((state) => ({ maintenanceLogs: [{ ...log, id: generateId() }, ...state.maintenanceLogs] })),

  addNotification: (notification) => set((state) => ({
    notifications: [{ ...notification, id: generateId(), read: false, createdAt: new Date().toISOString() }, ...state.notifications]
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
}));
