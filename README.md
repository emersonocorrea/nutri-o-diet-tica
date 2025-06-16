Nutrição & Dietética (React)
Frontend para gerenciamento de pacientes e usuários integrado com o backend snd-backend.
Pré-requisitos

Node.js (>=18)
npm

Instalação

Clone o repositório:git clone <url-do-repositorio>
cd nutri-o-diet-tica


Instale as dependências:npm install


Compile o Tailwind CSS:npm run build:css



Executando Localmente

Inicie o servidor de desenvolvimento:npm run dev


Acesse http://localhost:5173/login no navegador.

Deploy no Netlify

Build do projeto:npm run build
npm run build:css


Configure o Netlify:
Diretório de publicação: dist
Build command: npm run build && npm run build:css


Defina a variável de ambiente VITE_BASE_URL=https://snd-backend.onrender.com no painel do Netlify.

Funcionalidades

Login com autenticação JWT
CRUD de pacientes com filtros e geração de PDFs
CRUD de usuários (restrito a administradores)
Integração com endpoints /auth, /patients, /users, /meals

Notas

O backend deve estar ativo em https://snd-backend.onrender.com.
Certifique-se de que o CORS está configurado para aceitar qualquer origem.

