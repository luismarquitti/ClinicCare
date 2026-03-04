# System Design e Especificações Técnicas - ClinicCare

## 1. Arquitetura Geral de Software

O ClinicCare utiliza uma arquitetura *Cloud-Native* e *Serverless* rodando puramente na nuvem gerenciada do Google Cloud ecosystem (Firebase).

### 1.1. Frontend Ecosystem (SPA)

- **Framework:** React 18+ com TypeScript.
- **State Management:** Zustand (leve, rápido, modular) para estado global não-persistido (ex: configuração de UI) e biblioteca de Server-State (TanStack Query) ou Hooks nativos do Firebase para estado assíncrono.
- **Styling:** CSS puro, SCSS ou TailwindCSS (configurado no builder), priorizando componentização modular estrita.
- **Roteamento:** React Router DOM (v6+).
- **Build Tool:** Vite.js (Performance de build excelente).

### 1.2. Backend Ecosystem (BaaS)

- **Authentication:** Firebase Auth (Email/Senha, Provedores Sociais corporativos).
- **Database:** Cloud Firestore (NoSQL, Serverless, Realtime-capable).
- **Storage:** Firebase Cloud Storage (Armazenamento em buckets para anexos, exames PDF, fotos de patrimônio).
- **Serverless Compute:** Firebase Cloud Functions (Node.js/TypeScript) para lógicas complexas de backend (ex: processamento de pagamentos, consolidação financeira noturna, envio de e-mails em massa, integrações externas).
- **Hosting:** Firebase Hosting (distribuição global estática e super veloz via CDN).

## 2. Esquema do Banco de Dados (Firestore NoSQL)

Por se tratar de NoSQL, o banco será estruturado com uso equilibrado de Sub-coleções para hierarquia forte e Coleções-Root para pesquisas globais.

### Coleções Core (Atuais e Previstas)

- `clinics` / `organizations` (Futuro Multi-tenant)
  - ID da clínica, razão social, CNPJ.
- `users` / `employees`
  - Auth UID, nome, CRM/Coren, cargo, role, ativo/inativo.
- `patients` / `residents` (Dados Demográficos e Administrativos)
  - **Obrigatórios:** `id`, `fullName`, `birthDate`, `biologicalSex`, `status` (ACTIVE/DISCHARGED).
  - **Opcionais:** `cpf`, `rg`, `address`, `contactPhone`, `emergencyContact`, `bedId` (caso internado/residente), `profilePictureUrl`.
- `clinical_records` (Submódulo Clínico Separado)
  - Isolado dos dados demográficos para garantir segurança e focado no cuidado de saúde.
  - Coleção agrupando: `evolutions` (Anotações diárias), `eMAR_records` (Doses administradas), `vital_signs` (Sinais vitais), `allergies` (Alergias documentadas).
  - Arquivos e anexos (PDFs, laudos médicos) são representados como referências de URL (armazenados de forma segura no Cloud Storage).
- `prescriptions`
  - Documentos vinculados a `patientId` indicando a terapêutica ativa.
  - **Cloud Functions Alert:** Triggers na criação (`onCreate`) destas prescrições disparam filas assíncronas de agendamento (`eMAR_scheduled_tasks`), utilizando Google Cloud Tasks/Scheduler para gerar pendências ativas nos painéis móveis da enfermagem.
- `invoices` (Financeiro)
  - `patientId`, montante, data de vencimento, status (PAGO, ABERTO, ATRASADO), itens da fatura, referência ao mês/ano.
- `maintenance_orders` / `assets` (Manutenção)
  - Equipamentos cadastrados, QR Codes vinculados.
  - Ordens de serviço: Reclamante, equipamento, tipo de defeito, status de calibração, prioridade.

### 2.2. Detalhamento de Estrutura dos Pacientes (MVP NoSQL)

- **Pacientes (Demográfico):** Campos baseados primordialmente em Strings (IDs, Nomes, Documentos, Contatos), Timestamp (Datas de Nascimento) e Enums (Status).
- **Módulo Clínico:** Estrutura altamente aninhada (sub-coleções do Firestore) documentando o estado histórico do paciente, com arrays para informações simples (tipo sanguíneo, tags de alerta). O schema do Firestore foca em otimizar a leitura sequencial do prontuário por linha do tempo.

