# NLW Agents

Este é o projeto **NLW Agents**, desenvolvido durante o evento NLW da [Rocketseat](https://rocketseat.com.br/). Trata-se de uma aplicação web React com gerenciamento de salas, utilizando diversas bibliotecas modernas do ecossistema JavaScript/TypeScript.

## Tecnologias e Bibliotecas Utilizadas

- **React 19**: Biblioteca principal para construção da interface.
- **React Router DOM 7**: Gerenciamento de rotas SPA.
- **@tanstack/react-query**: Gerenciamento e cache de dados assíncronos.
- **Tailwind CSS 4**: Utilitário para estilização rápida e responsiva.
- **tw-animate-css**: Animações utilitárias para Tailwind.
- **class-variance-authority** e **clsx**: Utilitários para composição dinâmica de classes CSS.
- **tailwind-merge**: Mescla inteligente de classes Tailwind.
- **lucide-react**: Ícones SVG modernos.
- **@radix-ui/react-slot**: Composição avançada de componentes.
- **Vite**: Bundler e servidor de desenvolvimento rápido.
- **TypeScript**: Tipagem estática para maior segurança e produtividade.

## Padrões de Projeto

- **Componentização**: Componentes reutilizáveis em `src/components` e `src/components/ui`.
- **Hooks e Providers**: Uso de React Query Provider e React Router para contexto global.
- **Aliases de Imports**: Configurados via `tsconfig` e `components.json` para facilitar imports (`@/components`, `@/lib/utils`, etc).
- **Estilização utilitária**: Tailwind CSS com customização via CSS variables e temas.

## Estrutura do Projeto

```
src/
  app.tsx              # Setup de providers e rotas
  main.tsx             # Entry point
  index.css            # Estilos globais e Tailwind
  components/
    ui/                # Componentes de UI reutilizáveis (ex: Button)
  lib/
    utils.ts           # Utilitários globais
  pages/
    create-room.tsx    # Página de criação/listagem de salas
    room.tsx           # Página de detalhes da sala
```

## Setup e Configuração

1. **Pré-requisitos**:

   - Node.js 20+
   - npm

2. **Instalação**:

   ```sh
   npm install
   ```

3. **Rodando em desenvolvimento**:

   ```sh
   npm run dev
   ```

   O projeto estará disponível em [http://localhost:5173](http://localhost:5173).

4. **Build para produção**:

   ```sh
   npm run build
   ```

5. **Preview do build**:

   ```sh
   npm run preview
   ```

6. **Configuração do Tailwind**:  
   O Tailwind está configurado via `src/index.css` e utiliza variáveis CSS para temas claro/escuro.  
   Para customização, edite o arquivo [src/index.css](src/index.css).

7. **Aliases de Imports**:  
   Os aliases estão definidos em [tsconfig.app.json](tsconfig.app.json) e [components.json](components.json).

## Observações

- O projeto utiliza o [Vite](vite.config.ts) para desenvolvimento rápido e hot reload.
- O gerenciamento de dados é feito via React Query, facilitando cache e sincronização com a API.
- O padrão de componentes segue a abordagem do [shadcn/ui](https://ui.shadcn.com/).

---

Desenvolvido durante o evento NLW da Rocketseat
