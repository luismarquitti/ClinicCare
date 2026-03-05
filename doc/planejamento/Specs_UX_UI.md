# Especificações de UX/UI e Design System - ClinicCare

## 1. Princípios de Design no Ambiente de Saúde (Material Design 3)

O design de software para a área da saúde requer uma abordagem rigorosa. O ClinicCare adota as diretrizes do **Material Design 3 (MD3)**, priorizando clareza, velocidade de leitura e a **prevenção de erros**. O sistema utiliza a linguagem visual focada em usabilidade, contraste e legibilidade.

### DIRETRIZES VISUAIS CORE

- **Cores Calmas e Focadas:** Uso da paleta tonal do MD3. Predominância de tons frios (azuis e verdes pasteis) nas superfícies e fundos (off-white ou cinza claro), transmitindo limpeza e evitando fadiga visual.
- **Status Claramente Definidos (Semantic Colors):**
  - 🚨 **Error (Vermelho):** Alergias críticas, sinais vitais anormais extremos, medicação atrasada.
  - ⚠️ **Warning (Amarelo/Laranja):** Alertas de atenção, pendências, preventivas próximas ao vencimento.
  - ✅ **Success (Verde):** Medicações checadas, sinais vitais estáveis, faturamento regularizado.
- **Tipografia Altamente Legível:** Fontes sem serifa (ex: Inter, Roboto) padronizadas em estilos MD3 (Display, Headline, Title, Body, Label). Tamanho mínimo de 16px para dados clínicos vitais.
- **Prevenção de Erros (Poka-Yoke):** Botões de ações destrutivas ou de alto impacto (ex: administrar medicamento de alto risco) devem requerer confirmação dupla modal ou swipe-to-confirm, dependendo do dispositivo.
- **Minimização de Carga Cognitiva:** A tela exibe os dados dinamicamente (progressive disclosure). Uso do componente "Card" do MD3 para agrupar informações relacionadas de forma clara.

## 2. Design System: Definição de Tokens (MD3)

Para garantir consistência e facilitar o desenvolvimento, adotamos um sistema de **Design Tokens** baseado no Material Design 3. Estes tokens devem ser mapeados em variáveis CSS absolutas no tema do Tailwind.

### 2.1. Color Tokens (Paleta Base)

- **Primary:** Acende ações primárias (ex: Salvar Prontuário).
- **On Primary:** Cor do texto sobre botões primários (geralmente branco para contraste).
- **Primary Container:** Fundo pastel para destacar seções ativas no painel.
- **On Primary Container:** Texto escuro sobre o fundo destacado.
- **Secondary:** Ações de menor peso ou secundárias no fluxo (ex: Botões Cancelar/Voltar).
- **Surface:** Fundo principal da aplicação (off-white).
- **Surface Container:** Fundo de agrupamentos lógicos como modais, cards e painéis laterais.
- **Error:** Vermelho intenso para estados de erro de formulário e alertas clínicos reais.
- **Success:** Verde padrão para confirmação (ex: eMAR checado com sucesso).

### 2.2. Typography Tokens

- **Display:** Para métricas chave em dashboards financeiros e operacionais.
- **Headline / Title:** Para títulos de páginas, modais e títulos em listagens de pacientes.
- **Body:** Para os textos longos de prontuários (evolutivos), preenchimento de formulários e valores em tabelas (DataGrids).
- **Label:** Para legendas, badges sobre os ícones e navegação (sidebars/bottom navigation).

### 2.3. Spacing, Shape e Elevation Tokens

- **Spacing:** Baseado em uma grid de 4px/8px (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px).
- **Shape (Bordas arredondadas):** Tokens de corner-radius para cards (ex: 12px), modais (ex: 16px) e pílulas (ex: 9999px).
- **Elevation:** Uso mínimo de drop-shadows padrão MD3 para focar e diferenciar o conteúdo ativo acima do layout base (modais com elevação forte, cards com elevação sutil).

## 3. Arquitetura de Estilos Dedicada

A aplicação estrita dos estilos garante fácil manutenção. Para evitar poluição do JSX e estilos espalhados diretamente nos componentes estruturais, propomos a seguinte arquitetura:

