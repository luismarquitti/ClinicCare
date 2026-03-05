# Especificação Técnica: Módulo Financeiro (ClinicCare)

## 1. Visão Geral e Alinhamento

O Módulo Financeiro visa modernizar o controle de fluxo de caixa da clínica. O objetivo é permitir que o departamento financeiro e os administradores (`FINANCIAL`, `SUPER_ADMIN`) gerenciem contas, cartões, receitas e despesas com categorização detalhada, gerenciamento de recorrências e projeção de caixa. Esta feature não mira o usuário externo, operando estritamente dentro da segurança demarcada pelo RBAC do Firebase, garantindo agilidade operacional sem expor dados clínicos.

## 2. Requisitos de Design Adaptativo

- **Disposição Web (Desktop - Foco Principal):** Tela principal dividida. Dashboard (KPIs: Saldo no Período, Receitas, Despesas, A Pagar) fixado na parte superior com gráficos rápidos. Tabela (DataGrid) densa de movimentações do mês atual em tela cheia na parte inferior. Layout horizontal para Filtros Avançados (Categorias, Tipos, Período, Status).
- **Disposição Mobile (Supervisão Rápida):** Dashboard sintetizado em Cards de rolagem horizontal (Swipe). Lista de transações agrupada por data. O botão flutuante (FAB) de "Nova Transação" fica fixo inferior à direita.
- **Interação Crítica (CRUD):** As operações de criação, edição e exclusão não devem redirecionar a rotas diferentes. Devem utilizar um Modal central no Desktop e um Bottom Sheet (englobando tela inteira se necessário) no Mobile visando minimizar a carga cognitiva e manter o contexto da lista. Filtros aplicados atualizam imediatamente os indicadores (KPIs) superior.

### 2.1 Design Direction (Refined Minimalist Editorial)

Guiado pelos preceitos da skill de design (`frontend-design`), o módulo financeiro abdica do estilo genérico SaaS (gradientes decorativos, bordas excessivamente arredondadas, badges em pílula com fundos claros) en favor de um visual **Refined Minimalist Editorial**.

- **Typography-led:** Valores monetários utilizam numerais com pesos expressivos (fontes sem serifa pesadas) justapostos contra textos de suporte finos e rastreados (uppercase tracked-out).
- **Estrutura sem container:** As grades de dados (DataGrids) eliminam "cards" contendo linhas internas em troca de estruturas ancoradas apenas por alinhamento e separadores horizontais consistentes. Form controls substituem caixas completas por contornos limpos (borders/underlines).
- **Indicadores de Status (Status Indicators):** Estado visual das transações utiliza variações pontuais ou apenas código de cor mínimo e stark (ex: *dot text* de alto contraste) em vez dos tradicionais backrounds de pílula soft.
- **DFII Score:** O design atinge métrica superior a 12 (Excelente).

## 3. Especificação Técnica e Modelagem

Para isolar as transações do faturamento fixo (`billingItems`), modelaremos entidades novas no Firestore voltadas para fluxo de caixa.

### Coleções do Firestore (`src/types/financial.ts`)

```typescript
// Contas bancárias e Cartões
interface Account {
  id: string; // Gerado pelo Firestore
  name: string; // Ex: 'Bradesco Clínica', 'Cartão Corporativo Nu'
  type: 'BANK_ACCOUNT' | 'CREDIT_CARD' | 'CASH';
  initialBalance: number;
  currentBalance: number;
  createdAt: string; // ISO String
}

// Categorias de transações
interface Category {
  id: string;
  name: string; // Ex: 'Suprimentos Médicos', 'Folha de Pagamento'
  type: 'INCOME' | 'EXPENSE';
  color: string; // Hex color para o MD3
}

// Lançamentos e Transações
interface Transaction {
  id: string;
  accountId: string; // Referência a Account
  categoryId: string; // Referência a Category
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  date: string; // ISO ou Timestamp
  description: string;
  payeeOrPayer: string; // Fornecedor ou Cliente/Paciente
  isRecurring: boolean; // Flag se originou de recorrência
  recurringGroupId?: string; // Para agrupar parcelas/mensalidades geradas juntas
  createdAt: string;
}
```

### Estado Global (Zustand)

Criar o arquivo `src/store/useFinancialStore.ts`:

- **State:** `accounts: Account[]`, `categories: Category[]`, `transactions: Transaction[]`, `filters: { dateRange, type, categoryId, status }`.
- **Actions:**
  - `fetchAccounts`, `fetchCategories`, `fetchTransactions(filters)` via `onSnapshot`.
  - `addTransaction`, `updateTransaction`, `deleteTransaction`.
- **Computed Properties/Getters:** `filteredBalance()`, `filteredIncome()`, `filteredExpense()`, para injetar diretamente no Dashboard reduzindo processamento nos componentes.

## 4. Matriz de Segurança (firestore.rules)

O acesso aos dados monetários é ultra sensível. Ninguém no grupo de enfermagem (`HEALTH_PRO`) ou outro colaborador comum deve ler esses dados. Ajustar `firestore.rules`:

```javascript
match /accounts/{accountId} {
  allow read, write: if request.auth != null && (hasRole('FINANCIAL') || hasRole('SUPER_ADMIN'));
}

match /categories/{categoryId} {
  // Leitura geral para popular selects, mas escrita trancada.
  allow read: if request.auth != null;
  allow write: if request.auth != null && (hasRole('FINANCIAL') || hasRole('SUPER_ADMIN'));
}

match /transactions/{transactionId} {
  allow read, write: if request.auth != null && (hasRole('FINANCIAL') || hasRole('SUPER_ADMIN'));
}
```

## 5. Planejamento Ágil (Sprints e Tarefas)

- **Sprint 1 (Backend & Base State):**
  - Tarefa: Criar tipagens no `src/types/`.
  - Tarefa: Criar coleções mockup no Firestore e regras de segurança (`firestore.rules`).
  - Tarefa: Estruturar as actions e o listener do `useFinancialStore` integrado ao Firebase.

- **Sprint 2 (Dashboard & Filtros Base UI):**
  - Tarefa: Layoutização das métricas do cabeçalho da página Financial (Total Receitas, Despesas, Saldo Baseado no Filtro).
  - Tarefa: Criar a barra de controles/filtros reativos (Categorias, Mês Atual) alimentando o Zustand.

- **Sprint 3 (CRUD de Transações):**
  - Tarefa: Tabela/Listagem de despesas da `Transaction` com estados de Pagamento.
  - Tarefa: Modal reativo integrado ao formulário (React Hook Form + Zod) para criação e edição, incluindo busca de Categorias/Contas.
  - Tarefa: Ação de exclusão com alerta (Dialog de confirmação).

- **Sprint 4 (Contas, Categorias e Relatórios Módulo Avançado):**
  - Tarefa: CRUD isolado para criar novas Contas ou Cartões e definir cores de Categorias.
  - Tarefa: Função de exportação de um relatório básico no formato de CSV/PDF pegando as transações da tela filtrada atual.

## 6. Critérios de Aceite (DoD)

- Todas as consultas utilizam hooks do `Zustand` de forma real-time (`onSnapshot`).
- Os componentes de Tabela ou Dashboard superior reagem no máximo em menos de 1 segundo à mudança de um filtro.
- Protótipo atestado nos Chrome DevTools tanto na visão >1024px (Web) quanto na visão 390px (Mobile Bottom Sheet).
- Regras de Segurança validadas não permitindo visualização por usuários sem 'FINANCIAL' ou 'SUPER_ADMIN' claim.
- Validação estrita por `zod` em formulários de valor monetário (não permitindo transações zeradas onde não aplicável).
