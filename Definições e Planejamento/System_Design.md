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
- `patients` / `residents`
  - **Campos Base:** `id`, `fullName`, `birthDate`, `biologicalSex`, `bedId`, `status` (ACTIVE/DISCHARGED).
  - Sub-coleção: `evolutions` (Anotações diárias. Campos: `timestamp`, `professionalRef`, `markdownText`).
  - Sub-coleção: `eMAR_records` (Doses administradas. Campos: `medicationId`, `scheduledTime`, `administeredTime`, `professionalRef`, `status`).
  - Sub-coleção: `vital_signs` (PA, temperatura, saturação. Campos: `timestamp`, `metrics_BP`, `metrics_HR`, `metrics_O2`).
- `prescriptions`
  - Documentos vinculados a `patientId` indicando a terapêutica ativa.
  - **Cloud Functions Alert:** Triggers na criação (`onCreate`) destas prescrições disparam filas assíncronas de agendamento (`eMAR_scheduled_tasks`), utilizando Google Cloud Tasks/Scheduler para gerar pendências ativas nos painéis móveis da enfermagem.
- `invoices` (Financeiro)
  - `patientId`, montante, data de vencimento, status (PAGO, ABERTO, ATRASADO), itens da fatura, referência ao mês/ano.
- `maintenance_orders` / `assets` (Manutenção)
  - Equipamentos cadastrados, QR Codes vinculados.
  - Ordens de serviço: Reclamante, equipamento, tipo de defeito, status de calibração, prioridade.

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
