---
title: "Feature: Gestão Clínica — EHR & eMAR Móvel"
---
# Feature: Gestão Clínica — EHR & eMAR Móvel

**Épico:** 02 — Gestão Clínica — EHR & eMAR Móvel
**Fase do Roadmap:** Fase 2 (Mês 2-3)
**Status:** 🔍 In Review
**Criado:** 2026-03-13
**Atualizado:** 2026-03-13

---

## Visão

Núcleo clínico do ClinicCare: prontuário eletrônico completo (EHR) para registro de evoluções, sinais vitais e diagnósticos; motor de eMAR para transformar prescrições em doses agendadas e realizar a checagem de medicação à beira do leito com máxima segurança ao paciente.

---

## Personas Impactadas

- **Médico:** Prescreve medicações, registra evoluções médicas, visualiza histórico do paciente.
- **Enfermeiro:** Registra sinais vitais, evolução de enfermagem, realiza checagem eMAR.
- **Técnico de Enfermagem:** Realiza checagem de medicação à beira do leito (mobile).

---

## Features Detalhadas

### F02.1 — Cadastro de Pacientes/Residentes (EHR Base)

> Como **Admissão/Enfermagem**, quero cadastrar um novo paciente para que ele tenha um prontuário eletrônico único na plataforma.

**Critérios de Aceite:**
- **Dado** que acesso o módulo de Pacientes, **Quando** sou `clinico` ou `admin`, **Então** posso criar um novo cadastro.
- **Dado** que preencho o formulário de admissão (nome, nascimento, CID, alergias), **Quando** submeto, **Então** um documento é criado em `pacientes/{pacienteId}` com validação Zod.
- **Dado** que um paciente tem alergias cadastradas, **Quando** uma prescrição conflitante é criada, **Então** um alerta vermelho é exibido ao prescritor.

---

### F02.2 — Evoluções Diárias & Sinais Vitais

> Como **Enfermeiro**, quero registrar sinais vitais rapidamente via tablet para que o histórico clínico esteja sempre atualizado.

**Critérios de Aceite:**
- **Dado** que abro o prontuário de um paciente, **Quando** acesso "Sinais Vitais", **Então** vejo um formulário com touch-targets mínimos de 44px (guideline mobile).
- **Dado** que submeto sinais vitais, **Quando** um valor está fora do range normal (PA > 160/100, SpO2 < 92%), **Então** o campo é destacado em vermelho e um alerta é gerado.
- **Dado** que um médico acessa o prontuário, **Quando** visualiza "Evoluções", **Então** vê a timeline de evoluções médicas e de enfermagem separadas cronologicamente.
- Evoluções são sub-coleções: `pacientes/{id}/evolucoes/{evolucaoId}` — nunca atualizações de documento pai.

---

### F02.3 — Motor de Prescrições → Doses Agendadas (eMAR Engine)

> Como **Médico**, quero prescrever uma medicação com horário e duração para que o sistema gere automaticamente o calendário de administração.

**Critérios de Aceite:**
- **Dado** que prescrev uma medicação (nome, dose, via, frequência, início, fim), **Quando** salvo, **Então** o sistema gera os registros de doses em `emar/{pacienteId}/doses/` para cada horário do período.
- **Dado** que uma prescrição é suspensa, **Quando** o médico clica "Suspender", **Então** todas as doses futuras são carimbadas como `status: cancelada`.
- **Dado** que é gerado pelo motor via Cloud Function (não client-side), **Quando** a função executa, **Então** o log de execução é salvo em `auditLogs`.

---

### F02.4 — Checagem à Beira do Leito (eMAR Mobile)

> Como **Técnico de Enfermagem**, quero confirmar a administração de uma dose via celular para que o registro seja imediato e seguro.

**Critérios de Aceite:**
- **Dado** que acesso o eMAR no celular, **Quando** seleciono meu paciente, **Então** vejo apenas as doses do horário atual (janela de ±30 min).
- **Dado** que confirmo uma dose com swipe, **Quando** o registro é salvo, **Então** o campo `administradoPor`, `timestamp` e `status: administrada` são gravados atomicamente.
- **Dado** que uma dose não é confirmada no horário, **Quando** a janela passa, **Então** o status muda para `atrasada` automaticamente via Cloud Function.
- Interface mobile: fonte mínima 16px, contraste mínimo WCAG AA.

---

### F02.5 — Notificações de Atraso de Medicação (FCM)

> Como **Enfermeiro responsável**, quero receber uma notificação push quando uma medicação estiver atrasada para que possa agir imediatamente.

**Critérios de Aceite:**
- **Dado** que uma dose passa 30 min sem confirmação, **Quando** a Cloud Function de monitoramento executa, **Então** um push notification é enviado via Firebase Cloud Messaging ao responsável de plantão.
- **Dado** que recebo a notificação, **Quando** clico nela, **Então** sou direcionado diretamente à dose atrasada na interface do paciente.

---

## Fora do Escopo (Fase 2)

- Integração com sistemas externos de prontuário (HIS/RIS)
- E-prescribing / assinatura digital de prescrições (requer ICP-Brasil)
- Controle de lote e validade de medicamentos (Fase 3)
- IA para análise de prontuários (Fase 5)

---

## Notas de Design

- eMAR mobile: design para uso com luvas — botões grandes, swipe confirmação
- EHR desktop: grid denso, ideal para monitores de recepção/posto de enfermagem
- Timeline de evoluções: diferenciação visual entre médico (azul) e enfermagem (verde)

---

## Restrições Técnicas

- Dados de pacientes são **altamente sensíveis** — acesso apenas com claim `clinico` ou `admin`
- Sub-coleções para evoluções e doses (não arrays em documentos)
- Motor de eMAR (geração de doses) **obrigatoriamente** via Cloud Function
- FCM token deve ser revogado ao logout

---

## Riscos LGPD

- Dados de saúde são dados sensíveis de categoria especial (art. 11 LGPD)
- Consentimento necessário para coleta de biometria/sinais vitais contínuos
- Direito ao esquecimento: definir política de retenção de dados clínicos (CFM/normativas)
- Log de auditoria obrigatório: quem acessou, quando e o que visualizou
