# Feature: IA, Chatbot & Escalabilidade

**Épico:** 05 — IA, Chatbot & Escalabilidade
**Fase do Roadmap:** Fase 5 (Mês 6+)
**Status:** 📋 Backlog
**Criado:** 2026-03-13
**Atualizado:** 2026-03-13

---

## Visão

Elevar o ClinicCare a um produto inteligente: assistente virtual multimodal via Google Gemini (texto + imagem), integração com WhatsApp Business para operação remota, análise preditiva geriátrica baseada em sinais vitais históricos, e Portal Familiar read-only para transparência com familiares de residentes.

---

## Personas Impactadas

- **Todos os usuários:** Utilizam o chatbot para inserção/consulta de dados por linguagem natural.
- **Médico:** Recebe sumarizações de prontuário e alertas preditivos.
- **Familiar do Residente:** Acompanha a evolução do parente via Portal Familiar (read-only).
- **Gestão:** Solicita relatórios operacionais via chat.

---

## Features Detalhadas

### F05.1 — Assistente Virtual Gemini (MVP)

> Como **Enfermeiro**, quero informar em linguagem natural que administrei uma medicação para que o sistema registre sem que eu precise navegar por múltiplas telas.

**Critérios de Aceite:**
- **Dado** que abro o chatbot e digo "apliquei 500mg de dipirona IV no Residente João às 14h", **Quando** o Gemini processa, **Então** o sistema identifica: paciente, medicação, dose, via, horário — e solicita confirmação antes de registrar.
- **Dado** que envio uma foto da caixinha do remédio, **Quando** o Gemini analisa a imagem, **Então** extrai o nome do medicamento, concentração e validade.
- **Dado** que confirmo a ação, **Quando** o registro é feito, **Então** vai para o eMAR exatamente como se tivesse sido registrado manualmente.
- **Dado** que o Gemini não tem certeza da interpretação, **Quando** a confiança é baixa, **Então** ele solicita esclarecimento antes de qualquer ação.

---

### F05.2 — Integração WhatsApp Business

> Como **Técnico de Enfermagem em plantão noturno**, quero registrar informações via WhatsApp para ter acesso sem precisar do app instalado.

**Critérios de Aceite:**
- **Dado** que envio uma mensagem via WhatsApp para o número corporativo da clínica, **Quando** autenticado via link único, **Então** o assistente de IA responde e processa o comando.
- **Dado** que faço uma solicitação via WhatsApp, **Quando** o webhook do Firebase processa, **Então** o registro é feito no mesmo Firestore, indistinguível de uma entrada via app.
- **Dado** que sou um usuário não autorizado, **Quando** envio mensagem ao número corporativo, **Então** recebo mensagem de acesso negado sem exposição de dados.

---

### F05.3 — Análise Preditiva Geriátrica (LLM)

> Como **Médico**, quero receber alertas quando o padrão de sinais vitais de um paciente indica risco de piora para intervir preventivamente.

**Critérios de Aceite:**
- **Dado** que um paciente tem 7+ registros de sinais vitais nos últimos 7 dias, **Quando** o modelo de análise executa (agendado diariamente), **Então** uma pontuação de risco (baixo/médio/alto) é calculada e exibida no prontuário.
- **Dado** que a pontuação de risco sobe para "alto", **Quando** o alerta é gerado, **Então** o médico responsável recebe notificação push com sumário dos sinais vitais relevantes.
- **Dado** que solicito "sumário do paciente João dos últimos 30 dias", **Quando** o Gemini acessa os dados autorizados, **Então** gera um sumário narrativo em português clinicamente adequado.

---

### F05.4 — Portal Familiar (Read-Only)

> Como **familiar de residente**, quero acompanhar a evolução do meu parente de forma segura para ter tranquilidade sobre o cuidado prestado.

**Critérios de Aceite:**
- **Dado** que o familiar acessa o link de convite enviado pela clínica, **Quando** cria sua conta, **Então** tem acesso apenas ao perfil do seu parente (sem acesso a outros pacientes).
- **Dado** que acesso o portal, **Quando** visualizo a última evolução, **Então** vejo apenas: data, profissional (sem CRM), resumo sanitizado — **sem dados de medicação** (sigilo médico).
- **Dado** que uma nova evolução é registrada, **Quando** o médico autoriza a visibilidade ao familiar, **Então** o familiar recebe notificação (push ou e-mail).
- **Dado** que sou familiar, **Quando** tento acessar qualquer dado além do meu parente, **Então** o Firestore retorna `PERMISSION_DENIED`.

---

## Fora do Escopo (Fase 5)

- IA para geração de relatórios regulatórios (ANVISA, CFM) — requer validação regulatória
- Diagnóstico assistido por IA (escopo médico-legal complexo)
- Integração com planos de saúde / TISS
- App nativo separado para familliares (avaliar demanda)

---

## Notas de Design

- Chatbot: UI de chat com bolhas tipo WhatsApp, input multimodal (texto + câmera)
- Portal Familiar: design simples, amigável para idosos/não-técnicos, fonte grande
- Dashboard preditivo: sparklines de tendência + badge de risco colorido

---

## Restrições Técnicas

- Gemini API via Firebase Extensions ou Vertex AI — nunca expor API key no client
- WhatsApp: webhook via Firebase Functions com validação de assinatura (HMAC-SHA256 do Meta)
- Portal Familiar: claim `familiar:{pacienteId}` para isolamento granular no Firestore
- Modelos preditivos: executar via Cloud Functions agendadas, resultados em `predições/{pacienteId}`
- Qualquer ação de escrita pelo chatbot **requer confirmação humana** antes de persistir

---

## Riscos LGPD

- Dados de saúde processados por IA: exige base legal e consentimento explícito do paciente/responsável
- Dados enviados ao Gemini (Google): verificar DPA e localização de processamento de dados de saúde
- Portal Familiar: definir claramente quais dados são compartilháveis com familiares (sigilo médico)
- Dados de WhatsApp: mensagens devem ser tratadas como dados pessoais e não armazenadas além do necessário
- Log de auditoria: toda consulta de dados de paciente pelo chatbot deve ser logada em `auditLogs`
