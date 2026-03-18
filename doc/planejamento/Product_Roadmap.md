---
title: "Roadmap e Plano de Execução - ClinicCare"
---
# Roadmap e Plano de Execução - ClinicCare

Este roadmap projeta a jornada do ClinicCare de uma base fundacional até um produto de software de grande escala com preditibilidade de IA. O escopo está segmentado em entregáveis (Sprints/Fases).

## Roadmap Estratégico

### Fase 1: Fundação, Autenticação e Onboarding B2B (Mês 1)

- **Setup CI/CD:** Pipeline robusta via GitHub Actions (Linting, Testes Automatizados Jest/Vitest, Automate Firebase Deploy).
- **RBAC e Firebase Structuring:** Regras de segurança completas no Firestore. Atestadas rotineiramente via Firebase Emulator Suite.
- **Auth e Onboarding:** UX direcionada a acesso rápido e cadastro corporativo via Firebase Authentication. Landing em página de login B2B e criação de Super Admins.
- **Módulo de Pessoas:** Tabela básica de Usuários/Colaboradores integrada à coleção `users` do Firestore.

### Fase 2: Gestão Clínica e eMAR Móvel (Mês 2-3)

O núcleo do produto de saúde e o maior gerador de valor em segurança do paciente.

- **Prontuário (EHR):** Cadastro de Residentes/Pacientes, Evoluções Diárias. Construção de formulários avançados com forte validação em runtime (React Hook Form + Zod).
- **Componente Sinais Vitais:** Formulário ultra-rápido de preenchimento voltado para Mobile (Touch-Targets dimensionados via guidelines UI).
- **Prescrições e Fluxo eMAR:** Motor para transformar uma "Prescrição" em "Doses agendadas"; checagem beira de leito (mobile).
- **Notificações:** Alertas de atraso de medicação (Threshold alerts) roteados por Firebase Cloud Messaging.

### Fase 3: Operação e Manutenção (Mês 4)

- **Gerenciador de Ativos (Assets):** Cadastro de patrimônio.
- **Módulo Manutenção (Ordens de Serviço):** Abertura, designação de funcionário, registro de ação realizada e fechamento. Painel kanban preventivo.

### Fase 4: Gestão Financeira Completa (Mês 5)

- **Invoicing de Pacientes:** Fichas de faturamento mensal fixo vs variável (gastos extras com procedimentos).
- **Contas a Pagar/Receber:** Dashboard de fluxo de caixa (Entradas, Saídas, Balanço).
- **Folha e Adiantamentos:** Lançamento de adiantamentos vinculados ao RH do Módulo 1.

### Fase 5: IA e Visão do Produto Escalável (Mês 6+)

- **Módulo de Assistente Virtual de IA (Chatbot - MVP):** Integração com **Google Gemini** (via Firebase Extensions) aceitando inputs de texto natural e imagens para extrair informações (e.g. medicamentos aplicados, finanças).
- **Integração WhatsApp:** Conexão com a WhatsApp Cloud API via webhooks enlaçados ao Firebase Auth corporativo para permitir operação remota.
- **Análise e predição (LLMs):** Integração de modelos de linguagem para análise de notas médicas e sumarização da evolução diária.
- Analytics avançado: predição de alta / predição de piora geriátrica baseada no declínio dos sinais vitais.
- Portal Familiar (Read-Only) para acompanhamento dos parentes internados nas ILPIs.

---

## Definition of Done (DoD) - Entrega Técnica

Para que uma funcionalidade em qualquer fase transite do desenvolvimento ativo para a ramificação `main` protegida, ela **DEVE** atender aos seguintes critérios:

1. **Requisitos de Negócio Atendidos:** A feature performa exatamente o que foi acordado nos cartões/issues.
2. **Design e Responsividade Validados:** Foi testada funcionalmente em tamanhos de tela equivalentes à Recepção (Desktop) e Leito (Mobile).
3. **Segurança (Security Rules):** As regras do Firestore foram atualizadas no repositório para englobar as novas coleções afetadas, com testes rodados no emulador atestando as permissões cruzadas (RBAC).
4. **Sem Regressões (CI/CD Passou):** As ferramentas de Linting, e testes unitários existentes rodam com status Gained/Green na pipeline do PR.
5. **Code Review Aprovado:** Revisão de PR feita pelo Arquiteto ou par engajado focando em débito técnico mínimo.
6. **Feature Flagada (Se Necessário):** Impacta a base atual de produção? Deve estar operando via toggle ou lançada num horário de baixo fluxo/manutenção.
