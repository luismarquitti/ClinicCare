# Documentação Técnica - ClinicCare

Bem-vindo à documentação oficial do **ClinicCare**, um Sistema de Gestão de Clínicas e Lares de Idosos. Esta documentação é destinada a toda a equipe técnica e de gestão (Desenvolvedores Júnior a Sênior, Tech Leads, Scrum Masters, Product Owners, etc).

## Objetivo

O objetivo exclusivo deste sistema é modernizar e centralizar as operações clínicas, financeiras, de RH, manutenção e controle de estoque de uma instituição de saúde.

## Estrutura da Documentação

Nesta pasta `doc/`, você encontrará guias essenciais para entender a aplicação como um todo:

- [Arquitetura e Fluxo da Aplicação](./architecture.md): Entenda como a aplicação está estruturada, seus módulos e o fluxo de dados principal. Inclui diagramas de Casos de Uso e o funcionamento de camadas.
- [Modelagem de Dados](./data_model.md): Documentação rigorosa das coleções do banco de dados NoSQL (Firebase/Firestore) utilizadas na aplicação, além de diagramas lógicos.
- [Workflow e Firebase](./firebase_workflow.md): Instruções locais de ambiente para desenvolvimento, estratégias de branch, testes locais e deploy contínuo integrado ao Firebase.

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
