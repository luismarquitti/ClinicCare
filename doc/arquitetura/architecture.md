# Arquitetura e Fluxo da Aplicação

O ClinicCare adota uma arquitetura baseada em **SPA (Single Page Application)** com o Frontend diretamente integrado a recursos Serverless do **Firebase**.

## Diagrama de Referência Geral

```mermaid
graph TD
    Client[Navegador do Usuário / PWA]
    
    subgraph Frontend - React/Vite
        Router[React Router DOM]
        Store[Zustand Store]
        Components[UI Components / Pages]
    end
    
    subgraph Backend - Firebase Serverless
        Auth[Firebase Authentication]
        Firestore[(Cloud Firestore - NoSQL)]
        Rules[Security Rules]
    end

    Client <--> Router
    Router <--> Components
    Components <--> Store
    Store <--> Auth
    Store <--> Firestore
    Firestore -.-> Rules
```

## Separação de Módulos (Pages)

O sistema é segmentado fortemente por perfis de acesso, que determinam o que cada usuário enxerga e opera:

- **`admin`**: Acesso completo.
- **`saude`**: Acesso aos módulos `Residents`, `Nursing` e `EPrescription`.
- **`financeiro`**: Acesso aos módulos `Financial` e `Inventory`.
- **`manutencao`**: Acesso aos módulos `Maintenance` e `Inventory`.
- **`rh`**: Acesso ao módulo `HR`.

### Fluxo de Casos de Uso (Role-based)

```mermaid
flowchart TD
    Admin([Admin])
    Saude([Saúde])
    Financeiro([Financeiro])
    Manutencao([Manutenção])
    RH([RH])

    UC_Dash((Acessar Dashboard))
    UC_Res((Gerir Residentes))
    UC_Nurs((Gerir Enfermagem/Evolução))
    UC_Fin((Monitorar Receitas/Despesas))
    UC_Inv((Controlar Estoque e Compras))
    UC_Mnt((Gerir Ativos e Ordens))
    UC_RH((Gerir Colaboradores/Folha))

    Admin --> UC_Dash
    Saude --> UC_Dash
    Financeiro --> UC_Dash
    Manutencao --> UC_Dash
    RH --> UC_Dash

    Admin --> UC_Res
    Saude --> UC_Res

    Admin --> UC_Nurs
    Saude --> UC_Nurs

    Admin --> UC_Fin
    Financeiro --> UC_Fin

    Admin --> UC_Inv
    Financeiro --> UC_Inv
    Manutencao --> UC_Inv

    Admin --> UC_Mnt
    Manutencao --> UC_Mnt

    Admin --> UC_RH
    RH --> UC_RH
```

## Fluxo de Estado Global (Zustand)

A aplicação faz intenso uso do `Zustand` para refletir os dados em tempo real a partir de `onSnapshot` (Firebase Firestore). Isso garante que mudanças feitas por qualquer usuário propaguem instantaneamente para telas ativas:

1. `App.tsx` invoca a action `initializeListeners` do Zustand.
2. O Zustand abre *websockets* (`onSnapshot`) com todas as principais coleções permitidas para o usuário logado (baseado no Role/Rules).
3. Atualizações alimentam automaticamente as listas globais na memória (e.g. `state.residents`, `state.medications`).
4. Quando o usuário clica em "Salvar" na interface, o Zustand invoca a gravação (`addDoc` / `updateDoc`), o Firestore confirma a transação e o listener reativa o ciclo notificando todos os clientes.
