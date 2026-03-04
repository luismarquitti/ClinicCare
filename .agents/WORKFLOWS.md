# Workflows Padronizados para Agentes de IA

Os workflows definem roteiros "passo-a-passo" para tarefas corriqueiras do projeto, visando garantir consistência.
A execução do workflow deve ler a regra correspondente na pasta `.agents/workflows/` (a ser criada conforme demanda).

## Workflows Previstos / Implementados

- **`scaffold-module.workflow`**: Assistente para criação de novo módulo administrativo.
  - *Gera os arquivos TSX, hooks, validações Zod, rotas e regras do Firestore stub*
- **`deploy-check.workflow`**: Rotina de verificação antes do push para CD.
  - *Roda testes, emulador do firebase para rules e compila typescript*
- **`migrate-nosql-sql.workflow`**: Auxilia na preparação dos dados para exportação e modelagem no PostgreSQL (Fase Futura).
- **`docs-manager.workflow`**: Atuar como um Analista de Requisitos e Arquiteto de Software proativo para atualizar documentação (Já existente via instrução de usuário).

**(Novos workflows devem ser documentados aqui)*.*
