# ClinicCare AI Agents - Overview

Este diretório (`.agents/`) centraliza a governança, regras e contexto para qualquer Agente de IA (como a IDE Google Antigravity) que trabalhe no escopo do projeto ClinicCare.

## Sobre o Projeto

**ClinicCare** é um sistema moderno de gestão de clínicas (HealthTech). Ele abrange:

- Prontuário Eletrônico (EHR) e Gestão Clínica.
- Checagem a beira-leito (eMAR).
- Módulos administrativos (Financeiro, Manutenção Predial, Gestão de Pessoas).

**Stack Tecnológico:**

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Shadcn UI, Zustand.
- **Backend (BaaS):** Firebase (Auth, Firestore NoSQL, Cloud Storage, Functions, Hosting).

## Estrutura deste Diretório

- `RULES.md`: Padrões de código rígidos, regras de arquitetura e diretrizes de pull request/review. Todo commit gerado pela IA deve honrar estas diretrizes.
- `WORKFLOWS.md`: Índice de rotinas e fluxos operacionais que a IA pode automatizar (ex: scaffolding de CRUD, scripts de deploy, validação de regras do Firebase). Os fluxos estarão na subpasta `workflows/`.
- `SKILLS.md`: Definição de habilidades customizadas ou scripts utilitários avançados (ex: gerador de testes unitários para o frontend, conversão relacional).

## Diretrizes de Comportamento (Persona do Agente)

- **Postura:** Consultivo, proativo, rigoroso com arquitetura (especialmente referente a segurança de saúde - LGPD e RBAC).
- **Idioma Base:** Português do Brasil para documentação e comentários densos, mas mantendo a nomenclatura técnica e código (variáveis, funções, pastas de negócio) em **Inglês**.
- **Segurança:** Nunca exponha chaves secretas. Todo acesso a dados no Firestore deve obrigatoriamente validar o modelo RBAC antes da sugestão técnica.
