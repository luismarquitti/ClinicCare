# Feature: Operação & Manutenção

**Épico:** 03 — Operação & Manutenção
**Fase do Roadmap:** Fase 3 (Mês 4)
**Status:** 🔍 In Review
**Criado:** 2026-03-13
**Atualizado:** 2026-03-13

---

## Visão

Digitalizar o controle de ativos patrimoniais e as ordens de serviço (corretiva e preventiva) da clínica, eliminando planilhas e garantindo rastreabilidade completa da manutenção de equipamentos médicos e infraestrutura.

---

## Personas Impactadas

- **Técnico de Manutenção:** Recebe ordens de serviço, registra ações realizadas, fecha chamados.
- **Coordenador Operacional / Admin:** Abre chamados, visualiza painel kanban, aprova fechamentos.

---

## Features Detalhadas

### F03.1 — Gerenciador de Ativos (Patrimônio)

> Como **Admin**, quero cadastrar e rastrear os ativos da clínica para ter visibilidade de todo o patrimônio e seu estado atual.

**Critérios de Aceite:**
- **Dado** que acesso o módulo de Ativos, **Quando** sou `admin` ou `tecnico`, **Então** vejo a lista paginada de ativos com filtros por categoria (médico, infraestrutura, TI).
- **Dado** que cadastro um novo ativo (nome, número de série, localização, fornecedor, data de aquisição), **Quando** salvo, **Então** o documento é criado em `ativos/{ativoId}` com `status: ativo`.
- **Dado** que um ativo entra em manutenção, **Quando** uma OS é aberta para ele, **Então** seu status muda automaticamente para `em_manutencao`.
- **Dado** que a OS é encerrada, **Quando** o técnico fecha o chamado, **Então** o ativo volta para `ativo` com o histórico de manutenção atualizado.

---

### F03.2 — Módulo de Ordens de Serviço (Kanban de Manutenção)

> Como **Coordenador Operacional**, quero visualizar todas as ordens de serviço em um painel kanban para gerenciar a fila de manutenção em tempo real.

**Critérios de Aceite:**
- **Dado** que acesso o módulo de Manutenção, **Quando** exibido no desktop, **Então** vejo as colunas: `Aberta | Em Andamento | Aguardando Peça | Concluída`.
- **Dado** que abro uma OS (tipo corretiva ou preventiva, ativo, descrição, urgência), **Quando** atribuo a um técnico, **Então** o técnico recebe notificação push e a OS aparece no seu painel mobile.
- **Dado** que o técnico registra a ação realizada (texto + foto opcional via câmera), **Quando** salva, **Então** o registro é armazenado em `ordensServico/{osId}/historico/{registroId}`.
- **Dado** que a OS é concluída, **Quando** o Admin aprova o fechamento, **Então** o timestamp de conclusão e o custo (se aplicável) são registrados.
- **Dado** que uma OS preventiva tem recorrência configurada, **Quando** a data de vencimento chega, **Então** uma nova OS é criada automaticamente via Cloud Function.

---

## Fora do Escopo (Fase 3)

- Integração com fornecedores externos / geração de PO de compra de peças
- QR Code em ativos físicos para abertura de OS via mobile scan (pode ser adicionado depois)
- Gestão de contratos de manutenção de terceiros (Fase 4+)
- Inventário de peças/estoque de manutenção (avaliação futura)

---

## Notas de Design

- Kanban do desktop: drag-and-drop entre colunas (Shadcn/UI DnD)
- Mobile para técnico: foco em abertura rápida e foto de evidência
- Alertas de OS preventiva vencida: badge vermelho no menu lateral

---

## Restrições Técnicas

- Acesso à manutenção: claims `tecnico`, `admin` ou `superAdmin`
- Criação de OS preventiva recorrente deve ser via Cloud Function (Scheduled Functions)
- Fotos de evidência armazenadas no Firebase Cloud Storage, não em base64 no Firestore
- `firestore.rules`: técnico pode ver e atualizar apenas OS atribuídas a ele (`resource.data.tecnicoId == request.auth.uid`)

---

## Riscos LGPD

- Módulo não processa dados de pacientes — risco LGPD menor
- Fotos de equipamentos não devem capturar acidentalmente dados de pacientes visíveis no background — orientação de uso ao técnico