### 2.3. Arquitetura Alvo Final (SQL PostgreSQL) e Migração

Tendo em vista o crescimento do sistema e complexidade relacional (como faturamento avançado, cruzamento profundo de dados estatísticos), a versão madura migrará para **PostgreSQL**.

**Esquema Relacional Inicial (PostgreSQL):**

- Tabela `patients`: `id` (UUID, PK), `full_name` (VARCHAR), `cpf` (VARCHAR, UNIQUE), `birth_date` (DATE), `status` (VARCHAR).
- Tabela `clinical_records`: `id` (UUID, PK), `patient_id` (UUID, FK), `record_type` (ENUM), `notes` (TEXT), `recorded_at` (TIMESTAMP), `professional_id` (FK).
- Tabela `attachments`: `id` (UUID, PK), `patient_id` (UUID, FK), `storage_url` (VARCHAR), `document_type` (VARCHAR).

**Estratégia de Migração (NoSQL -> SQL PostgreSQL):**

1. **Modelagem e Preparo (Data Mapping):** Criar os esquemas SQL DDL que absorvam os dados em árvore do Firestore para um modelo achatado / relacional.
2. **Dual-Write (Fase de Transição):** A API (Functions/Backend) passa a gravar os dados de entrada simultaneamente no Firestore e no PostgreSQL para evitar disparidade.
3. **ETL Carga Histórica (Extract, Transform, Load):** Scripts massivos rodando em background (ex: Dataflow ou Jobs de servidor) leem o JSON legado do Firestore e inserem nas tabelas relacionais em lotes (Batch processing).
4. **API Cutover (Chaveamento):** Com dados equalizados, os endpoints do frontend passam a apontar definitivamente para a API do PostgreSQL. O Firestore desliga-se como DB principal, podendo se manter apenas para serviços dependentes de WebSockets (Chat, Realtime Dashboards).

## 3. Matriz de Segurança e Controle de Acesso Baseado em Papéis (RBAC)

O sistema de acesso determina fortemente os firewalls de proteção aos dados de saúde do paciente (LGPD). As *custom claims* do Firebase ID Token serão utilizadas para a definição dos roles.

### Roles do Sistema

- **`SUPER_ADMIN`:** Controle total sobre parametrizações e permissões de usuários. Acesso financeiro geral.
- **`HEALTH_PRO`:** Permissão de leitura/escrita em prontuários (EHR), sinais vitais, eMAR. Bloqueado para áreas financeiras ou de gestão estrutural não relacionadas ao cuidado.
- **`FINANCIAL`:** Leitura/escrita em Invoices, Custos e Mensalidades. Acesso restrito (mínimo necessário) aos dados demográficos dos pacientes e nenhum acesso às notas/evoluções clínicas (Privacy Shield).
- **`MAINTENANCE`:** Acesso exclusivo ao módulo de frotas, patrimônios, predial e abertura/fechamento de Ordens de Serviço. Nenhuma visão global de lista de pacientes além do que for estritamente reportado num chamado.

### Firebase Security Rules (Draft / Diretrizes)

Todas as queries no Firestore devem, *by-design*, vir acompanhadas das travas de regras no backend:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Função utilitária
    function hasRole(roleName) {
      return request.auth.token[roleName] == true;
    }
    
    match /patients/{patientId} {
      // Médicos e admins podem ver registros de pacientes. Financeiro apenas ler demográfico.
      allow read: if request.auth != null && (hasRole('HEALTH_PRO') || hasRole('SUPER_ADMIN') || hasRole('FINANCIAL'));
      allow write: if request.auth != null && (hasRole('HEALTH_PRO') || hasRole('SUPER_ADMIN'));
      
      match /evolutions/{evDoc} {
        // Financeiro NÃO pode ler a evolução detalhada.
        allow read, write: if request.auth != null && (hasRole('HEALTH_PRO') || hasRole('SUPER_ADMIN'));
      }
    }
    
    match /invoices/{invoiceId} {
      // Apenas grupo financeiro controla faturamento
      allow read, write: if request.auth != null && (hasRole('FINANCIAL') || hasRole('SUPER_ADMIN'));
    }
  }
}
```

A arquitetura se baseia numa postura de **"Default Deny"** em que explicitamente nós conferimos os acessos de acordo com a mínima necessidade funcional provada pela role do usuário.
