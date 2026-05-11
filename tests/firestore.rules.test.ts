/**
 * Firestore Security Rules — testes de RBAC
 *
 * Requer o emulador Firestore rodando:
 *   yarn emulator:start  (em outro terminal)
 *
 * Executar:
 *   yarn test:rules
 */

import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { afterAll, afterEach, beforeAll, describe, it } from 'vitest';

const PROJECT_ID = 'demo-cliniccare';
const RULES_PATH = resolve(__dirname, '../firestore.rules');

let testEnv: RulesTestEnvironment;

// ─── Setup ───────────────────────────────────────────────────────────────────

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync(RULES_PATH, 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  });
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function db(role: string | null, uid = 'user-test') {
  if (!role) return testEnv.unauthenticatedContext().firestore();
  return testEnv.authenticatedContext(uid, { role }).firestore();
}

async function seed(path: string, data: object) {
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    await setDoc(doc(ctx.firestore(), path), data);
  });
}

// ─── Sem autenticação ─────────────────────────────────────────────────────────

describe('Usuário não autenticado', () => {
  it('não consegue ler residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertFails(getDoc(doc(db(null), 'residents/r1')));
  });

  it('não consegue ler vitalSigns', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertFails(getDoc(doc(db(null), 'vitalSigns/v1')));
  });

  it('não consegue ler auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    await assertFails(getDoc(doc(db(null), 'auditLogs/a1')));
  });
});

// ─── Role ausente (claim não definido) ───────────────────────────────────────

describe('Usuário autenticado sem role (claim ausente)', () => {
  it('consegue ler users (acesso básico autenticado)', async () => {
    await seed('users/u1', { nome: 'Ana' });
    const noRoleDb = testEnv.authenticatedContext('u1', {}).firestore();
    await assertSucceeds(getDoc(doc(noRoleDb, 'users/u1')));
  });

  it('não consegue ler residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    const noRoleDb = testEnv.authenticatedContext('u1', {}).firestore();
    await assertFails(getDoc(doc(noRoleDb, 'residents/r1')));
  });

  it('não consegue escrever em qualquer coleção clínica', async () => {
    const noRoleDb = testEnv.authenticatedContext('u1', {}).firestore();
    await assertFails(setDoc(doc(noRoleDb, 'residents/r1'), { nome: 'Hack' }));
  });
});

// ─── superAdmin ───────────────────────────────────────────────────────────────

describe('superAdmin', () => {
  it('lê residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertSucceeds(getDoc(doc(db('superAdmin'), 'residents/r1')));
  });

  it('escreve residents', async () => {
    await assertSucceeds(setDoc(doc(db('superAdmin'), 'residents/r1'), { nome: 'João' }));
  });

  it('lê auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    await assertSucceeds(getDoc(doc(db('superAdmin'), 'auditLogs/a1')));
  });

  it('não consegue escrever em auditLogs (Cloud Functions only)', async () => {
    await assertFails(setDoc(doc(db('superAdmin'), 'auditLogs/a1'), { action: 'hack' }));
  });

  it('não consegue escrever em invites (Cloud Functions only)', async () => {
    await assertFails(setDoc(doc(db('superAdmin'), 'invites/tok1'), { email: 'x@x.com' }));
  });

  it('lê employees', async () => {
    await seed('employees/e1', { nome: 'Maria' });
    await assertSucceeds(getDoc(doc(db('superAdmin'), 'employees/e1')));
  });

  it('escreve employees', async () => {
    await assertSucceeds(setDoc(doc(db('superAdmin'), 'employees/e1'), { nome: 'Maria' }));
  });
});

// ─── admin ────────────────────────────────────────────────────────────────────

describe('admin', () => {
  it('lê e escreve residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertSucceeds(getDoc(doc(db('admin'), 'residents/r1')));
    await assertSucceeds(setDoc(doc(db('admin'), 'residents/r1'), { nome: 'João' }));
  });

  it('lê auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    await assertSucceeds(getDoc(doc(db('admin'), 'auditLogs/a1')));
  });

  it('não consegue escrever em auditLogs', async () => {
    await assertFails(setDoc(doc(db('admin'), 'auditLogs/a1'), { action: 'hack' }));
  });

  it('lê e escreve employees', async () => {
    await seed('employees/e1', { nome: 'Carlos' });
    await assertSucceeds(getDoc(doc(db('admin'), 'employees/e1')));
    await assertSucceeds(setDoc(doc(db('admin'), 'employees/e1'), { nome: 'Carlos' }));
  });

  it('lê e escreve workOrders', async () => {
    await seed('workOrders/wo1', { titulo: 'Troca de filtro' });
    await assertSucceeds(getDoc(doc(db('admin'), 'workOrders/wo1')));
    await assertSucceeds(setDoc(doc(db('admin'), 'workOrders/wo1'), { titulo: 'Troca' }));
  });
});

// ─── clinico ──────────────────────────────────────────────────────────────────

