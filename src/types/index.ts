export type Role = 'admin' | 'saude' | 'financeiro' | 'manutencao';

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
