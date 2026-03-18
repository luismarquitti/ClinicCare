---
title: "Feature: MVP Inicial (Administração e Residentes)"
---
# Feature: MVP Inicial (Administração e Residentes)

**Épico:** MVP Inicial (06)
**Status:** Draft
**Criado:** 2026-03-18
**Atualizado:** 2026-03-18

## Visão

Entrega focada em demonstrar o valor inicial e fluxo core da plataforma para os Administradores e Proprietários da Clínica, englobando: uma Landing Page para entrada B2B, um Login persistente (otimizado para testes locais), um Dashboard Financeiro completamente funcional e um Sistema de Gerenciamento de Residentes funcional acessível através de uma App Bar global. O objetivo é permitir interação imediata com o produto para colher feedback e guiar o desenvolvimento da próxima versão.

## Personas Impactadas

- **Administrador Geral da Clínica:** Conseguirá gerenciar residentes e obter uma visão clara do status da clínica e navegação global.
- **Proprietários:** Conseguirão visualizar a saúde financeira da operação clínica no Dashboard e iterar na validação inicial do sistema.

## User Story

> Como **Administrador/Proprietário**, quero **acessar a plataforma pela Landing Page e fazer Login**, visualizar minha **App Bar global com navegação**, entrar no meu **Dashboard Financeiro** e usar o **Sistema de Residentes** para **validar o funcionamento principal da plataforma e fornecer feedback de usabilidade para a próxima versão**.

## Critérios de Aceite (BDD)

**Cenário 1: Landing Page e Login Persistente**
- **Dado** que o administrador acesse a URL da aplicação
- **Quando** ele visualizar a Landing Page e prosseguir para o Login
- **Então** o sistema deve realizar a autenticação e reter a sessão de forma persistente (especialmente em ambientes de teste local), redirecionando para a área logada (Dashboard).

**Cenário 2: App Bar e Segurança (RBAC)**
- **Dado** que um usuário autenticado com perfil `admin` está logado
- **Quando** ele visualiza a aplicação
- **Então** uma App Bar funcional deve estar visível com links diretos para o "Gerenciamento de Residentes" e o "Dashboard Financeiro".

**Cenário 3: Dashboard Financeiro Completamente Funcional**
- **Dado** que o usuário acessou o Dashboard Financeiro
- **Quando** os dados carregarem do Firestore
- **Então** os KPIs principais (receitas, despesas, balanço) e tabelas informativas refletirão dados reais (ou mockados consistentes no DB), estando 100% operacionais para o fluxo básico.

**Cenário 4: Sistema de Residentes Completamente Funcional**
- **Dado** o acesso ao Gerenciamento de Residentes via App Bar
- **Quando** o administrador listar, adicionar ou detalhar um residente
- **Então** todas as operações (listagem e inserção) devem ser efetivadas com sucesso via Firebase baseadas nas permissões garantidas via `firestore.rules`.

## Fora do Escopo

- App mobile nativo para o MVP.
- Aprofundamento no prontuário de saúde hiper-complexo (ex: Evolução e eMAR) — o foco atual na visão clínica do residente fica restrito ao fluxo de cadastro primário e visualização de lista.
- Automações financeiras avançadas e integrações bancárias diretas.

## Notas de Design

- O desenvolvimento usará o `Shadcn/UI` (`radix-ui`) e Tailwind CSS conforme a documentação existente.
- A navegação global deve ser responsiva e clara na área logada.
- O Dashboard Financeiro deve expor os dados de forma legível, preferencialmente utilizando os gráficos definidos no design system existente.

## Restrições Técnicas

- **RBAC**: Permissões necessárias (`role: 'admin'`) configuradas nos Custom Claims / User Collection.
- **Persistência**: Parametrizar explicitamente que a sessão de Auth use persistência local no cliente (`browserLocalPersistence`) da web v9/v10 do Firebase.
- Firebase Emulator será primordial para testes locais na Landing e na persistência desta etapa.

## Riscos LGPD

- Evitar que informações brutas de saúde e dados financeiros fiquem cacheadas excessivamente em devices abertos.
- Garantir que apenas quem tiver permissão atestada no `firestore.rules` consiga ler essas coleções do MVP.
