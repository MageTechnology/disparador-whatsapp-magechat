# Guia de Configuração do Ambiente de Desenvolvimento

## Visão Geral

Este guia detalha como configurar e rodar o projeto em um ambiente de desenvolvimento local. O projeto utiliza uma filosofia de múltiplos ambientes para garantir que o código novo seja testado de forma segura antes de ir para a produção.

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados e atualizados:

1.  **Node.js** (versão 20 ou superior)
2.  **pnpm** (gerenciador de pacotes)
3.  **Docker Desktop** (para rodar o ambiente Supabase local)
4.  **Git**

---

## Configuração Inicial (Primeira Vez)

Siga estes passos após clonar o repositório pela primeira vez.

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
```

### Passo 2: Instalar as Dependências

```bash
pnpm install
```

### Passo 3: Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto. Copie o conteúdo do arquivo `.env.example` para ele e preencha as variáveis necessárias para os ambientes de Staging e Produção.

O script já cria um `.env.example` completo para você. Você só precisa renomeá-lo para `.env.local` e adicionar suas chaves secretas.

### Passo 4: Iniciar o Ambiente Local do Supabase

Com o Docker Desktop em execução, rode os seguintes comandos:

```bash
# 1. Inicializa a configuração do Supabase (só precisa rodar uma vez)
pnpm dlx supabase init

# 2. Inicia os containers do Supabase (Postgres, Auth, etc.)
pnpm dlx supabase start
```

Ao final, o terminal mostrará as URLs e chaves do seu ambiente local, que já correspondem ao que está no seu `.env.example`.

### Passo 5: Sincronizar o Schema do Banco de Dados Local

Após o Supabase local iniciar, você precisa aplicar o schema do banco de dados a ele. Adicione os seguintes scripts ao seu `package.json`:

```json
"scripts": {
  // ... outros scripts
  "db:push": "drizzle-kit push:pg",
  "db:studio": "drizzle-kit studio"
}
```

Depois, rode o comando:

```bash
# Garanta que APP_ENV=development no seu .env.local
pnpm db:push
```

### Passo 6: Rodar a Aplicação

Finalmente, inicie o servidor de desenvolvimento do Next.js.

```bash
pnpm dev
```

Sua aplicação estará rodando em `http://localhost:3000` e conectada ao seu banco de dados local.

---

## Visualizando o Banco de Dados Local

### 1. Supabase Studio (Recomendado)

-   **Como acessar:** Após rodar `pnpm dlx supabase start`, abra seu navegador no endereço fornecido pelo terminal para o "Studio URL". Geralmente é **`http://localhost:54323`**.
-   **Vantagens:** Permite ver tabelas, gerenciar usuários do Auth, rodar SQL e muito mais.

### 2. Drizzle Studio

-   **Como acessar:** Rode o comando `pnpm db:studio` no terminal.
-   **Vantagens:** Ótimo para uma olhada rápida nas tabelas e para edições simples.

### 3. Clientes SQL Dedicados (Avançado)

-   **Como conectar:** Use a string de conexão fornecida pelo Supabase ao iniciar (geralmente `postgresql://postgres:postgres@localhost:54322/postgres`).
-   **Vantagens:** Ideal para escrever queries complexas.

---

## Troubleshooting

-   **Erro `DATABASE_URL... is not set`:** Verifique se o arquivo `.env.local` foi criado corretamente.
-   **Erro de conexão com o Docker:** Garanta que o Docker Desktop está aberto e em execução.
-   **Erro `supabase command not found`:** Use `pnpm dlx supabase ...` para garantir que a CLI correta seja usada.
