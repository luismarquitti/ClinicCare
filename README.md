# ClinicCare 🏥

ClinicCare é um CRM moderno voltado para a gestão de clínicas e residenciais (com foco no Residencial Novo Tempo). O sistema fornece módulos integrados para gestão de residentes, finanças, estoque, RH, manutenção e enfermagem, além de contar com suporte a prescrições eletrônicas.

## 🚀 Tecnologias e Stack

O projeto utiliza tecnologias modernas de front-end com foco em performance e qualidade:

- **Core:** React 19, TypeScript, Vite 6
- **Estilização:** Tailwind CSS 4, Lucide React (ícones), Motion (animações)
- **Gerenciamento de Estado:** Zustand
- **Roteamento:** React Router v7
- **Formulários e Validação:** React Hook Form + Zod
- **Backend/BaaS:** Firebase (Auth, Firestore, etc)
- **Qualidade e Testes:** Vitest, Testing Library, Playwright, Storybook
- **Utilitários:** date-fns, clsx, tailwind-merge, recharts

## 📦 Estrutura do Projeto

Abaixo uma visão geral da estrutura da pasta `src/`:

```
src/
├── components/   # Componentes reutilizáveis (UI)
├── lib/          # Utilitários e integrações externas (Firebase, etc)
├── pages/        # Páginas da aplicação (Dashboard, Residentes, Financeiro, etc)
├── services/     # Comunicação com APIs e regras de negócio
├── store/        # Gerenciamento de estado global (Zustand)
├── styles/       # Estilos globais adicionais
├── test/         # Configurações de testes e mocks
├── types/        # Definições de interfaces e tipos TypeScript
└── ...
```

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/luismarquitti/ClinicCare.git
   cd ClinicCare
   ```

2. **Instale as dependências:**
   ```bash
   yarn install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   yarn dev
   ```
   Acesse em `http://localhost:3000`

## 🧪 Comandos Úteis

- `yarn build`: Cria o build de produção
- `yarn preview`: Pré-visualiza o build localmente
- `yarn lint`: Verifica a tipagem do TypeScript
- `yarn test`: Roda os testes com Vitest
- `yarn storybook`: Inicia o ambiente de documentação do Storybook
- `yarn deploy`: Realiza o build e o deploy pelo Firebase

## 🗺️ Roadmap
Consulte nosso [ROADMAP.md](./ROADMAP.md) para visualizar as próximas implementações, módulos em desenvolvimento e melhorias técnicas planejadas.
