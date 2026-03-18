---
title: "Feature: Gestão Financeira Completa"
---
# Feature: Gestão Financeira Completa

**Épico:** 04 — Gestão Financeira Completa
**Fase do Roadmap:** Fase 4 (Mês 5)
**Status:** 🔍 In Review
**Criado:** 2026-03-13
**Atualizado:** 2026-03-13

---

## Visão

Módulo financeiro integrado que cobre o ciclo completo de receitas e despesas da clínica: faturamento mensal de pacientes/residentes (com cobrança de procedimentos avulsos), contas a pagar/receber, dashboard de fluxo de caixa e gestão de adiantamentos salariais integrada ao módulo de Pessoas (Épico 01).

---

## Personas Impactadas

- **Gestão Financeira:** Emite faturas, controla contas a pagar/receber, visualiza fluxo de caixa.
- **Administrador:** Aprova pagamentos e visualiza relatórios de rentabilidade.
- **RH:** Lança adiantamentos salariais e acompanha folha de pagamento.

---

## Features Detalhadas

### F04.1 — Invoicing de Pacientes (Faturamento Mensal)

> Como **Gestão Financeira**, quero emitir a fatura mensal de cada paciente para que o faturamento seja preciso e rastreável.

**Critérios de Aceite:**
- **Dado** que acesso o módulo Financeiro, **Quando** sou `financeiro` ou `admin`, **Então** vejo a lista de pacientes com status de fatura do mês vigente.
- **Dado** que gero a fatura de um paciente, **Quando** seleciono o mês, **Então** o sistema compõe automaticamente: mensalidade fixa + procedimentos avulsos registrados no período (EHR).
- **Dado** que a fatura é gerada, **Quando** salvo, **Então** o documento é criado em `faturas/{pacienteId}/{mesAno}` imutável (append-only).
- **Dado** que um pagamento é registrado, **Quando** o status da fatura muda para `paga`, **Então** a movimentação é lançada nas Contas a Receber com timestamp e usuário responsável.

---

### F04.2 — Contas a Pagar/Receber + Dashboard de Fluxo de Caixa

> Como **Administrador**, quero visualizar o saldo consolidado de entradas, saídas e balanço para tomar decisões financeiras informadas.

**Critérios de Aceite:**
- **Dado** que acesso o Dashboard Financeiro, **Quando** seleciono o período, **Então** vejo três cards: `Total Entradas`, `Total Saídas` e `Balanço Líquido`.
- **Dado** que lanço uma conta a pagar (fornecedor, valor, vencimento, categoria), **Quando** salvo, **Então** aparece na lista e no gráfico de saídas projetadas.
- **Dado** que uma conta vence hoje ou já venceu, **Quando** o dashboard carrega, **Então** a conta aparece destacada em vermelho com badge "Vencida".
- **Dado** que o dashboard exibe gráfico de fluxo de caixa, **Quando** o mês corrente é exibido, **Então** há projeção dos próximos 30 dias baseada em vencimentos cadastrados.

---

### F04.3 — Folha e Adiantamentos Salariais

> Como **RH**, quero lançar e controlar adiantamentos salariais para que os descontos sejam aplicados corretamente na folha de pagamento.

**Critérios de Aceite:**
- **Dado** que acesso o módulo de Adiantamentos, **Quando** sou `rh` ou `admin`, **Então** vejo a lista de colaboradores (integrada ao Épico 01) com saldo de adiantamento disponível.
- **Dado** que aprovo um adiantamento, **Quando** registro valor e data, **Então** o saldo de adiantamento do colaborador é atualizado e o lançamento vai para Contas a Pagar (internamente).
- **Dado** que gero o relatório de folha, **Quando** seleciono o mês, **Então** o PDF/CSV exportado consolida: salário bruto, adiantamentos descontados e líquido a pagar.
- **Dado** que operações financeiras ocorrem, **Quando** qualquer lançamento é feito, **Então** um log de auditoria é gerado com usuário, timestamp e valor.

---

## Fora do Escopo (Fase 4)

- Emissão de NF-e ou integração com sistema de notas fiscais
- Integração bancária / conciliação automática (Open Finance)
- Cálculo automático de encargos trabalhistas (INSS, FGTS, IRRF)
- Controle de estoque de materiais com custo integrado (avaliação futura)

---

## Notas de Design

- Dashboard financeiro: gráficos com Recharts (já no stack React)
- Faturas: formato de impressão/PDF para envio ao familiar responsável
- Cores: verde para entradas, vermelho para saídas, azul para projeção

---

## Restrições Técnicas

- Dados financeiros: acesso restrito a claims `financeiro`, `admin`, `superAdmin`
- Documentos de fatura são **append-only** — nunca deletar ou editar valor histórico
- Operações de lançamento em lote (fechamento de mês) devem ser Cloud Functions transacionais
- `firestore.rules`: `financeiro` pode ler e criar, mas **não** deletar registros financeiros

---

## Riscos LGPD

- Dados financeiros de pacientes são dados pessoais (art. 5, LGPD)
- Relatórios exportados devem ser criptografados ou com senha se contiverem dados pessoais
- Definir período de retenção de dados financeiros conforme legislação fiscal (5 anos)
- Log de acesso a dados financeiros deve ser mantido em `auditLogs`
