# Especificações de UX/UI e Design System - ClinicCare

## 1. Princípios de Design no Ambiente de Saúde

O design de software para a área da saúde requer uma abordagem rigorosa, priorizando clareza, velocidade de leitura e, acima de tudo, a **prevenção de erros**.

### DIRETRIZES VISUAIS CORE

- **Cores Calmas e Focadas:** Uso predominante de tons frios (azuis e verdes pasteis) e fundos limpos (off-white ou cinza claro). A interface deve transmitir limpeza e profissionalismo.
- **Status Claramente Definidos:**
  - 🚨 **Vermelho:** Alergias críticas, sinais vitais anormais extremos, medicação atrasada.
  - ⚠️ **Amarelo/Laranja:** Alertas de atenção, pendências, preventivas próximas ao vencimento.
  - ✅ **Verde:** Medicações checadas, sinais vitais estáveis, faturamento regularizado.
- **Tipografia Altamente Legível:** Fontes sem serifa (ex: Inter, Roboto), com forte hierarquia visual. Tamanho mínimo 16px para dados clínicos vitais.
- **Prevenção de Erros (Poka-Yoke):** Botões de ações destrutivas ou de alto impacto (ex: administrar medicamento de alto risco) devem requerer confirmação dupla modal ou swipe-to-confirm, dependendo do dispositivo.
- **Minimização de Carga Cognitiva:** A tela não deve conter informações que o usuário não precise naquele exato momento. Exibir dados dinamicamente (progressivity disclosure).

## 2. Onboarding Direto e Focado

Sendo uma ferramenta de impacto operacional interno, a página inicial do ClinicCare não será um "site de vendas", mas uma **Área de Acesso Colaborativo**.

- A página root `/` deve redirecionar o fluxo instantaneamente para `/login`.
- A tela de login deve ser amigável e funcional, possivelmente contendo um "Quadro de Avisos da Clínica" dinâmico na lateral ou um cardápio de ramais/atalhos caso o colaborador perca a senha.
- A experiência de primeiro acesso de um funcionário deve englobar um tour guiado de poucas etapas para o módulo correspondente à sua função.

## 3. Adaptabilidade (Responsividade Absoluta)

O ClinicCare é omnichannel para o colaborador. O layout deve utilizar CSS Grid / Flexbox adaptando-se do smartwatch ao monitor de 32".

### 3.1. Visão Recepção / Backoffice (Desktop Focus)

- **Equipamentos:** Monitores wide usuais ou notebooks da gerência/financeiro.
- **Comportamento UI:** Navegação por Sidebar lateral sempre visível. Telas com uso extenso de tabelas de alta densidade de dados (DataGrids), filtros multinível, painéis de dashboards (gráficos) amplos, possibilidade de modais que não sobrepõem excessivamente a tela. Modos de atalho via teclado para preenchimento de faturamento.

### 3.2. Ponto de Cuidado / Beira de Leito (Mobile First Focus)

- **Equipamentos:** Tablets e Smartphones fornecidos pela clínica.
- **Comportamento UI:** Ações de preenchimento ágeis.
- Um(a) enfermeiro(a) registrando a Checagem de Medicamentos (eMAR) não utilizará mouse. Os botões de checado (✅) devem ter _touch targets_ grandes (mínimo de 44x44px conforme diretrizes da Apple/Google).
- O leitor de código de barras pela câmera do smartphone deve ser em tela cheia overlayed.
- Menus em "Bottom Navigation" (barras inferiores) no lugar de sidebars visando usabilidade com apenas uma mão.
- Suporte a scroll infinito ou paginação via botões (como "Ver próximos 10 pacientes") ao invés de paginação complexa.

## 4. Protótipos Funcionais Específicos

- **Fluxo eMAR (Beira de Leito - Mobile):**
  1. Login via FaceID ou Pin rápido.
  2. Seleção do Leito/Quarto.
  3. Lista de medicamentos do horário ordenado por prioridade.
  4. Escaneamento de pulseira (opcional).
  5. Swipe "Deslize para Confirmar Administração".
  6. Tela visual confirmando sucesso em verde + timer até a próxima aprazagem.

- **Fluxo Recepcionista/Faturamento (Recepção - Desktop):**
  1. Dashboard de contas a receber do mês com gráfico de barras.
  2. Lista de faturas em grid com opção de exportação PDF.
  3. Modal de baixa de lote rápido após compensação bancária.

## 5. Acessibilidade (A11y) e Stack de Componentes Web

Sendo um projeto B2B com uso prolongado diário por colaboradores, a fadiga visual e a acessibilidade digital são críticas:

### Diretrizes de Acessibilidade

- **Contraste Rígido:** Todas as cores semânticas (vermelho de alertas, verde de ok) necessitam passar no teste de contraste WCAG AA mínimo (razão de contraste de 4.5:1).
- **Suporte Dinâmico a Leitores de Tela:** Formulários e Listagens de Pacientes (EHR) portarão `aria-labels` em atributos para navegações assistivas utilizando VoiceOver / TalkBack durante pontos de cuidado móveis.
- **Navegação de Foco:** Usuários de recepção (Desktop) devem obter feedback total (ex: anéis outline azuis intensos) para navegar pelo painel usando estritamente atalhos da tabela via `Tab`.

### Stack Recomendada (React UI)

Para acelerar o desenvolvimento limitando a fragmentação do design no código:

- **Componentização Headless:** Uso de primitivas não estilizadas e blindadas quanto à Acessibilidade, especificamente o **Radix UI** primitives. Pode ser pareado em harmonia com **TailwindCSS**.
- **Data Tables Complexas:** Emprego da biblioteca headless **TanStack Table** para instanciar as listagens do Backoffice/Faturamento com virtualização nativa, assegurando fluidez ao renderizar centenas de contas/pacientes.
