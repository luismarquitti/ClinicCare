# ADR-0002: Adoção de Feature-Sliced Design e Domain-Driven Design (Frontend)

## Status

Accepted

## Context

O projeto front-end atual agrupa todo o código dentro de pastas genéricas estruturais como `src/pages` e `src/components`. Embora útil no MVP, à medida que a plataforma cresce e novas lógicas de negócio (prontuários, faturamento, manutenção) são introduzidas, a falta de divisões claras gera um "monolito de front-end", misturando o contexto clínico com o administrativo em várias partes do código.

## Decision Drivers

* **Deve haver limites visíveis e técnicos** entre grandes módulos (Clinical, Financial).
* **Deve facilitar testes** isolando regras de negócio em `use-cases` e não em cliques de botão no React.
* **Deve manter a estrutura React/Vite**.

## Considered Options

### Option 1: Feature-Sliced Design (FSD) Simplificado

* **Pros**: Adereço claro a "Bounded Contexts" do DDD. Cada feature (ex: `clinical`) tem seus próprios componentes, repositórios, hooks e rotas, mantendo alta coesão e baixo acoplamento corporativo.
* **Cons**: Exige reestruturação do código base atual e adaptação da equipe ao padrão.

### Option 2: Manter Estrutura Flat Atual

* **Pros**: Zero trabalho de refatoração imediato.
* **Cons**: Custoso de manter a longo prazo, propenso a falhas onde uma área quebra o código da outra.

## Decision

Adotaremos **Feature-Sliced Design (Adaptado)** com diretórios em `src/features/` agrupados por contexto de Domínio (ex: `clinical`, `financial`, `maintenance`, `core`), seguindo os fundamentos de DDD e Clean Architecture para separação de responsabilidades.

## Consequences

### Positive

* Alta manutenibilidade, onboarding mais rápido em áreas específicas do projeto.

* Evita de misturar dependências entre módulos sensíveis (Módulo Financeiro não deveria chamar lógicas profundas de Prontuários independentemente).
* Promove Inversão de Controle e separação da infraestrutura Firebase das lógicas puras.

### Negative

* Refatoração substancial imediata ou gradual do diretório `src/`.

## References

* Clean Architecture (Robert C. Martin)

* Feature-Sliced Design Guidelines
