# 🤖 AtendeBot Fullstack

**AtendeBot** é uma plataforma de chatbot inteligente desenvolvida para automatizar o atendimento de empresas.  
Este repositório reúne **frontend, backend e banco de dados** em um único ambiente **Dockerizado**, permitindo execução simples e rápida com apenas um comando.

---

## 🚀 Tecnologias

### 🧠 Backend
- **Node.js** com **TypeScript**
- **Express.js**
- **Prisma ORM** + **PostgreSQL**
- **JWT Auth**
- **Nodemailer**
- **CORS**, **Helmet** e variáveis de ambiente (.env)
- **TSX** para execução e hot reload

### 💻 Frontend
- **Next.js 15** (App Router)
- **React.js** com **TypeScript**
- **Tailwind CSS** e **ShadCN UI**
- **Axios** para comunicação com a API

### 🐳 Infraestrutura
- **Docker** + **Docker Compose**
- Containers independentes para **frontend**, **backend** e **banco de dados**
- Configuração automática via `.env` files

---

## ⚙️ Como executar

### Pré-requisitos
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos
```bash
# Clone o repositório
git clone https://github.com/Jooj2004/atendebot-fullstack.git

# Acesse a pasta
cd atendebot-fullstack

# Inicie os containers
docker compose up --build
```

Acesse:
- **Frontend:** [http://localhost:3000](http://localhost:3000)  
- **Backend:** [http://localhost:5000](http://localhost:5000)

---

## 🧩 Estrutura de pastas
```
atendebot-fullstack/
├── backend/
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── .env
└── docker-compose.yml
```

---

## 📦 Funcionalidades principais
- Cadastro e autenticação de usuários (via JWT)
- Envio e verificação de código OTP por e-mail
- Interface web moderna e responsiva
- Integração entre frontend e backend via API REST
- Deploy simplificado com Docker

---

## 👨‍💻 Autor
**Josdegar Ferreira dos Santos**  
[GitHub @Jooj2004](https://github.com/Jooj2004)  

---

## 🪪 Licença
Este projeto é distribuído sob a licença **MIT**.  
Sinta-se livre para usar, modificar e compartilhar.

---
