---
title: "🏥 Hub de Documentação - ClinicCare"
---
# 🏥 Hub de Documentação - ClinicCare

Bem-vindo(a) ao hub oficial de conhecimento do **ClinicCare**, o Sistema de Gestão de Clínicas e Lares de Idosos. Esta documentação funciona como um portal direcionando você rapidamente para os recursos e seções mais adequadas ao seu papel no projeto.

---

## 🧭 O que você procura?

Selecione a área que melhor descreve o seu foco ou atuação:

### 📈 Produto, Stakeholders e Agilidade (`planejamento/`)
Esta seção contém toda a visão de negócio, desde o problema que estamos resolvendo até o detalhamento de escopo, regras de negócio e jornada de evolução (roadmap).
- **[Product Requirements Document (PRD)](./planejamento/PRD.md)**: A origem de tudo. Entenda o propósito, visão em alto nível e objetivos estratégicos do ClinicCare.
- **[Roadmap e Visão de Evolução](./planejamento/Product_Roadmap.md)**: Acompanhe as versões planejadas e as métricas de sucesso.
- **[Acompanhamento de Backlog e Épicos](./planejamento/BACKLOG.md)**: Visão macro do estado do desenvolvimento.

### 💻 Engenharia, Arquitetura e Tech Leads (`arquitetura/` e `adr/`)
A fundação técnica do ClinicCare. Encontre diagramas arquiteturais, modelagem de dados e decisões-chave registradas.
- **[System Design & Architecture](./arquitetura/System_Design.md)**: Entenda as camadas do sistema (React, Vite, Firebase).
- **[Acesso a Dados (State & Firebase)](./arquitetura/data_model.md)**: Como gerenciamos leitura, escrita e estado global via *Zustand*.
- **[Histórico de Decisões Técnicas (ADRs)](./adr/README.md)**: O registro de *por que* usamos cada tecnologia (ex: Arquitetura Feature-Sliced, Data-fetching Isolado).
- **[Conformidade e Segurança](./arquitetura/Conformidade_e_Seguranca.md)**: Padrões estritos exigidos em uma HealthTech.

### 🚀 Guias de Desenvolvimento e Onboarding (`guias/`)
Manual essencial para iniciar a codificar e entender os fluxos diários do time técnico.
- **[Technical Setup](./guias/Technical_Roadmap_and_Setup.md)**: Prepare seu ambiente para rodar o projeto local.
- **[Firebase Workflow](./guias/firebase_workflow.md)**: Como manusear o Database, Functions e Hosting em desenvolvimento.

### 📝 Especificações Técnicas e Módulos (`specs/`)
O aprofundamento de cada "micro-projeto" dentro do ecossistema ClinicCare.
- **[Módulo Financeiro](./specs/financeiro/SPEC.md)**: Detalhamento de faturas, integração de pagamentos e fluxos de contabilidade.
- **[Dashboard e Relatórios](./specs/dashboard/SPEC.md)**: KPIs essenciais do painel de administração.

---

## 🛠 Stack Tecnológico Principal

| Camada | Tecnologia Principal |
|--------|----------------------|
| **Frontend/UI** | React 19, TypeScript, Vite, TailwindCSS (v4) |
| **State Management** | Zustand |
| **Backend (BaaS)** | Firebase (Auth, Firestore, Hosting, Functions) |
| **Rotas** | React Router DOM |
| **UI Kit / Ícones** | Radix (Shadcn/UI), Lucide React, Recharts |

---

> **Dica Rápida:** Utilize a barra de busca no canto superior (`Ctrl + K` ou `Cmd + K`) para encontrar instantaneamente informações sobre qualquer componente, regra de negócio ou função!
