# Conformidade Regulatória e Segurança - ClinicCare

O processamento de dados de saúde envolve regimentos legais estritos no âmbito nacional e internacional. Como a plataforma abrigará Prontuários Eletrônicos (PHI - Protected Health Information) e registros operacionais de estruturas de saúde como ILPIs, a segurança é o pilar não negociável do produto.

## 1. Compliance e LGPD (Lei Geral de Proteção de Dados - Brasil)

### Princípios Aplicados na Arquitetura

- **Minimização de Dados e Finalidade:** Coletaremos apenas as informações clínicas e sociais estritamente vitais à continuidade do serviço de assistência e gestão de faturamento.
- **Pseudonimização (onde aplicável):** Banco de dados mantido fora do limite de exposição pública. Exportações de dados para relatórios gerenciais globais que não precisem da identificação visual do paciente devem anonimizar os nomes e documentos.
- **Portabilidade Eletrônica:** Desenvolver features de "Exportar Histórico Completo do Paciente" nativamente para o usuário (em PDF tabulado / JSON criptografado) respeitando o direito legal à cópia de prontuário.
- **Gestão de Exclusão (Privacy Right):** Política de Retenção de Dados. Enquanto normativas médicas brasileiras exigem retenção de prontuário por décadas, dados transacionais de currículos/funcionários rejeitados podem possuir deleção agendada.

### Compartimentalização da Base de Dados (Privacy by Design)

O Firebase será parametrizado de modo que o Firestore isole fisicamente acessos. As sub-coleções de evolução clínica têm regras imutáveis impedindo letura pelas interfaces financeiras.

- Os "Rules" do Firebase são testados em ambiente de emulador no workflow de CI, prevenindo o push errôneo de regras permissivas.

## 2. Trilhas de Auditoria (Logs)

Não é aceitável a manipulação silenciosa de um registro clínico legal.

- **Monitoramento de Evolução de Prontuário:** Registros de ações eMAR (Checagem de medicamento), Edições de evolução e Exclusões (Soft-deletes) devem ser capturados em logs imutáveis.
- **Cloud Functions para Logging Integrado:**
  Utilizar Triggers de documento (`onWrite`) do Firebase Functions que enviam logs com carimbo de tempo inviolável do servidor (`admin.firestore.FieldValue.serverTimestamp()`), ID do funcionário, IP de conexão e deltas (Valor Anterior -> Novo Valor) para log aggregation ou coleções de `/auditor_logs`.

## 3. Conformidade com ILPIs e Saúde (Ex: RDC 502/2021)

O framework legal de fiscalizações da ANVISA/Vigilância Sanitária exige histórico rígido sobre a operação asilar:

- **Prontuário Individualizado Atualizado:** O sistema cobre a RDC provendo um módulo de Evoluções e Registro de intercorrências acessível com assinatura digital padronizada (registro de conselhos CRM/COREN da pessoa logada impresso na data).
- **Planejamento Terapêutico e Nutricional:** A modelagem prevê subdivisões no EHR para anotações de Nutrição e Fisioterapia separadas.
- **Garantia de Assistência 24h:** O módulo visualiza rapidamente turnos e escalas cruzado ao eMAR garantindo que nenhum atraso em medicação fique não detectado. As prescrições médicas são parametrizadas no tempo.

## 4. Segurança de Infraestrutura Criptográfica

Assegurada pela delegação integral de tráfego ao pool de infraestrutura Google Firebase:

- Toda e qualquer transmissão de dados do Frontend ocorre obrigatoriamente forçado em HTTPS/TLS atualizados.
- O Storage bucket utiliza criptografia nativa AES-256 at-rest (disco do Google Cloud).
- O processo de Senhas flui sob os protocolos criptográficos baseados em SCrypt via Firebase Auth. Jamais armazenaremos senhas brutas no banco do projeto.
- Tokens expiráveis rápidos na sessão do frontend visam expirar acessos de computadores de recepção inativos por inatividade (Auto-Logoff).

## 5. Plano de Continuidade e Disaster Recovery

Dada a natureza contínua de clínicas (24/7) e a dependência crítica dos dados, estratégias de recuperação são desenhadas dentro do ecossistema Google:

- **Point-in-Time Recovery (PITR):** Compulsoriamente habilitado no Firebase Firestore. Permite a reversão cirúrgica do banco de dados para qualquer segundo na janela dos últimos 7 dias em caso de corrupção lógica do banco ou exclusões acidentais.
- **Scheduled Backups (Cold Storage):** Exportações automatizadas noturnas do Firestore para os buckets do Google Cloud Storage (`cron-backup-job`), mantidos por retenção regimental legal de longo prazo armazenados em classes mais baratas ("Archive" storage tiers).
- **Failover Global:** Nativamente atendido pelo Firebase Operations; uso implícito de armazenamento e roteamento multirregional na infraestrutura Cloud.
