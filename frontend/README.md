
# 🧠 AtendeBot - Frontend

Este repositório contém o frontend do projeto **AtendeBot**, um sistema inteligente de atendimento automatizado voltado para pequenas e médias empresas. O AtendeBot foi desenvolvido como Trabalho de Conclusão de Curso (TCC) por **Josdegar Ferreira dos Santos** para a **Faculdade UNIGRAN**.

## 📌 Sobre o Projeto

O AtendeBot tem como objetivo facilitar a comunicação entre empresas e clientes por meio de um chatbot baseado em inteligência artificial, que responde automaticamente às perguntas frequentes e direciona atendimentos personalizados.

Este repositório é responsável pela interface do usuário, desenvolvida com foco em responsividade, performance e experiência do usuário.

## ⚙️ Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) – Framework React para renderização híbrida e rotas otimizadas
- [Tailwind CSS](https://tailwindcss.com/) – Framework CSS utilitário para estilização rápida
- [ShadCN UI](https://ui.shadcn.dev/) – Componentes modernos com base em Radix UI
- [Axios](https://axios-http.com/) – Cliente HTTP para comunicação com o backend

## 📁 Estrutura do Projeto

```bash
atende-bot-frontend/
├── public/             # Imagens e arquivos estáticos
├── src/
│   ├── components/     # Componentes reutilizáveis da interface
│   ├── pages/          # Páginas do sistema (Next.js)
│   ├── lib/            # Configurações auxiliares (ex: Axios)
│   ├── styles/         # Estilos globais
│   └── app/            # Se utilizar App Router (Next.js 13+)
├── .env.local          # Variáveis de ambiente
├── tailwind.config.ts  # Configuração do Tailwind CSS
├── tsconfig.json       # Configuração do TypeScript
└── README.md
```

## 🚀 Como Rodar o Projeto

1. Clone o repositório:

```bash
git clone https://github.com/Jooj2004/atende-bot-frontend.git
cd atende-bot-frontend
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Crie um arquivo `.env.local` com as variáveis necessárias, como a URL do backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

## 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**GitHub:** [@Jooj2004](https://github.com/Jooj2004)  
**Faculdade:** UNIGRAN  
**Projeto:** AtendeBot (TCC)
