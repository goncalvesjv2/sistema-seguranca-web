# Sistema de Segurança Web 🔐

Sistema acadêmico desenvolvido para a disciplina de Segurança da Informação, utilizando arquitetura Full Stack com React no frontend e Node.js no backend.

O projeto implementa autenticação segura de usuários, criptografia de senhas, autenticação em dois fatores (2FA), controle de sessão e proteção de rotas.

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
* dotenv
* cors

## Banco de Dados

* MySQL

# ⚙️ Funcionalidades Implementadas

## ✅ Cadastro de Usuários

* Registro de novos usuários
* Validação de campos
* Verificação de e-mail único

## ✅ Login de Usuários

* Autenticação via email e senha
* Integração frontend/backend

## ✅ Criptografia de Senhas

Utilização do bcrypt para:

* hash de senhas
* salt automático
* proteção de credenciais

## ✅ Autenticação em Dois Fatores (2FA)

* Geração de código temporário
* Validação do código
* Segunda camada de autenticação

## ✅ Sessão de Usuário

* Controle de autenticação
* Persistência de sessão
* Expiração automática

## ✅ Logout

* Encerramento de sessão
* Remoção de dados do localStorage

## ✅ Proteção de Rotas

Utilização de middleware para:

* validação de autenticação
* bloqueio de acesso não autorizado

## ✅ Proteção Contra Força Bruta

* Limite de tentativas de login
* Bloqueio temporário

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
    password VARCHAR(100)
);
```

# 🚀 Como Executar o Projeto

# 1️⃣ Clonar Repositório

```bash
git clone https://github.com/goncalvesjv2/sistema-seguranca-web.git
```

# 2️⃣ Backend

## Entrar na pasta

```bash
cd backend
```

## Instalar dependências

```bash
npm install
```

## Configurar arquivo .env

Criar:

```txt
.env
```

Conteúdo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=seguranca
```

## Executar backend

```bash
node src/server.js
```

# 3️⃣ Frontend

## Entrar na pasta

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