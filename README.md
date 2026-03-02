<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ClinicCare - Sistema de Gestão de Clínicas e Lares de Idosos

ClinicCare é um sistema compreensivo de gerenciamento clínico construído com React, Firebase e TypeScript. Ele fornece uma interface moderna e intuitiva para gerenciar informações de pacientes, agendamentos, finanças, manutenção e registros de saúde.

---

## 🚀 Tecnologias Essenciais

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (v4)
- **Backend/BaaS**: Firebase (Authentication, Firestore, Storage, Hosting)
- **Gerenciamento de Estado**: Zustand
- **Roteamento**: React Router v7
- **UI Components**: Shadcn UI, Lucide React, Recharts, Framer Motion

---

## 🛠️ Começando Localmente

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta ativa no [Firebase](https://console.firebase.google.com/)

### Instalação

1. **Clone e Instale:**

   ```bash
   git clone <seu-repo>
   cd ClinicCare
   npm install
   ```

2. **Configuração de Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto contendo as chaves do SDK do Firebase do seu projeto (e a chave do Gemini, se utilizar os recursos de AI incluídos):

   ```env
   GEMINI_API_KEY="Sua_Chave_Gemini_Aqui"

   VITE_FIREBASE_API_KEY="AIzaSySuaApiKey..."
   VITE_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="seu-projeto"
   VITE_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="SENDER_ID"
   VITE_FIREBASE_APP_ID="APP_ID"
   ```

3. **Executando o App de Desenvolvimento:**

   ```bash
   npm run dev
   ```

   Acesse a aplicação operando localmente na porta de saída (geralmente [http://localhost:3000](http://localhost:3000)).

---

## 🔥 Configuração e Uso do Firebase

Este projeto foi projetado para atuar 100% serverless através do Google Firebase. Siga esses passos para configurar seu backend.

### 1. Inicializando Projetos Nuevos

Se você não possui um projeto criado ainda, instale a Firebase CLI e siga o processo de login:

```bash
npm install -g firebase-tools
firebase login
```

Para inicializar de zero a pasta e conectar ao Firebase, execute:

```bash
firebase init
```

- Selecione **Firestore**, **Authentication**, **Storage** e **Hosting**.
- Selecione seu projeto existente ou crie um novo.
- Para o **Hosting**, escolha o diretório `dist` como public root e responda **Yes** para Single Page App (spa).

### 2. Autenticação e Usuários (Roles)

O aplicativo possui as seguintes "Roles" (cargos) operacionais, definidas em Custom Claims pelo Auth ou mantidas na coleção `users`:

- `admin`: Permissão total
- `saude`: Acesso e edição nos residentes, medicamentos, prontuários.
- `financeiro`: Acesso e edição em faturamentos e residentes (leitura).
- `manutencao`: Acesso para visualizar e editar chamados/tickets.

No Painel Web do Firebase, em **Authentication -> Sign-in method**, ative as opções **Email/Password** e (Opcional) **Google**.
> **Nota:** Por definição deste projeto, todos os novos usuários criados pela plataforma recebem o acesso/claim `admin` inicialmente, para setup flexível. O administrador master deve rebaixar cargos nas ferramentas internas quando novos funcionários acessarem.

### 3. Setup de Banco de Dados (Firestore) e Regras

O schema central funciona nessas collections:

- `users`, `residents`, `vitalSigns`, `evolutionRecords`, `medications`, `administrations`, `billingItems`, `maintenanceLogs` e `notifications`.

As regras de segurança rigorosas (RBAC) definidas para estas coleções ficam armazenadas no arquivo local `firestore.rules`.
Para mandá-las ou atualizá-las no servidor:

```bash
firebase deploy --only firestore:rules
```

---

## 📦 Scripts de Desenvolvimento (NPM)

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor local com o Vite na porta 3000 gerando HMR.|
| `npm run build` | Faz um build otimizado da aplicação na pasta `dist` rodando tsc antes.|
| `npm run preview` | Pré-visualiza localmente a build feita pela pasta `dist`. |
| `npm run clean` | Exclui a pasta `dist` atual para limpezas operacionais. |
| `npm run lint` | Validador do Typescript para garantir Types de variáveis definidos.|

---

## 🚀 Deploy para Produção (Firebase Hosting)

Garantir que os arquivos estáticos de produção não causem erro no TypeScript é o primeiro passo:

```bash
npm run build
```

Uma vez com o diretório `dist` gerado com sucesso, efetue o deploy do Frontend (e regras do back-end se atualizadas) para seu app no Firebase com:

```bash
firebase deploy
```

Esse comando irá subir a aplicação e exibir no seu terminal as **Hosting URLs** finais de hospedagem do ClinicCare!

---

## 📋 Arquitetura Adicional

**Módulos Firebase Independentes:** Note que a configuração principal ocorre em `src/services/firebase.ts`, exportando os objetos `auth`, `db` (Firestore), `storage` individualizados para o React carregar de forma mais limpa ao redor do App. Em caso de atualizações de chaves, os imports nativos por `import.meta.env` devem atualizar os instanciamentos em todo o local simultaneamente.

## 📝 Suporte

Qualquer erro ou solicitação, por favor utilize os canais Issue dentro da plataforma de origem.
