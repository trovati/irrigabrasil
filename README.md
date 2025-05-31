````markdown
# 💧 Irriga Brasil - Sistema de Pedidos

Este é um sistema interno desenvolvido com [NestJS](https://nestjs.com/) para a empresa de irrigação do meu pai, com o objetivo de facilitar o cadastro de clientes, produtos e a geração de pedidos.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) — Framework para Node.js
- [MySQL](https://www.mysql.com/) — Banco de dados relacional
- [TypeORM](https://typeorm.io/) — ORM para integração com o MySQL
- [Puppeteer](https://pptr.dev/) — Geração de PDF dos pedidos
- [Prettier](https://prettier.io/) & [ESLint](https://eslint.org/) — Padronização e qualidade de código

## 📦 Funcionalidades

- ✅ Cadastro de clientes
- ✅ Cadastro de produtos
- ✅ Criação e gerenciamento de pedidos
- ✅ Geração de pedido em **PDF** com dados do cliente e tabela de produtos

## 🛠️ Instalação

> Requisitos: Node.js v18+, MySQL rodando localmente

Clone o projeto:

```bash
git clone https://github.com/seu-usuario/irriga-back.git
cd irriga-back
```
````

Instale as dependências:

```bash
npm install
```

Configure o banco de dados no arquivo `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=sua_senha
DB_DATABASE=irriga
```

Rode as migrations (se houver):

```bash
npm run typeorm migration:run
```

Inicie o projeto em modo desenvolvimento:

```bash
npm run start:dev
```

## 📄 Geração de PDF

Após cadastrar os dados do cliente, produtos e fechar um pedido, o sistema permite a geração de um PDF com os dados organizados de forma visual, pronto para ser impresso ou enviado por WhatsApp/e-mail.

O template HTML do PDF está localizado em:

```
src/common/template.html
```

O arquivo final é salvo automaticamente na pasta:

```
output/
```

## 📁 Estrutura do Projeto

```
src/
├── client/           # Módulo de clientes
├── product/          # Módulo de produtos
├── order/            # Módulo de pedidos
├── common/           # Geração de PDF, utilitários
└── main.ts           # Bootstrap da aplicação
```

## 📚 Scripts Úteis

```bash
npm run start        # Inicia a aplicação
npm run start:dev    # Inicia com hot reload
npm run build        # Compila a aplicação
npm run lint         # Analisa o código com ESLint
npm run test         # Executa os testes
```

## 👨‍💻 Autor

Feito por Watson Trovati Matos
