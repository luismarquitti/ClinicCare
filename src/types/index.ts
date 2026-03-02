export type Role = 'admin' | 'saude' | 'financeiro' | 'manutencao' | 'rh';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: Role;
}

export interface Resident {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  room: string;
  status: 'ativo' | 'inativo';
  emergencyContact: string;
  admissionDate: string;
  allergies: string[];
  comorbidities: string[];
  bloodType: string;
}

export interface VitalSign {
  id: string;
  residentId: string;
  date: string;
  bloodPressure: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
  recordedBy: string; // User ID
}

export interface EvolutionRecord {
  id: string;
  residentId: string;
  date: string;
  notes: string;
  recordedBy: string; // User ID
}

export interface Medication {
  id: string;
  residentId: string;
  name: string;
  dosage: string;
  frequency: string; // e.g., "8/8h"
  startDate: string;
  endDate?: string;
  active: boolean;
}

export interface MedicationAdministration {
  id: string;
  medicationId: string;
  residentId: string;
  scheduledTime: string;
  administeredTime?: string;
  status: 'pendente' | 'administrado' | 'nao_administrado';
  administeredBy?: string; // User ID
  notes?: string;
}

export interface BillingItem {
  id: string;
  residentId: string;
  date: string;
  description: string;
  amount: number;
  type: 'fixo' | 'variavel';
  status: 'pendente' | 'faturado';
}

export interface MaintenanceLog {
  id: string;
  date: string;
  description: string;
  location: string;
  type: 'preventiva' | 'corretiva';
  cost: number;
  recordedBy: string; // User ID
}

export interface Employee {
  id: string;
  name: string;
  role: string; // e.g. 'Enfermeiro', 'Médico', 'Recepcionista'
  status: 'on_duty' | 'off_duty' | 'vacation' | 'leave';
  contact?: string;
  baseSalary?: number;
  hireDate?: string;
}

export interface SalaryAdvance {
  id: string;
  employeeId: string;
  date: string;
  amount: number;
  description: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'medication' | 'supply' | 'kitchen';
  quantity: number;
  minQuantity: number;
  unit: string;
}

export interface ExpenseItem {
  id: string;
  date: string;
  description: string;
  category: 'operacional' | 'manutencao' | 'pessoal' | 'impostos' | 'outros';
  amount: number;
  status: 'pendente' | 'pago';
}

export interface ShoppingListItem {
  inventoryItemId: string;
  quantity: number;
  estimatedPrice?: number;
}

export interface ShoppingList {
  id: string;
  name: string;
  dateCreated: string;
  status: 'draft' | 'pending' | 'completed';
  items: ShoppingListItem[];
  totalEstimatedValue?: number;
}

export interface PriceHistory {
  id: string;
  inventoryItemId: string;
  date: string;
  price: number;
  provider?: string;
}

export interface Asset {
  id: string;
  name: string;
  category: 'equipment' | 'furniture' | 'vehicle' | 'facility';
  location: string;
  status: 'operating' | 'in_repair' | 'out_of_service';
  purchaseDate?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  notes?: string;
}

export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  assetId?: string; // Optional if it's general facility
  location: string;
  type: 'preventiva' | 'corretiva';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'waiting_parts' | 'closed';
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  completedAt?: string;
  cost?: number;
  partsUsed?: { inventoryItemId: string, quantity: number }[];
}
