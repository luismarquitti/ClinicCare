# Documentação Técnica - ClinicCare

Bem-vindo à documentação oficial do **ClinicCare**, um Sistema de Gestão de Clínicas e Lares de Idosos. Esta documentação é destinada a toda a equipe técnica e de gestão (Desenvolvedores Júnior a Sênior, Tech Leads, Scrum Masters, Product Owners, etc).

## Objetivo

O objetivo exclusivo deste sistema é modernizar e centralizar as operações clínicas, financeiras, de RH, manutenção e controle de estoque de uma instituição de saúde.

## Estrutura da Documentação

Nesta pasta `doc/`, reunimos toda a documentação da aplicação dividida nas seguintes áreas:

### 1. Planejamento de Produto (`planejamento/`)

- [Product Requirements Document (PRD)](./planejamento/PRD.md)
- [Roadmap do Produto](./planejamento/Product_Roadmap.md)
- [Especificações de UX/UI](./planejamento/Specs_UX_UI.md)

### 2. Arquitetura e Engenharia (`arquitetura/`)

- [System Design](./arquitetura/System_Design.md)
- [Arquitetura e Fluxo da Aplicação](./arquitetura/architecture.md)
- [Modelagem de Dados](./arquitetura/data_model.md)
- [Conformidade e Segurança](./arquitetura/Conformidade_e_Seguranca.md)
- [Revisão Arquitetural de Modernização (Março 2026)](./arquitetura/Architecture_Review_Mar_2026.md)

### 3. Guias e Setup (`guias/`)

- [Technical Roadmap and Setup](./guias/Technical_Roadmap_and_Setup.md)
- [Workflow e Firebase](./guias/firebase_workflow.md)

### 4. Especificações Técnicas (`specs/`)

Contém as especificações técnicas (SPECs) organizadas por módulo.

- [Módulo Financeiro](./specs/financeiro/SPEC.md)

### 5. Architectural Decision Records (`adr/`)

Registro do histórico de decisões de arquitetura e engenharia do repositório.

- [Índice de ADRs](./adr/README.md)

### 6. Anotações (`notes/`)

- [Anotações e Ideias Gerais](./notes/NOTES.md)

## Stack Tecnológico Principal

- **Frontend/UI**: React 19, Vite, TailwindCSS (v4), Zustand (Gestão de Estado Global).
- **Backend/Database**: Firebase (Authentication, Cloud Firestore, Hosting, etc).
- **Linguagem**: TypeScript.
- **Roteamento**: React Router DOM.
- **Gráficos e UI**: Recharts, Lucide React (ícones), React Hot Toast, Motion.

## Regras e Padrões Iniciais

1. **TypeScript First**: Todo código inserido deve ter tipagem, aproveitando a pasta `src/types/index.ts`.
2. **Global State Mínimo para Componentes**: Componentes acessam estado pelo Zustand (`src/store/index.ts`).
3. **Módulos Independentes**: A lógica de UI e a lógica de acesso a dados via Zustand devem permanecer desacopladas.