describe('clinico', () => {
  it('lê e escreve residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertSucceeds(getDoc(doc(db('clinico'), 'residents/r1')));
    await assertSucceeds(setDoc(doc(db('clinico'), 'residents/r1'), { nome: 'João' }));
  });

  it('lê e escreve vitalSigns', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertSucceeds(getDoc(doc(db('clinico'), 'vitalSigns/v1')));
    await assertSucceeds(setDoc(doc(db('clinico'), 'vitalSigns/v1'), { spo2: 97 }));
  });

  it('lê e escreve evolutionRecords', async () => {
    await seed('evolutionRecords/ev1', { texto: 'Paciente estável' });
    await assertSucceeds(getDoc(doc(db('clinico'), 'evolutionRecords/ev1')));
    await assertSucceeds(setDoc(doc(db('clinico'), 'evolutionRecords/ev1'), { texto: 'Ok' }));
  });

  it('lê e escreve medications', async () => {
    await seed('medications/m1', { nome: 'Dipirona' });
    await assertSucceeds(getDoc(doc(db('clinico'), 'medications/m1')));
    await assertSucceeds(setDoc(doc(db('clinico'), 'medications/m1'), { nome: 'Dipirona' }));
  });

  it('lê inventoryItems (read-only para clínicos)', async () => {
    await seed('inventoryItems/i1', { nome: 'Luvas' });
    await assertSucceeds(getDoc(doc(db('clinico'), 'inventoryItems/i1')));
  });

  it('não consegue escrever em inventoryItems', async () => {
    await assertFails(setDoc(doc(db('clinico'), 'inventoryItems/i1'), { nome: 'Hack' }));
  });

  it('não consegue ler auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    await assertFails(getDoc(doc(db('clinico'), 'auditLogs/a1')));
  });

  it('não consegue ler employees', async () => {
    await seed('employees/e1', { nome: 'Carlos' });
    await assertFails(getDoc(doc(db('clinico'), 'employees/e1')));
  });

  it('não consegue ler transactions', async () => {
    await seed('transactions/t1', { valor: 1000 });
    await assertFails(getDoc(doc(db('clinico'), 'transactions/t1')));
  });

  it('não consegue escrever em alertasClinicas (Cloud Functions only)', async () => {
    await assertFails(setDoc(doc(db('clinico'), 'alertasClinicas/r1'), { score: 'alto' }));
  });
});

// ─── tecnico ──────────────────────────────────────────────────────────────────

describe('tecnico', () => {
  it('lê e escreve workOrders', async () => {
    await seed('workOrders/wo1', { titulo: 'Manutenção' });
    await assertSucceeds(getDoc(doc(db('tecnico'), 'workOrders/wo1')));
    await assertSucceeds(setDoc(doc(db('tecnico'), 'workOrders/wo1'), { titulo: 'OK' }));
  });

  it('lê e escreve maintenanceLogs', async () => {
    await seed('maintenanceLogs/ml1', { descricao: 'Revisão' });
    await assertSucceeds(getDoc(doc(db('tecnico'), 'maintenanceLogs/ml1')));
    await assertSucceeds(setDoc(doc(db('tecnico'), 'maintenanceLogs/ml1'), { descricao: 'Ok' }));
  });

  it('lê e escreve inventoryItems', async () => {
    await seed('inventoryItems/i1', { nome: 'Parafuso' });
    await assertSucceeds(getDoc(doc(db('tecnico'), 'inventoryItems/i1')));
    await assertSucceeds(setDoc(doc(db('tecnico'), 'inventoryItems/i1'), { nome: 'Parafuso' }));
  });

  it('lê e escreve assets', async () => {
    await seed('assets/a1', { nome: 'Cadeira de rodas' });
    await assertSucceeds(getDoc(doc(db('tecnico'), 'assets/a1')));
    await assertSucceeds(setDoc(doc(db('tecnico'), 'assets/a1'), { nome: 'Cadeira' }));
  });

  it('não consegue ler residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertFails(getDoc(doc(db('tecnico'), 'residents/r1')));
  });

  it('não consegue ler vitalSigns', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertFails(getDoc(doc(db('tecnico'), 'vitalSigns/v1')));
  });

  it('não consegue ler transactions', async () => {
    await seed('transactions/t1', { valor: 1000 });
    await assertFails(getDoc(doc(db('tecnico'), 'transactions/t1')));
  });

  it('não consegue ler employees', async () => {
    await seed('employees/e1', { nome: 'Maria' });
    await assertFails(getDoc(doc(db('tecnico'), 'employees/e1')));
  });
});

// ─── financeiro ───────────────────────────────────────────────────────────────

