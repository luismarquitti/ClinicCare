---
title: "ADR-0003: Aplicação de CQRS e Event Sourcing para Processos Críticos"
---
# ADR-0003: Aplicação de CQRS e Event Sourcing para Processos Críticos

## Status

Accepted

## Context

Num ecossistema Health-Tech, especialmente a parte de registros clínicos eletrônicos (Clinical Records, Sinais Vitais) e administração de medicamentos (eMAR), **auditoria total é requerida**. Por ser estruturado primariamente em NoSQL (Firestore), updates e deleções convencionais são "destrutivos", isto é, o estado anterior requer logs de auditoria pesados (shadow tables) para ser reconstituído.

Além disso, cruzamentos entre o que foi feito no front clínico para gerar cobranças (faturamento financeiro) implicam em transações distribuídas (Sagas).

## Decision Drivers

* **Necessidade de auditoria impecável** em dados de saúde.
* Performance rápida de escrita para os enfermeiros e performance ótima de leitura para dashboards.
* Resiliência a falhas de rede do lado backend.

## Considered Options

### Option 1: Event Sourcing + CQRS via Cloud Functions

- **Pros**: Todas as operações gravam Eventos na coleção `domain_events` (ex: `PacienteInternado`, `MedicaoTirada`). Uma Cloud Function reage a isso e "projeta" a view atualizada do Prontuário para uma coleção de leitura rápida (CQRS). Nunca perdemos histórico. Lógicas financeiras podem apenas ouvir e reagir a esses eventos anonimamente.
* **Cons**: Aumenta a complexidade; funções de snapshot podem causar pequenos "eventual consistency" delays. Requer maior capacidade de monitoramento das Functions.

### Option 2: Auditoria Simples (Criar Sub-coleção de Logs via UI)

- **Pros**: Fácil e rápido de implementar.
* **Cons**: Front-ends podem ser burlados, logs podem não ser escritos em caso de falha de conexão logo após o update original, consistência e confiabilidade perigosas.

## Decision

Adotaremos o padrão de **Event Sourcing acoplado com CQRS** processados nativa e obrigatoriamente no Backend (Firebase Cloud Functions). Funcionalidades core do eMAR e faturamento devem ser enviadas via `Command` para as "Callable Functions", que anexarão o evento ao Event Store provendo histórico perfeito.

## Consequences

### Positive

- Trilhas de auditoria "out of the box", imutáveis e auditáveis via software.
* Desacoplamento dos Módulos (Financeiro gerará a fatura puramente com base em um evento gerado pelo módulo Clínico).
* Maior segurança (Front end não modifica diretamente dados no esquema destrutível de Prontuário).

### Negative

- Necessidade de gerenciar Firebase Cloud Functions e garantir *idempotência* e orquestrações de Sagas caso ocorram falhas transacionais.
