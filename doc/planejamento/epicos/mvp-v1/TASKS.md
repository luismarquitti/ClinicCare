---
title: "TASKS: Breakdown Técnico — MVP Inicial"
---
# TASKS: Breakdown Técnico — MVP Inicial

Este documento reflete as tarefas necessárias para entregar o MVP descrito em [FEATURE.md](FEATURE.md). Analisando o estado atual do repositório, o épico compilará recursos de Autenticação (Épico 01), Financeiro (Épico 04) e Clínico (Épico 02) garantindo a coesão de entrega para a demonstração inicial.

## Fase 1: Setup da Landing, Auth Persistente
- [ ] Tarefa 1.1: Criar a Landing Page corporativa (rota `/`).
- [ ] Tarefa 1.2: Ajustar e garantir que a página de `/login` permite autenticação de administrador com email e persiste a sessão corretamente via configuração de persistência do SDK V9/V10 para testes locais e hot reloads.
- [ ] Tarefa 1.3: Construir / Revisar o `ProtectedRoute` e RBAC global no frontend para aceitar a transição de Login -> Dashboard.

## Fase 2: App Bar e Navegação Global
- [ ] Tarefa 2.1: Implementar o componente de App Bar fixo no layout de sistema logado (`DashboardLayout`).
- [ ] Tarefa 2.2: Adicionar caminhos de roteamento dinâmico na App Bar apontando para `/residents` (Gerenciamento de Residentes) e rotas financeiras.

## Fase 3: Operacionalização do Dashboard Financeiro
- [ ] Tarefa 3.1: Verificar e ajustar integração em `src/pages/Financial/index.tsx` (ou respectivo) para espelhar KPIs (receitas, despesas, saldo) consumindo do Firestore.
- [ ] Tarefa 3.2: Confirmar queries de `billingItems` e `transactions` para popular gráficos / painéis na tela inicial do Financeiro.

## Fase 4: Operacionalização do Sistema de Residentes
- [ ] Tarefa 4.1: Ajustar tabela/lista em `/residents` garantindo que os dados base exibem corretamente.
- [ ] Tarefa 4.2: Conferir formulário em `/residents/new` (usando React Hook Form + Zod) para garantir gravação estável.

## Fase 5: QA & Segurança Check (Verificação Final)
- [ ] **RBAC:** Confirmar se as Custom Claims e os lookups na coleção `users` impedem navegação não autorizada nos fluxos do MVP.
- [ ] **Firestore:** Arquivo `firestore.rules` tem que abranger leitura/escrita restrita para `residents`, `transactions`, `billingItems` atrelada à permissão `admin`.
- [ ] **LGPD:** A listagem de residentes atende aos padrões de minimização na index page.
- [ ] **Testes:** Formulários e Listagens não lançam crashes de runtime (Hydration/Render errors). Fluxo de login > residentes > financeiro está liso e responsivo mobile-first/desktop.

---

## Definition of Done (DoD)
- [ ] Todos os critérios de aceite de `FEATURE.md` atendidos.
- [ ] Sem erros no console do navegador (zero runtime crashes).
- [ ] Layout perfeitamente responsivo.
- [ ] `firestore.rules` validadas em emuladores se necessário e aplicadas no repositório.
- [ ] Componentes globais novos (App Bar) cobrem a necessidade de UI/UX descrita em `Specs_UX_UI.md`.
