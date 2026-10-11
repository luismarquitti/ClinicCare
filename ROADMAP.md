# 🗺️ ClinicCare - Roadmap

Este documento centraliza os próximos passos, melhorias e funcionalidades que estão no radar de desenvolvimento do sistema **ClinicCare**. O objetivo é entregar um sistema de gestão completo para residenciais geriátricos e clínicas.

---

## 🟢 Fase 1: Fundação e Core do Sistema (Concluído / Em Andamento)
- [x] Configuração base do projeto (Vite, React, TypeScript).
- [x] Definição de arquitetura de pastas (pages, store, services, components).
- [x] Integração com Tailwind CSS v4 para UI.
- [x] Configuração inicial de testes (Vitest + Storybook).
- [x] Criação das estruturas base para as páginas: `Dashboard`, `Login`, `Landing`.
- [x] Mapeamento das views principais: `Financeiro`, `HR`, `Inventory`, `Nursing`, `Residents`.
- [ ] **Documentação Inicial:** Adição de README e Roadmap ao repositório.

## 🟡 Fase 2: Refinamento de UX/UI e Componentização (Próximos Passos)
- [ ] **Notificações:** Substituir alertas nativos (`alert()` e `console.error()`) por componentes visuais e não bloqueantes (React Hot Toast).
- [ ] **Acessibilidade:** Testar e aprimorar componentes de formulários e botões para navegação via teclado.
- [ ] **Animações Básicas:** Refinar transições de tela usando a lib `motion`.
- [ ] **Storybook:** Documentar todos os componentes core de UI já existentes na biblioteca do Storybook.

## 🟠 Fase 3: Regras de Negócio e Módulos Principais
- [ ] **Autenticação (Firebase Auth):**
  - Implementar login seguro com e-mail/senha.
  - Implementar controle de acesso baseado em Roles (Enfermeiro, Financeiro, Admin).
- [ ] **Módulo de Residentes:**
  - Fluxo completo de Admissão (`ResidentAdmission`).
  - Prontuário eletrônico e detalhes do residente (`ResidentDetails`).
- [ ] **Módulo de Enfermagem (`Nursing.tsx`):**
  - Controle de medicamentos e turnos.
  - Integração com `EPrescription` para receitas digitais.
- [ ] **Módulo Financeiro (`Financeiro/Financial.tsx`):**
  - Lançamento de despesas e receitas.
  - Dashboard de fluxo de caixa (com `Recharts`).

## 🔵 Fase 4: Gestão Operacional e Avançada
- [ ] **Módulo de RH (`HR.tsx`):**
  - Cadastro e escala de funcionários.
- [ ] **Estoque e Suprimentos (`Inventory.tsx`):**
  - Controle de materiais médicos e de limpeza.
  - Alertas de baixa de estoque.
- [ ] **Módulo de Manutenção (`Maintenance.tsx`):**
  - Abertura de chamados internos para reparos prediais.
- [ ] **Relatórios e BI:**
  - Geração de relatórios gerenciais consolidados em PDF e visualizações em tela.

## 🟣 Fase 5: Integrações, Deploy e CI/CD
- [ ] Setup contínuo do Firebase (Hosting, Firestore rules).
- [ ] Actions do GitHub para rodar `yarn test` e `yarn lint` em cada PR.
- [ ] Monitoramento de erros em ambiente de produção.
- [ ] Entrega da primeira versão alpha para o Residencial Novo Tempo.

---
*A lista acima está sujeita a mudanças mediante priorização das tarefas no backlog.*
