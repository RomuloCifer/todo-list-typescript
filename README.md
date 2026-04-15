# To Do List

Lista de tarefas simples para organizar o dia a dia. O projeto partiu de uma **base existente** e está em **refatoração e migração de JavaScript para TypeScript** (em andamento): a lógica ainda roda em JavaScript; o TypeScript e o `tsconfig.json` foram adicionados para consolidar tipagem e build à medida que os arquivos forem migrados.

## O que já funciona

- Adicionar novas tarefas
- Marcar tarefa como concluída
- Remover tarefa da lista

## Como abrir / testar

1. Abra a pasta do projeto no editor (por exemplo VS Code).
2. Abra o arquivo `index.html` no navegador.

Opcional: use a extensão **Live Server** (ou similar) para recarregar automaticamente durante o desenvolvimento.

## Desenvolvimento e migração para TypeScript

- **Dependências de desenvolvimento:** `typescript` e `@types/node` (definidas em `package.json`).
- **Configuração:** `tsconfig.json` na raiz (opções estritas e preparação para compilação; ajuste `rootDir` / `outDir` quando a estrutura `src`/`dist` estiver definida).
- **Estado atual:** o ponto de entrada da página continua carregando `./js/script.js` (módulo ES). A migração consiste em portar esse código para `.ts`, compilar (ou usar outro fluxo acordado pelo projeto) e apontar o HTML para o resultado da build, quando aplicável.

Para instalar as dependências (após clonar):

```bash
npm install
```

Para verificar tipos / compilar quando houver arquivos TypeScript no projeto:

```bash
npx tsc
```

(Ajuste scripts em `package.json` conforme o fluxo de build for definido.)

## Estrutura do projeto

```text
to_do_list/
├── index.html
├── package.json
├── tsconfig.json
├── assets/
├── css/
│   ├── styles.css
│   └── variables.css
└── js/
    └── script.js    # em migração para TypeScript
```

## Próximos passos (ideias)

- Concluir a migração da lógica em `js/script.js` para TypeScript e o fluxo de build.
- Salvar tarefas após recarregar a página (por exemplo `localStorage`).
- Melhorar detalhes visuais e responsividade.
- Adicionar filtros (todas, concluídas e pendentes).

## Tecnologias

- **HTML5** — estrutura da página
- **CSS3** — estilização e variáveis de design (`variables.css`)
- **JavaScript** (Vanilla JS / ES6+) — lógica atual do CRUD das tarefas
- **TypeScript** — linguagem alvo da migração; ferramentas já presentes no repositório
