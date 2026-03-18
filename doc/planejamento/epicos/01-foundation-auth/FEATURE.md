---
title: "Feature: Fundação, Auth & Onboarding B2B"
---
# Feature: Fundação, Auth & Onboarding B2B

**Épico:** 01 — Fundação, Auth & Onboarding B2B
**Fase do Roadmap:** Fase 1 (Mês 1)
**Status:** 🔄 In Progress
**Criado:** 2026-03-13
**Atualizado:** 2026-03-13

---

## Visão

Estabelecer a infraestrutura base do ClinicCare: pipeline CI/CD confiável, sistema de autenticação B2B seguro com RBAC granular via Custom Claims, e o módulo inicial de Pessoas/Colaboradores — pré-requisito técnico e de negócio para todos os outros épicos.

---

## Personas Impactadas

- **Super Admin:** Cria a conta da clínica, convida primeiros colaboradores, define perfis de acesso.
- **RH / Administrativo:** Visualiza e gerencia o cadastro básico de colaboradores.
- **Todo usuário:** Passa pelo fluxo de login B2B para acessar o sistema.

---

## Features Detalhadas

### F01.1 — Pipeline CI/CD

> Como **desenvolvedor**, quero que todo PR tenha linting, testes e deploy automático para que o código em `main` seja sempre confiável.

**Critérios de Aceite:**
- **Dado** que um PR é aberto, **Quando** o GitHub Actions executa, **Então** ESLint e Prettier são verificados e falham o build em edge.
- **Dado** que os lints passam, **Quando** os testes rodam, **Então** Vitest executa com 0 falhas.
- **Dado** que tudo passa, **Quando** o merge ocorre em `main`, **Então** o Firebase Hosting recebe o deploy automaticamente.

---

### F01.2 — RBAC com Custom Claims

> Como **Super Admin**, quero atribuir papéis (roles) a colaboradores para que cada usuário acesse apenas o que lhe é permitido.

**Critérios de Aceite:**
- **Dado** que um usuário tenta acessar dados de paciente, **Quando** não possui o claim `role: clinico`, **Então** o Firestore retorna `PERMISSION_DENIED`.
- **Dado** que um Super Admin define o papel de um usuário, **Quando** a Cloud Function de atribuição de role executa, **Então** o Custom Claim é atualizado e validado pelo Firestore Security Rules.
- **Dado** que as regras do Firestore são atualizadas, **Quando** o Firebase Emulator roda os testes de segurança, **Então** todos os cenários de RBAC cruzados passam.

**Papéis RBAC definidos:**
| Role (Custom Claim) | Descrição |
|---|---|
| `superAdmin` | Acesso total + gerenciamento de tenants |
| `admin` | Gerenciamento da clínica, sem permissão de billing |
| `clinico` | Acesso a EHR, eMAR, pacientes |
| `tecnico` | Ordem de serviço, manutenção |
| `financeiro` | Módulo financeiro apenas |
| `rh` | Módulo de pessoas/RH |

---

### F01.3 — Autenticação B2B (Login + Onboarding de Super Admin)

> Como **novo cliente B2B**, quero criar a conta da minha clínica e ser o primeiro Super Admin para que minha equipe possa ser cadastrada.

**Critérios de Aceite:**
- **Dado** que acesso a URL raiz sem sessão, **Quando** a página carrega, **Então** sou redirecionado à tela de login B2B.
- **Dado** que sou um Super Admin, **Quando** crio minha conta com e-mail corporativo, **Então** o Custom Claim `superAdmin: true` é atribuído via Cloud Function.
- **Dado** que tento login com credenciais inválidas, **Quando** o Firebase Auth responde, **Então** uma mensagem de erro clara é exibida sem expor detalhes de segurança.

---

### F01.4 — Módulo de Pessoas / Colaboradores

> Como **RH/Administrativo**, quero visualizar e cadastrar colaboradores para que eles possam acessar o sistema com o papel correto.

**Critérios de Aceite:**
- **Dado** que acesso o módulo de Pessoas, **Quando** sou Admin ou SuperAdmin, **Então** vejo a tabela completa de colaboradores (nome, email, role, status).
- **Dado** que convido um novo colaborador, **Quando** preencho email e role, **Então** um link de convite é enviado por e-mail via Cloud Function.
- **Dado** que um colaborador aceita o convite, **Quando** cria sua senha, **Então** o Custom Claim correto é atribuído automaticamente.

---

## Fora do Escopo (Fase 1)

- Integração com SSO/SAML externo
- Autenticação via Google Sign-In (pode ser adicionada depois)
- Controle de ponto/escala (Fase 2+)
- Gestão financeira de colaboradores (Fase 4)

---

## Notas de Design

- Login page deve seguir design B2B limpo — sem marketing fluff
- Mobile-first para a página de login (acesso via celular do colaborador no primeiro dia)
- Formulário de convite deve usar Shadcn/UI com feedback visual imediato (Zod + React Hook Form)

---

## Restrições Técnicas

- RBAC **obrigatoriamente** via Custom Claims do Firebase Auth (não em Firestore)
- Operações de atribuição de role **apenas** via Cloud Functions (nunca client-side)
- `firestore.rules` deve ser atualizado para cada nova coleção com default-deny

---

## Riscos LGPD

- Dados de colaboradores são dados pessoais: nome, e-mail, CPF (se coletado)
- Minimização: coletar apenas o necessário na Fase 1
- Log de auditoria de atribuição de roles deve ser mantido em coleção própria (`auditLogs`)
