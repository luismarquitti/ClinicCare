# Conformidade Regulatória e Segurança - ClinicCare

O processamento de dados de saúde envolve regimentos legais estritos no âmbito nacional e internacional. Como a plataforma abrigará Prontuários Eletrônicos (PHI - Protected Health Information) e registros operacionais de estruturas de saúde como ILPIs, a segurança é o pilar não negociável do produto.

## 1. Compliance e LGPD (Lei Geral de Proteção de Dados - Brasil)

### Princípios Aplicados na Arquitetura

- **Minimização de Dados e Finalidade:** Coletaremos apenas as informações clínicas e sociais estritamente vitais à continuidade do serviço de assistência e gestão de faturamento.
- **Pseudonimização (onde aplicável):** Banco de dados mantido fora do limite de exposição pública. Exportações de dados para relatórios gerenciais globais que não precisem da identificação visual do paciente devem anonimizar os nomes e documentos.
- **Portabilidade Eletrônica:** Desenvolver features de "Exportar Histórico Completo do Paciente" nativamente para o usuário (em PDF tabulado / JSON criptografado) respeitando o direito legal à cópia de prontuário.
- **Gestão de Exclusão (Privacy Right):** Política de Retenção de Dados. Enquanto normativas médicas brasileiras exigem retenção de prontuário por décadas, dados transacionais de currículos/funcionários rejeitados podem possuir deleção agendada.

### Compartimentalização da Base de Dados (Privacy by Design) e Controle de Acesso (RBAC)

O ecossistema Cloud será parametrizado de modo que o Firestore e o Cloud Storage isolem os acessos na ponta do cliente, baseados em regras rígidas:

- **Separação Clínica/Administrativa:** O submódulo clínico (incluindo Histórico Médicos, Medicações e Alergias) não pode ser lido por perfis logísticos (Recepcionistas, Atendentes ou Financeiro). O acesso (leitura e gravação) é mascarado e bloqueado via *Custom Claims* do Firebase Auth, sendo restrito apenas à equipe assistencial (`HEALTH_PRO`, médicos, enfermeiros).
- **Proteção de Anexos e Documentos (Storage):** Resultados de exames em PDF ou imagens são transferidos para os buckets do Firebase Storage. As `Security Rules` do Storage garantirão que uma URL de arquivo seja renderizada unicamente se o token de acesso que a requisita for de um profissional de saúde autorizado formalmente no contexto do paciente associado.
- Os "Rules" do Firebase (tanto Firestore quanto Storage) são testados obrigatoriamente em ambiente de emulador no workflow de CI, prevenindo o push acidental de regras permissivas para produção.

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
