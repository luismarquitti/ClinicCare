# ClinicCare Roadmap

## Overview

ClinicCare is a comprehensive clinic management system built with React, Firebase, and TypeScript. It provides a modern, intuitive interface for managing patient information, appointments, and clinic operations.

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: Zustand
- **Routing**: React Router
- **UI Components**: Shadcn UI
- **Testing**: Vitest, React Testing Library

## Project Structure

A organização baseia-se em estrutura modular de negócios com isolamento para alta escalabilidade:

```
ClinicCare/
├── .agents/              # Regras, Workflows e Contextos padronizados para Agentes IA
├── Definições e.../      # [Essencial] Diretório Central de Planejamento e Especificações (PRD, Specs_UX_UI, System_Design, Roadmap gerencial)
├── src/
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── modules/          # Funcionalidades Isoladas de Negócio (ex: /PatientModule, /AuthModule)
│   ├── pages/            # Page components and views
│   ├── services/         # Firebase services
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── App.tsx           # Main application component
├── public/               # Static assets
├── firebase.json         # Firebase configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

```bash
# Install dependencies
npm install

# Login to Firebase
firebase login

# Set the active project
firebase use <project-id>
```

### Development

```bash
# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Firebase Configuration

### Authentication

- Email/Password authentication enabled
- Google Sign-In integration

### Firestore Database

- **Collections**:
  - `patients`: Patient records
  - `appointments`: Appointment scheduling
  - `clinics`: Clinic information
  - `users`: User accounts
  - `settings`: System settings

### Storage

- File storage for patient documents and images

## Key Features

### Patient Management

- Create, read, update, delete patient records
- Patient search and filtering
- Medical history tracking
- Contact information management

### Appointment Scheduling

- Calendar view
- Appointment booking
- Appointment reminders
- Appointment history

### User Management

- Role-based access control
- User authentication
- Profile management

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests with watch mode
npm test -- --watch
```

### Test Coverage

```bash
# Generate coverage report
npm run coverage
```

## Deployment

```bash
# Deploy to Firebase Hosting
npm run deploy
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## License

[MIT License](LICENSE)

## Contributing & Branching Strategy

A base fundamental adere aos princípios do Git Flow simplificados para manter a estabilidade da branch principal e previsibilidade de releases. O rastreio será integrado a _Boards de Gerenciamento Agile_, como o **GitHub Projects**.

1. **Board de Tarefas:** Crie as tarefas primeiramente no Board do GitHub Projects. Todo PR e Branch deve referenciar a Issue da tarefa vinculada.
2. Fork the repository (ou instancie no projeto principal)
3. Crie e baseeie a _Feature Branch_ sempre a partir de `main` (ou da ramificação de _release_).  
   Nomenclaturas padrão obrigatórias:
   - `feature/NameOfFeature`: Funcionalidades novas.
   - `fix/NameOfFix`: Correções a bugs não-críticos da sprint atual.
   - `hotfix/NameOfFix`: Correção de emergência impactando o _main_ funcional.
   - `docs/NameOfDocs`: Operações massivas em arquitetura e planejamento.