describe('financeiro', () => {
  it('lê e escreve transactions', async () => {
    await seed('transactions/t1', { valor: 500 });
    await assertSucceeds(getDoc(doc(db('financeiro'), 'transactions/t1')));
    await assertSucceeds(setDoc(doc(db('financeiro'), 'transactions/t1'), { valor: 600 }));
  });

  it('lê e escreve billingItems', async () => {
    await seed('billingItems/b1', { descricao: 'Mensalidade' });
    await assertSucceeds(getDoc(doc(db('financeiro'), 'billingItems/b1')));
    await assertSucceeds(setDoc(doc(db('financeiro'), 'billingItems/b1'), { descricao: 'Ok' }));
  });

  it('lê e escreve faturas', async () => {
    await seed('faturas/f1', { valor: 2000 });
    await assertSucceeds(getDoc(doc(db('financeiro'), 'faturas/f1')));
    await assertSucceeds(setDoc(doc(db('financeiro'), 'faturas/f1'), { valor: 2100 }));
  });

  it('lê residents (necessário para faturamento)', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertSucceeds(getDoc(doc(db('financeiro'), 'residents/r1')));
  });

  it('não consegue escrever em residents', async () => {
    await assertFails(setDoc(doc(db('financeiro'), 'residents/r1'), { nome: 'Hack' }));
  });

  it('não consegue ler vitalSigns', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertFails(getDoc(doc(db('financeiro'), 'vitalSigns/v1')));
  });

  it('não consegue ler employees', async () => {
    await seed('employees/e1', { nome: 'Carlos' });
    await assertFails(getDoc(doc(db('financeiro'), 'employees/e1')));
  });

  it('não consegue ler workOrders', async () => {
    await seed('workOrders/wo1', { titulo: 'Manutenção' });
    await assertFails(getDoc(doc(db('financeiro'), 'workOrders/wo1')));
  });
});

// ─── rh ───────────────────────────────────────────────────────────────────────

describe('rh', () => {
  it('lê employees', async () => {
    await seed('employees/e1', { nome: 'Pedro' });
    await assertSucceeds(getDoc(doc(db('rh'), 'employees/e1')));
  });

  it('não consegue escrever em employees (somente privilegiados)', async () => {
    await assertFails(setDoc(doc(db('rh'), 'employees/e1'), { nome: 'Pedro' }));
  });

  it('lê e escreve salaryAdvances', async () => {
    await seed('salaryAdvances/sa1', { valor: 300 });
    await assertSucceeds(getDoc(doc(db('rh'), 'salaryAdvances/sa1')));
    await assertSucceeds(setDoc(doc(db('rh'), 'salaryAdvances/sa1'), { valor: 350 }));
  });

  it('não consegue ler residents', async () => {
    await seed('residents/r1', { nome: 'João' });
    await assertFails(getDoc(doc(db('rh'), 'residents/r1')));
  });

  it('não consegue ler vitalSigns', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertFails(getDoc(doc(db('rh'), 'vitalSigns/v1')));
  });

  it('não consegue ler transactions', async () => {
    await seed('transactions/t1', { valor: 1000 });
    await assertFails(getDoc(doc(db('rh'), 'transactions/t1')));
  });

  it('não consegue ler auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    await assertFails(getDoc(doc(db('rh'), 'auditLogs/a1')));
  });
});

// ─── Isolamento entre roles — casos críticos ──────────────────────────────────

describe('Isolamento de roles — cenários críticos', () => {
  it('tecnico não acessa dados clínicos', async () => {
    await seed('evolutionRecords/ev1', { texto: 'Evolução médica' });
    await assertFails(getDoc(doc(db('tecnico'), 'evolutionRecords/ev1')));
  });

  it('financeiro não acessa dados clínicos', async () => {
    await seed('evolutionRecords/ev1', { texto: 'Evolução médica' });
    await assertFails(getDoc(doc(db('financeiro'), 'evolutionRecords/ev1')));
  });

  it('rh não acessa dados clínicos', async () => {
    await seed('vitalSigns/v1', { spo2: 98 });
    await assertFails(getDoc(doc(db('rh'), 'vitalSigns/v1')));
  });

  it('clinico não acessa dados financeiros', async () => {
    await seed('billingItems/b1', { descricao: 'Mensalidade' });
    await assertFails(getDoc(doc(db('clinico'), 'billingItems/b1')));
  });

  it('rh não acessa dados financeiros', async () => {
    await seed('billingItems/b1', { descricao: 'Mensalidade' });
    await assertFails(getDoc(doc(db('rh'), 'billingItems/b1')));
  });

  it('nenhum role (exceto privilegiados) consegue ler auditLogs', async () => {
    await seed('auditLogs/a1', { action: 'test' });
    for (const role of ['clinico', 'tecnico', 'financeiro', 'rh']) {
      await assertFails(getDoc(doc(db(role), 'auditLogs/a1')));
    }
  });

  it('nenhum role consegue escrever em invites', async () => {
    for (const role of ['superAdmin', 'admin', 'clinico', 'tecnico', 'financeiro', 'rh']) {
      await assertFails(setDoc(doc(db(role), 'invites/tok1'), { email: 'x@x.com' }));
    }
  });

  it('nenhum role consegue escrever em auditLogs', async () => {
    for (const role of ['superAdmin', 'admin', 'clinico', 'tecnico', 'financeiro', 'rh']) {
      await assertFails(setDoc(doc(db(role), 'auditLogs/log1'), { action: 'hack' }));
    }
  });
});
