# Sistema de Segurança Web 🔐

Sistema desenvolvido para a disciplina de Segurança da Informação, utilizando React no frontend, Node.js no backend e MySQL no banco de dados.

O projeto implementa mecanismos modernos de autenticação, proteção de credenciais, controle de sessão, criptografia e comunicação segura.

# 📌 Tecnologias Utilizadas

## Frontend

* React
* Vite
* Tailwind CSS
* React Router DOM

## Backend

* Node.js
* Express
* bcrypt
* JWT
* Nodemailer
* Helmet
* dotenv
* cors
* HTTPS (SSL)

## Banco de Dados

* MySQL

## 🔐 Funcionalidades de Segurança
  
* Criptografia de senhas com bcrypt
* Cadastro e login de usuários
* Autenticação em dois fatores (2FA)
* Recuperação de senha
* Proteção contra força bruta
* Controle e invalidação de sessão
* Rotas protegidas com JWT
* Security Headers com Helmet
* Comunicação segura via HTTPS
* Logs de segurança
* Atualização de perfil
* Exclusão de conta

# 🗄️ Banco de Dados

## Script SQL

Arquivo:

```txt
backend/database.sql
```

## Estrutura da tabela users

```sql
CREATE DATABASE seguranca;

USE seguranca;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
```

# 🚀 Como Executar o Projeto

# 1️⃣ Clonar Repositório

```bash
git clone https://github.com/goncalvesjv2/sistema-seguranca-web.git
```

# 2️⃣ Banco de Dados

## Abrir o XAMPP

Inicie apenas:

* MySQL

# 3️⃣ Backend

## Entrar na pasta backend

```bash
cd backend
```

## Instalar dependências

```bash
npm install
```

## Configurar arquivo .env

Criar arquivo:

```txt
.env
```

Conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=seguranca

JWT_SECRET=
JWT_EXPIRES_IN=

EMAIL_USER=
EMAIL_PASS=
```

## Executar backend

```bash
node src/server.js
```

Servidor backend:

```txt
https://localhost:3000
```

# 4️⃣ Frontend

## Entrar na pasta frontend

```bash
cd frontend
```

## Instalar dependências

```bash
npm install
```

## Executar frontend

```bash
npm run dev
```

Frontend:

```txt
http://localhost:5173
```