4. Commit your changes com _Semantic Commits_ (`git commit -m 'feat: add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request e aguarde Code Review conforme a Definition of Done (DoD).

## Support

For issues and questions, please open an issue on the GitHub repository.

---

## Firebase Project Setup

### 1. Criação e Setup do Projeto Firebase

O setup do projeto pode ser conduzido de diferentes maneiras, dependendo das ferramentas que você está utilizando.

#### Opção A: Utilizando o Firebase MCP Server (Recomendado para Agentes de IA)

Se você estiver operando através de um assistente de IA com o Firebase MCP Server habilitado:

1. Utilize a tool `firebase_create_project` informando o `project_id` desejado e um `display_name` (ex: "cliniccare-app").
2. Em seguida, registre a aplicação Web acionando a tool `firebase_create_app` com a plataforma `web`.
3. Para inicializar os serviços no repositório, use a tool `firebase_init` habilitando as features `auth`, `firestore`, `storage` e `hosting`.

#### Opção B: Utilizando a Firebase CLI (Desenvolvimento Tradicional)

1. Crie o projeto acessando o [Firebase Console](https://console.firebase.google.com/).
2. Adicione um App Web ao projeto para gerar os dados de configuração do SDK.
3. No terminal, na raiz do projeto, execute:

   ```bash
   firebase login
   firebase init
   ```

4. Durante o processo interativo do `init`:
   - Selecione **Firestore**, **Authentication**, **Storage** e **Hosting**.
   - Defina a pasta `.rules` e `.indexes` conforme sugerido (ou mantenha o padrão).
   - Indique o diretório `dist` como o diretório público do Hosting e configure como "Single Web App" (reescrevendo URLs para `/index.html`).

### 2. Autenticação e Perfis de Acesso (Roles)

Com base no domínio da aplicação, o sistema possui acesso baseado em perfis (Roles): `admin`, `saude`, `financeiro` e `manutencao`.

1. Acesse **Authentication -> Sign-in Method** e habilite **Email/Password**.
2. **Melhor Prática:** Atribua a função (role) de cada usuário através de **Firebase Custom Claims**. Isso permite checar o nível de autorização diretamente nas regras de segurança e no frontend sem custo extra de leitura ao banco de dados.

### 3. Estrutura do Banco de Dados (Firestore)

A aplicação foi estruturada usando as seguintes coleções, que devem ser consideradas ao criar regras ou migrar dados:

- `users`: Informações suplementares dos usuários e seus cargos.
- `residents`: Cadastro de pacientes/residentes do lar/clínica.
- `vitalSigns`: Sinais vitais registrados.
- `evolutionRecords`: Prontuários e evolução de enfermagem.
- `medications`: Medicamentos prescritos.
- `administrations`: Controle da administração dos medicamentos.
- `billingItems`: Lançamentos financeiros e faturamento.
- `maintenanceLogs`: Histórico e solicitações de manutenção.
- `notifications`: Alertas e comunicados direcionados por Role.

### 4. Regras de Segurança (Firestore Rules)

Crie o arquivo `firestore.rules` na raiz do projeto (ou cole no Console) aplicando as melhores práticas de RBAC (Role-Based Access Control):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Funções utilitárias assumindo o uso de Custom Claims
    function isAuthenticated() { return request.auth != null; }
    function getUserRole() { return request.auth.token.role; }
    function isAdmin() { return isAuthenticated() && getUserRole() == 'admin'; }
    function isSaude() { return isAuthenticated() && getUserRole() == 'saude'; }
    function isFinanceiro() { return isAuthenticated() && getUserRole() == 'financeiro'; }
    function isManutencao() { return isAuthenticated() && getUserRole() == 'manutencao'; }

    // Regras por coleção
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }
    
    match /residents/{document=**} {
      allow read: if isAuthenticated() && (isAdmin() || isSaude() || isFinanceiro());
      allow write: if isAdmin() || isSaude();
    }

    match /vitalSigns/{document=**} {
      allow read, write: if isAdmin() || isSaude();
    }
    
    match /evolutionRecords/{document=**} {
      allow read, write: if isAdmin() || isSaude();
    }

    match /medications/{document=**} {
      allow read, write: if isAdmin() || isSaude();
    }

    match /administrations/{document=**} {
      allow read, write: if isAdmin() || isSaude();
    }

    match /billingItems/{document=**} {
      allow read, write: if isAdmin() || isFinanceiro();
    }

    match /maintenanceLogs/{document=**} {
      allow read, write: if isAdmin() || isManutencao();
    }

    match /notifications/{document=**} {
      // Todos podem ler, sistemas criam.
      allow read: if isAuthenticated();
      allow write: if isAdmin() || isSaude() || isManutencao() || isFinanceiro();
    }
  }
}
```

### 5. Configuração do SDK Frontend

Para integrar o front-end ao Firebase, extraia as configurações do Firebase Console (Settings > General > Your Apps) e popule o arquivo `.env.local`:

```env
VITE_FIREBASE_API_KEY="AIzaSyYourApiKeyHere..."
VITE_FIREBASE_AUTH_DOMAIN="seu-projeto.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="seu-projeto"
VITE_FIREBASE_STORAGE_BUCKET="seu-projeto.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="1234567890"
VITE_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"
```

Crie o arquivo de inicialização do Firebase dentro do código fonte (recomendado: `src/services/firebase.ts`):

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// As chaves são carregadas nativamente pelo Vite usando import.meta.env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicialização da instância principal da aplicação Firebase
const app = initializeApp(firebaseConfig);

// Exportando os módulos independentes para consumo da aplicação
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```
