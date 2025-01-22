# Projeto API com Node.js, Express e MongoDB

Este projeto é uma API desenvolvida em Node.js, utilizando o framework Express e o banco de dados MongoDB. Ele foi projetado para gerenciar autenticação e operações relacionadas a usuários.

## Funcionalidades

- **Autenticação**:
  - Registro de novos usuários.
  - Login de usuários existentes.

- **Gerenciamento de Usuários**:
  - Operações CRUD (Criar, Ler, Atualizar, Excluir) para usuários.

- **Tratamento de Erros**:
  - Middleware dedicado para capturar e lidar com erros de forma centralizada.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção de APIs REST.
- **MongoDB**: Banco de dados NoSQL para persistência de dados.
- **Mongoose**: ODM (Object Data Modeling) para interagir com o MongoDB.
- **Dotenv**: Gerenciamento de variáveis de ambiente.

## Configuração do Ambiente

1. **Requisitos**
   - Node.js (v14 ou superior)
   - MongoDB
   - Conta no MongoDB Atlas (opcional, para uso do banco de dados na nuvem)

2. **Instalação**

   Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

   Instale as dependências:

   ```bash
   npm install
   ```

3. **Configuração**

   Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

   ```env
   PORT=3000
   DB_USER=seu_usuario_mongodb
   DB_PASS=sua_senha_mongodb
   JWT_SECRET=sua_jwt_secret
   ```

## Estrutura do Projeto

```
projeto/
├── app.js
├── routes/
│   ├── auth.routes.js
│   └── user.routes.js
├── middlewares/
│   ├── checkToken.js
│   ├── errorHandler.js
│   └── validateRegistration.js
├── models/
│   └── User.js
└── utils/
    ├── auth.js
    └── validation.js
```

## Como Executar

Inicie o servidor com o comando:

```bash
npm run start
```

O servidor será iniciado na porta definida em `PORT` e estará acessível em `http://localhost:3000`.

## Rotas Principais

### **Rota Base**
- **GET /**: Retorna uma mensagem de boas-vindas.

### **Rotas de Autenticação**
- **POST /auth/register**: Registra um novo usuário.
- **POST /auth/login**: Realiza login e retorna um token de autenticação.

### **Rotas de Usuários**
- **GET /user**: Lista usuários (requer autenticação).
- **PUT /user/:id**: Atualiza informações de um usuário específico (requer autenticação).
- **DELETE /user/:id**: Remove um usuário do sistema (requer autenticação).

## Contribuindo

Contribuições são bem-vindas! Siga as etapas abaixo para contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para suas alterações (`git checkout -b feature/nova-funcionalidade`).
3. Realize suas alterações e faça commits claros.
4. Abra um pull request detalhando suas mudanças.



