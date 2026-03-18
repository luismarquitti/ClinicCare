---
title: "Workflow de Desenvolvimento e Firebase"
---
# Workflow de Desenvolvimento e Firebase

Este documento detalha o roteiro de configuração local, emulação, ciclo de vida do desenvolvimento no Git e Deploy contínuo no Firebase para o projeto **ClinicCare**.

## Setup Local Requerido

1. Node.js (V20+ recomendado).
2. Repositório Clonado e dependências instaladas via `npm install`.
3. Firebase CLI devidamente instalado: `npm install -g firebase-tools`.

## Desenvolvimento Local & Testes

Para realizar desenvolvimento e testes isolados, utilizamos a suíte **Firebase Emulators** (quando configurada) juntamente ao dev server local do **Vite**.

1. **Rodar o Servidor Frontend**:

   ```bash
   npm run dev
   ```

   *Acesse `http://localhost:3000`*.

2. **Rodar o Firestore / Auth Emulators (Se inicializado)**:

   ```bash
   firebase emulators:start
   ```

   *Isso impede a inserção de "lixo de testes" no ambiente de Produção. Certifique-se de configurar em `firebase.ts` o `connectFirestoreEmulator` durante homologações rigorosas.*

## Estratégia de Branches e Git Flow Simplificado

Para controlar qual versão será publicada no Firebase, seguimos uma estrutura simplificada de branchs baseada no Trunk-Based Development ou Git Flow mínimo adaptado.

- **`main`**: Representa nosso código de **Produção**. Nunca desenvolvedores fazem commit diretamente aqui.
- **`develop` / `homologacao`**: Ambiente de testes integrados. QA ou validação antes de ir para main.
- **`feature/*` ou `bugfix/*`**: Branchs criadas individualmente pelos devs para realizar uma tarefa (Ex: `feature/HR-module`).

### Como trabalhar numa Task (Daily-Basis)

```bash
# 1. Tenha a versão atualizada e crie a branch de feature
git checkout main
git pull
git checkout -b feature/nome-da-minha-feature

# 2. Escreva código e realize commits
git add .
git commit -m "feat: adiciona componente X para funcionalidade Y"

# 3. Abra um Pull Request (PR) -> `main`
```

*(Scrum Masters/Tech Leads deverão avaliar e "Mergear" o Pull Request na branch principal).*

## Deploy para o Firebase

Temos scripts automatizados no arquivo `package.json`, especificamente configurados para compilar os *assets* de React através do Vite, e publicá-los via Firebase CLI.

Para realizar deploy em produção (após ter a branch `main` limpa e aprovada):

```bash
# Garanta que está autenticado
firebase login

# Roda o script de deploy completo do package.json (Build + Firebase Deploy)
npm run deploy
```

O comando `npm run deploy` executará sequencialmente:

1. `vite build` (Cria a pasta `/dist` minificada e otimizada).
2. `firebase deploy --only hosting` (Envia os arquivos estáticos para o Hosting de Produção).

*Em caso do uso de GitHub Actions / CI-CD, essas chaves residirão numa variável secreta `$FIREBASE_TOKEN` e farão deploy automaticamente sempre que a `main` receber Merge.*
