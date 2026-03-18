---
title: "Revisão Arquitetural e Propostas de Modernização - Março de 2026"
---
# Revisão Arquitetural e Propostas de Modernização - Março de 2026

Este documento foi gerado a partir do workflow `architecture-review.workflow` com o cenário base (React, Firebase, Zustand). O objetivo é garantir escalabilidade, resiliência e mitigação de débitos técnicos para o produto ClinicCare.

## 1. Análise Arquitetural Inicial (Dívidas Técnicas e Gargalos)

A inspeção da branch atual evidenciou alguns gargalos consideráveis para crescimento:

- **Monolito de UI no Frontend:** As páginas e componentes não possuem fronteiras claras (Bounded Contexts). Todos compartilham a mesma estrutura root `src/pages` dependendo de stores globais.
- **Tragédia do Zustand com `onSnapshot`:** O `App.tsx` invoca instâncias de `onSnapshot` do Firestore para baixar TODAS as coleções ativas (`residents`, `vitalSigns`, `medications`, `financial`, etc) diretamente na memória do Zustand.
  - *Problema:* Escalonamento em "O(N)". À medida que a base cresce, os clients irão descarregar bancos inteiros na memória, causando gargalos de faturamento astronômicos de *Reads* do Firestore e *Memory Leaks* nos browsers dos clientes.
- **Falta de Camadas Puras (Domain):** A regra de negócio se esconde dentro de cliques de botões ou side-effects do Zustand, que deveria abrigar apenas estado cliente, não regras complexas de dados de pacientes ou faturamento.

## 2. Emprego de Padrões Arquiteturais (DDD & Feature-Sliced)

Para suportar o crescimento sem se tornar uma "large ball of mud", a arquitetura propõe a separação via **Feature-Sliced Design** orientada por domínios.

**Diretórios (Bounded Contexts):**

```text
src/
└── features/
    ├── clinical/     # eMAR, Sinais vitais, Evoluções
    ├── financial/    # Faturamento, Invoices, Despesas
    ├── hr/           # RH, Adiantamentos
    ├── maintenance/  # Ativos, OS
    └── core/         # Autenticação, RBAC, Roles Globais
```

Cada feature agrupará sua própria lógica de apresentação, use-cases e integração com o Firebase (`api`/`services` exclusivos).

## 3. Design e Estratégia de Microsserviços

O ClinicCare roda via Firebase (Serverless), o que possibilita um design *Microservices-like* através do **Cloud Functions**.

- **Desacoplamento Assíncrono (Event-Driven):** O frontend não deverá mais escrever cross-domain. Quando uma enfermeira administra um medicamento, ela não modifica a tabela de faturamento; ela despacha a ação para a camada clínica, e o Cloud Function Clínico publica um *evento interno lógico* (Pub/Sub) para o Cloud Function Financeiro assinar e processar o custo em background.
- **Segurança (Zero-Trust APIs):** Rotas confidenciais de faturamento e administração clínica devem migrar para as Firebase Callable Functions com validação de payload estrita e cruzamento do Access Token.

## 4. CQRS e Event Sourcing

Sistemas de Saúde (EHR/eMAR) requerem nível militar de auditoria. NoSQL baseados em operações puras destrutíveis dificultam esta triagem.

- **Event Sourcing no Módulo Clínico (eMAR):** Em vez de utilizar o Firebase `updateDoc` repetidamente no status de uma medicação, iremos adotar logs imutáveis na sub-coleção `domain_events` (Ex: `MedicationPrescribed`, `MedicationDoseGiven`, `MedicationMissed`). Todo o histórico do paciente pode ser reconstituído matematicamente.
- **CQRS na Prática:** O fluxo acima (Command) reajusta uma "view projetada" num documento Firestore exclusivo e pronto-para-leitura de painéis rápidos para o React (Query).
- **Gerenciamento de Transações Longas (Sagas):** Fluxos complexos na nuvem como "Alta de Paciente" serão orquestrados por uma função Saga. Ela fará o cleanup da parte clínica, o fechamento do estoque de remédios e a geração da fatura final. Se o backend financeiro cair no meio, a Saga roda as operações compensatórias ou insiste (Durable Execution).

## 5. Formalização e Próximos Passos (ADRs)

Foram gerados e adicionados ao repositório três Architecture Decision Records na pasta `doc/adr`:

- **ADR-0002:** Adoção de arquitetura voltada a "Features" (DDD Mapping).
- **ADR-0003:** Aplicação de CQRS e Event Sourcing para registros clínicos e faturamento.
- **ADR-0004:** Separação do estado Server vs. UI, depreciando o uso indiscriminado do Zustand global de firestore reads em favor de Server-State cache (React Query) e subscrições de snapshot modulares rigorosamente limitadas.
