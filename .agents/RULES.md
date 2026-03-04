# Regras de Desenvolvimento e Arquitetura (RULES)

Estas regras são imperativas. Todo código gerado por IA ou desenvolvedor para o projeto ClinicCare deve estar em conformidade.

## 1. Regras de Código (Frontend)

- **Linguagem Oficial:** TypeScript. Uso rigoroso de tipagem (Evitar `any`).
- **Nomenclatura:** Variáveis/Funções em `camelCase`. Componentes React e Arquivos de Componentes em `PascalCase.tsx`. Hooks começam com `use`.
- **Arquitetura Modular:** Separação lógica por domínio (Domain-Driven). O código deve ser modular.
  - Componentes genéricos ficam em `src/components/`.
  - Páginas/Funcionalidades de domínio ficam em `src/pages/` ou módulos específicos.
- **Estilização:** TailwindCSS é o padrão. Para componentes customizados, utilizar bibliotecas _headless_ (ex: Radix via shadcn/ui) e variáveis CSS (Design Tokens) definidos previamente para o Material Design 3. Não chumbhar (hardcode) cores diretas no HTML (ex: evitar `text-[#ff0000]`).
- **Gerenciamento de Estado:** Zustand para estado global local. Não usar Redux.

## 2. Regras de Backend e Firebase

- **Firestore (NoSQL):** O esquema prioriza a leitura. Documentos aninhados (sub-coleções) devem ser usados para dados incrementais do paciente (ex: sinais vitais, prontuários).
- **Security Rules:** Todo novo acesso ao Firestore exige atualização nas `firestore.rules`. O sistema utiliza RBAC (Role-Based Access Control) via _Custom Claims_. Padrão _Default Deny_ deve prevalecer.
- **Cloud Functions:** Processamentos que exigem segurança (transações financeiras, envios de email) ou agregação massiva não devem ocorrer no client-side; use Functions.

## 3. Versionamento (Branches e Commits)

- Estrutura baseada no **Git Flow** ou **GitHub Flow**:
  - `main`: Ambiente de Produção.
  - `feature/*`: Novas funcionalidades.
  - `hotfix/*`: Correções urgentes em produção.
- Padrão de Commits: Semantic Commits (ex: `feat: add patient dashboard`, `fix: correct login crash`, `docs: update roadmap`).

## 4. Requisitos de Pull Request (DoD - Definition of Done)

Para a fusão em `main`, a funcionalidade deve:

1. Funcionar sem erros no console.
2. Ser Responsiva (Mobile-first para beira-leito, Desktop para recepção).
3. Atualizar as Regras de Segurança do DB se manipular novas coleções.
4. Possuir testes (caso do escopo crítico) passando (Jest/Vitest).
