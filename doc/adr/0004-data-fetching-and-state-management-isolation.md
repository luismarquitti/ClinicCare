# ADR-0004: Isolamento de Data Fetching e Limitação de Global Listeners

## Status

Accepted (Suplementa e parcialmente sobrepõe decisão do ADR-0001)

## Context

A decisão `ADR-0001` instituiu o gerenciamento do estado na aplicação inteira combinando o `Zustand` e os listeners nativos do Firebase Firestore (`onSnapshot`). Atualmente, no arquivo root do aplicativo, o app inteiro se inscreve e baixa toda as coleções (`residents`, `vitalSigns`, `medications`, `financial_items` etc).

Para um volume de dados inicial e Mock, este design funciona, porém conforme dados explodirem na produção com centenas de faturas, evoluções de textos massivos e ordens de serviços, esta técnica causará O(N) database reads incontroláveis, faturando milhares de reads desnecessários no Firestore no primeiro load, além de *Memory Leaks* perigosos e problemas severos de indexação nos clientes.

## Decision Drivers

* **Custos do Firebase Firestore** baseados primariamente em Reads Documentais.
* **Escala e Performance** da interface com o usuário e uso de Memória do navegador HTTP do cliente.
* Melhor isolamento de Cache e refetching sob demanda.

## Considered Options

### Option 1: Data Fetching Localizado ou via React Query

- **Pros**: Carregar dados *on-demand*. Cada página possui seu próprio "Listener" do firebase local ao seu ciclo de vida (Unmount fecha o socket), combinando ou não com paginação. Emprego de bibliotecas especializadas do tipo TanStack Query ou SWR se formos utilizar queries estáticas únicas, economizando absurdamente infraestrutura de rede, tempo e processamento de custos.
* **Cons**: Introduz o estado assíncrono a cada visão e tela de Loadings na transição de telas.

### Option 2: Manter Global Listeners (Atual)

- **Pros**: Uma vez baixados, o frontend torna-se perfeitamente reativo e offline-first de maneira agressiva.
* **Cons**: Escalabilidade inviável e alto custo.

## Decision

Manter o `Zustand` de forma estrita para manter o estado de **UI do Cliente** (Temas, Menus Globais ativados, Alertas), **Autenticação**, e remover a vinculação maciça e global de todos os documentos do Firestore do bootstrapping do app. O acesso das bases de dados (Server-State) passará a ser isolado em repositórios/hooks locais instanciando e desligando websockets (onSnapshot) localmente perante necessidade (tela do cliente viva com *limits* paginados) ou empregando requisições assíncronas isoladas estilo TanStack Query.

## Consequences

### Positive

- Enorme economia nos gastos do Firebase Firestore e banda.
* Melhor controle de "Race conditions" nos loads.
* Inicialização drásticamente mais rápida da Single Page Application (SPA).

### Negative

- Necessidade de refazer partes da manipulação de listas locais para cada página do painel, lidando com loaders individuais isoladamente.
