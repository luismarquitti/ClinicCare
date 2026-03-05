<div align="center">
<img width="200" alt="ClinicCare Logo" src="./public/assets/logo.jpg" />

# 🏥 ClinicCare

### *Sistema Inteligente de Gestão para Clínicas e Instituições de Longa Permanência*

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-BaaS-orange?logo=firebase)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

</div>

---

## 🌟 Visão Geral

O **ClinicCare** é uma solução completa e escalável voltada para a gestão de clínicas e lares de idosos. Desenvolvido com foco em **Performance**, **Segurança** e **UX Premium**, o sistema centraliza todas as operações administrativas e assistenciais em um único ecossistema serverless.

> [!TIP]
> **Público**: Desenvolvedores, Stakeholders e Clientes que buscam uma interface moderna e integração profunda com serviços de nuvem.

---

## 🏗️ Módulos do Sistema

O ClinicCare foi projetado de forma modular, permitindo que cada área da instituição opere de forma isolada, mas conectada através de um banco de dados em tempo real.

| Módulo | Descrição | Principais Recursos |
| :--- | :--- | :--- |
| **🏘️ Residentes** | Gestão de prontuários e admissões. | Cadastro completo, busca dinâmica, detalhes de saúde. |
| **💉 Assistencial** | Controle de saúde e enfermagem. | Sinais vitais, evolução clínica, prescrição eletrônica. |
| **💰 Financeiro** | Gestão de faturamento e contas. | Dashboard de métricas, controle de transações, filtros. |
| **🛠️ Manutenção** | Gerenciamento de infraestrutura. | Abertura de chamados, logs de manutenção, histórico. |
| **📦 Inventário** | Controle de suprimentos. | Gestão de estoque, alertas de reposição. |
| **👥 RH** | Gestão de colaboradores. | Listagem de staff, cargos e permissões. |
| **📊 Dashboard** | Analytics em tempo real. | Gráficos evolutivos, métricas de ocupação. |
| **🤖 AI Lab** | Integração com IA. | Processamento de documentos e geração de insights (Beta). |

---

## 📚 Documentação Oficial

Toda a documentação do projeto (requisitos, arquitetura, design e guias) está centralizada na pasta `doc/`.
👉 **[Acessar o Índice de Documentação](./doc/index.md)**

---

## 🚀 Tecnologias Essenciais

- **Core**: [React 19](https://reactjs.org/) + [Vite 6](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **BaaS (Backend as a Service)**: [Google Firebase](https://firebase.google.com/) (Auth, Firestore, Storage, Hosting)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Estado**: [Zustand](https://docs.pmnd.rs/zustand/)
- **Gráficos**: [Recharts](https://recharts.org/)
- **Testes**: [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## 🛠️ Começando Localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Firebase CLI (`npm install -g firebase-tools`)

### Instalação

1. **Clone o Repositório:**

   ```bash
   git clone <seu-repo>
   cd ClinicCare
   npm install
   ```

2. **Configuração de Ambiente:**
   Crie um arquivo `.env.local` na raiz e preencha com suas chaves:

   ```env
   VITE_FIREBASE_API_KEY="..."
   VITE_FIREBASE_AUTH_DOMAIN="..."
   VITE_FIREBASE_PROJECT_ID="..."
   VITE_FIREBASE_STORAGE_BUCKET="..."
   VITE_FIREBASE_MESSAGING_SENDER_ID="..."
   VITE_FIREBASE_APP_ID="..."
   GEMINI_API_KEY="..." # Opcional para módulos de IA
   ```

3. **Inicie o Servidor:**

   ```bash
   npm run dev
   ```

   Acesse: `http://localhost:3000`

---

## 🔥 Configuração Firebase

O ClinicCare utiliza **RBAC (Role-Based Access Control)**. Certifique-se de configurar as regras de segurança para garantir a integridade dos dados.

- **Firestore**: Coleções estruturadas para alta performance.
- **Rules**: Localizadas em `firestore.rules`. Deploy via `firebase deploy --only firestore:rules`.
- **Claims**: Perfis suportados: `admin`, `saude`, `financeiro`, `manutencao`.

---

## 📈 Roadmap & Metodologia

Trabalhamos com metodologia **Agile** através do GitHub Projects.

- [x] Arquitetura Base & Layout Premium
- [x] Módulo Financeiro (Core)
- [x] Módulo Assistencial (Evolução & Sinais Vitais)
- [/] Integração AI (Gemini Flash 2.0)
- [ ] Mobile App (PWA)

### Estratégia de Branches

- `main`: Versão estável em produção.
- `feature/*`: Novas funcionalidades.
- `fix/*`: Correções de bugs.

---

## 📋 Scripts Disponíveis

| Comando | Ação |
| :--- | :--- |
| `npm run dev` | Inicia o ambiento de desenvolvimento. |
| `npm run build` | Gera o bundle de produção em `/dist`. |
| `npm run test` | Executa a suíte de testes unitários. |
| `npm run lint` | Verifica erros de tipagem com TSC. |
| `npm run deploy` | Build & Deploy para Firebase Hosting. |

---

## 📝 Contribuição

Contribuições são bem-vindas! Por favor, abra uma issue para discutir o que você deseja mudar.

1. Faça o Fork do projeto.
2. Crie uma Branch (`git checkout -b feature/AmazingFeature`).
3. Commit suas mudanças (`git commit -m 'feat: Add AmazingFeature'`).
4. Push para a Branch (`git push origin feature/AmazingFeature`).
5. Abra um Pull Request.

---

## 📧 Suporte

Dúvidas ou sugestões? [Abra uma Issue](https://github.com/luismarquitti/ClinicCare/issues).

---
<div align="center">
Desenvolvido com ❤️ para transformar a gestão de saúde.
</div>
