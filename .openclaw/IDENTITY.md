# Contexto de Projeto — ClinicCare

> Este arquivo é lido pelo **Chief** ao trabalhar neste repositório.
> As regras genéricas de desenvolvimento estão em `~/.openclaw/workspace-chief/SOUL.md`.

## Sobre o Projeto

**ClinicCare** é um SaaS HealthTech brasileiro para gestão de clínicas e lares de idosos.

| Domínio | Descrição |
|---|---|
| EHR / Clinical | Electronic Health Records, gestão de pacientes |
| eMAR | Registros de administração de medicamentos |
| Administrative | Financeiro, manutenção, RH |

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | React 19, TypeScript, Vite 6, Tailwind CSS v4, Shadcn/UI, Zustand |
| Backend (BaaS) | Firebase (Auth, Firestore, Cloud Storage, Functions, Hosting) |
| Testes | Vitest, Testing Library, Playwright, Storybook |
| Linting | `tsc --noEmit` (via `yarn lint`) |

## Repositório

- **GitHub**: `luismarquitti/ClinicCare`
- **Branch padrão**: `main`
- **Package manager**: `yarn` (v1.22.22)

## Comandos de Validação

```bash
yarn lint    # tsc --noEmit — verificação de tipos
yarn test    # vitest run — testes unitários
yarn build   # vite build — verificação de compilação
```

## Regras Específicas do Projeto

1. **Ler `AGENTS.md`** na raiz antes de qualquer ação — contém regras do projeto e DoD
2. **Ler `.agents/rules/commits.md`** — padrão Conventional Commits obrigatório
3. **Ler `.agents/workflows/`** — workflows específicos disponíveis
4. **TypeScript only** — Strict mode, evitar `any`
5. **Tailwind CSS** com design tokens — nunca hardcodar cores
6. **Zustand** para estado global — nunca Redux
7. **Firestore rules** — atualizar `firestore.rules` se acessar novas coleções
8. **RBAC via Custom Claims** — sempre validar antes de implementar acesso a dados
9. **LGPD** — dados de saúde exigem cuidado extra com privacidade
10. **Linguagem**: Documentação em PT-BR, código em inglês

## Labels do GitHub

| Label | Uso |
|---|---|
| `module:financial` | Módulo financeiro |
| `module:clinical` | Módulo clínico/assistencial |
| `module:admin` | Módulo administrativo |
| `module:ai` | Integração com IA (Gemini) |
| `priority:high/medium/low` | Prioridade |
| `type:feature/bug/refactor/docs` | Tipo de tarefa |
| `agent:openclaw` | Tarefas delegadas ao agente |

## Template de PR

```markdown
## 📋 Issue Relacionada
Fixes #N

## 🎯 O que foi feito
- Descrição clara das alterações

## ✅ Checklist
- [ ] `yarn lint` passa
- [ ] `yarn test` passa
- [ ] `yarn build` compila
- [ ] Conventional Commits seguidos
- [ ] `firestore.rules` atualizado (se aplicável)
- [ ] Nenhum `console.error` ou `alert` no código

## 🧪 Como Testar
1. `git checkout branch-name`
2. `yarn install && yarn dev`
3. Verificar [descrição do teste manual]
```

## Documentação

- `doc/prd/` — Product Requirements Documents
- `doc/adr/` — Architecture Decision Records
- `doc/specs/` — Feature specifications