1. **Uso de Class Variance Authority (CVA):** Usaremos o pacote `cva` acoplado ao `tailwind-merge` para criar variações semânticas de cada componente UI base.
2. **Separação de Preocupações (Arquivos Dedicados):** Componentes mais complexos terão seus estilos extraídos para um arquivo `*.styles.ts` ou utilizando um dicionário de estilos encapsulado logo acima da renderização. Exemplo: um `<Button />` receberá parâmetros como `variant="primary"` ou `size="medium"`, e internamente o CVA fará a resolução do Tailwind gerando a className final correspondente.
3. **Uso Exclusivo de Design Tokens:** É proibido utilizar valores fixos ou hardcoded de Tailwind nos componentes de negócio (ex: não usar text-[#332211]). Tudo deve referenciar a paleta do MD3 incluída no `tailwind.config`.
4. **Base Semântica Radix UI:** Componentes de interatividade (Modais, Tooltips, Accordions) devem possuir a base acessível e _headless_ do "Radix UI", combinada apenas com as classes estilizadas geradas pelo CVA, desacoplando acessibilidade da identidade visual.

## 4. Onboarding Direto e Focado

Sendo uma ferramenta de impacto operacional interno, a página inicial do ClinicCare prioriza o **Acesso Colaborativo Rápido**.

- A página root (`/`) deve redirecionar o fluxo instantaneamente para `/login`.
- A tela de login deve ser amigável, possivelmente contendo um "Quadro de Avisos da Clínica" dinâmico na lateral ou instruções para recuperação de acessos e ramais da TI.
- A experiência de primeiro acesso inclui um tour guiado rápido direcionando o colaborador exclusivamente ao módulo correspondente à sua função.

## 5. Especificações de Telas e Protótipos

### 5.1. Tela de Login e Acesso Público

- **Layout (Split Screen Desktop / Full Mobile):** Coluna principal com formulário de login centralizado, logo acima. Coluna auxiliar com um painel com a cor "Primary Container".
- **Elementos MD3:** Text Fields (Filled) amplos para usuário (CPF/Email) e senha; "Filled Button" para Log IN.

### 5.2. Dashboard Recepcionista e Faturamento (Recepção - Focus Desktop)

- **Layout:** Sidebar lateral esquerda expansível. Header global para busca de pacientes por nome/cpf.
- **Elementos MD3:** Cards interativos contendo métricas (Contas a Pagar/Receber). DataGrid denso utilizando **TanStack Table** (com botões "Outlined" nas ações de Baixa Rápida de Lotes de Faturas ou Exportar). Modais vastos ("Dialog" MD3) abrindo para edição de faturamento sem sair do contexto.

### 5.3. Prontuário Eletrônico EHR (Híbrido - Desktop e Tablet)

- **Layout:** Master-Detail view. Lista ou busca avançada de pacientes à esquerda (ou ocultada no mobile) e painel detalhado de Prontuário à direita preenchendo o Surface principal.
- **Elementos MD3:** "Tabs" superiores para transição veloz entre: Evolução, Pedidos de Exame, Diagnósticos. Componentes de formulário otimizados para digitação rápida ("Filled TextFields" e Textareas longos). "Chips" MD3 para listar Diagnósticos e Alergias.

### 5.4. Fluxo eMAR e Checagem à Beira do Leito (Focus Mobile First)

- **Layout:** "Bottom Navigation" (barra inferior) garantindo a usabilidade com apenas uma mão. Conteúdo scrollável com o foco do dia. Fundo limpo ("Surface").
- **Elementos MD3:** "Elevated Cards" na timeline de medicações do dia do paciente. Identificador visual colorido (Error, Warning, Success) da hora certa da dose.
- **Experiência e Interatividade:** Leitor central de QRCode fullscreen. Ação de "Assinar Checagem" utiliza um componente _Swipe-to-Confirm_ tático projetado para mitigar cliques acidentais. Após a checagem, um "Snackbar" MD3 exibe confirmação em tela. Empregamos touch targets muito largos (mín. 48x48px).

### 5.5. Gestão Operacional e Manutenção Predial

- **Layout:** Board no estilo Kanban (para Desktop) e lista expansível com swipe actions (para Mobile).
- **Elementos MD3:** Sistema de "Draggable Cards", identificando cores baseadas na urgência das Ordens de Serviço. Componente FAB ("Floating Action Button") posicionado à direita inferior no celular/tablet para os técnicos criarem o chamado instantaneamente tirando e anexando uma foto da evidência no Storage.

### 5.6. Assistente de Inteligência Artificial (Chatbot)

- **UX/UI In-App:** Acesso via um "Floating Action Button" (FAB) global com ícone de IA, abrindo um modal do tipo "Bottom Sheet" (Mobile) ou "Side Panel" (Desktop).
- **Interação Conversacional:** Formato de chat tradicional (balões de mensagem). O sistema sempre deve devolver um "Card de Confirmação" (com botões de "Confirmar" ou "Editar") antes de alterar dados reais no banco.
- **Integração Externa (WhatsApp):** A experiência via WhatsApp Business não possui UI própria, baseando-se em respostas textuais objetivas e botões interativos nativos do WhatsApp para confirmação das ações estruturadas.

## 6. Acessibilidade Absoluta e Conclusões Técnicas

- **Contraste Rígido:** Todas as cores semânticas mapeadas nos tokens MD3 acima necessitam passar rotineiramente no teste de contraste WCAG AA mínimo (razão 4.5:1).
- **Suporte Dinâmico a Leitores de Tela:** As Listagens (TanStack Table) e os Formulários complexos portarão ativamente `aria-labels` indicando navegações e preenchimentos requeridos de acessibilidade, muito vitais no uso via VoiceOver / TalkBack durante pontos de cuidado móveis apressados.
- **Navegação de Foco:** Recepcionistas utilizam navegação rápida via teclado; o sistema incluirá fortes `focus-visible` outline rings no padrão MD3 nas ações mapeadas, eliminando o cursor perdido de mouse no DOM.
