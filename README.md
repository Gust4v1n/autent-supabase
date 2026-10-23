# 🔐 App de Autenticação com Supabase + React

Aplicação React com autenticação completa usando Supabase Auth, incluindo login social com Google OAuth 2.0, cadastro com email/senha, gerenciamento de sessão global com Context API e rotas protegidas.

## 🎯 Funcionalidades

- ✅ **Cadastro de usuários** com email e senha
- ✅ **Login com email e senha** 
- ✅ **Login Social com Google OAuth 2.0**
- ✅ **Gerenciamento de sessão** com React Context API
- ✅ **Rotas protegidas** - apenas usuários autenticados acessam o dashboard
- ✅ **Exibição de dados do usuário** (nome, email, foto de perfil)
- ✅ **Logout** com limpeza de sessão
- ✅ **Interface responsiva** para mobile e desktop

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool rápido
- **Supabase** - Backend as a Service com autenticação
- **React Router DOM** - Roteamento
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase
- Projeto criado no Google Cloud Console (para OAuth)

## ⚙️ Configuração do Projeto

### 1. Clone o repositório

\`\`\`bash
git clone https://github.com/Gust4v1n/autent-supabase.git
cd autent-supabase
\`\`\`

### 2. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente

Renomeie o arquivo \`.env.example\` para \`.env\` e adicione suas credenciais do Supabase:

\`\`\`env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key-aqui
\`\`\`

> ⚠️ **Importante**: Nunca comite o arquivo \`.env\` no repositório!

## 🔧 Configuração do Google Cloud Console

### Passo 1: Criar Credenciais OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie ou selecione um projeto
3. Vá em **APIs e Serviços** > **Tela de permissão OAuth**
4. Configure como **Externo** e preencha as informações básicas
5. Vá em **Credenciais** > **Criar credenciais** > **ID do cliente OAuth**
6. Selecione **Aplicativo da Web**
7. Em **URIs de redirecionamento autorizados**, adicione:
   \`\`\`
   https://dpmuajhquziunvohylmb.supabase.co/auth/v1/callback
   \`\`\`
8. Copie o **Client ID** e **Client Secret**

## 🔐 Configuração do Supabase Dashboard

### Passo 1: Ativar o Provedor Google

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá em **Authentication** > **Providers**
3. Ative o provedor **Google**
4. Cole o **Client ID** e **Client Secret** do Google Cloud
5. Salve as configurações

### Passo 2: Configurar URLs de Redirecionamento

1. Vá em **Authentication** > **URL Configuration**
2. Configure:
   - **Site URL**: \`http://localhost:5173\`
   - **Redirect URLs**: Adicione \`http://localhost:5173\`

## 🎮 Executando o Projeto

### Modo Desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

A aplicação estará disponível em: \`http://localhost:5173\`

### Build para Produção

\`\`\`bash
npm run build
\`\`\`

### Preview da Build

\`\`\`bash
npm run preview
\`\`\`

## 📱 Estrutura do Projeto

\`\`\`
auth-supabase-app/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx      # Componente de rota protegida
│   ├── contexts/
│   │   └── AuthContext.jsx         # Context API de autenticação
│   ├── pages/
│   │   ├── Login.jsx               # Página de login
│   │   ├── SignUp.jsx              # Página de cadastro
│   │   └── Dashboard.jsx           # Dashboard protegido
│   ├── styles/
│   │   ├── Auth.css                # Estilos de autenticação
│   │   └── Dashboard.css           # Estilos do dashboard
│   ├── App.jsx                     # Componente principal
│   ├── main.jsx                    # Entry point
│   ├── index.css                   # Estilos globais
│   └── supabaseClient.js           # Cliente do Supabase
├── .env                            # Variáveis de ambiente (não commitado)
├── .env.example                    # Exemplo de variáveis
├── .gitignore                      # Arquivos ignorados
├── package.json                    # Dependências
└── README.md                       # Este arquivo
\`\`\`

## 🔒 Fluxo de Autenticação

### Login com Google OAuth

1. Usuário clica em "Entrar com Google"
2. É redirecionado para tela de consentimento do Google
3. Após autorizar, retorna para a aplicação
4. Supabase cria automaticamente o usuário
5. Sessão é estabelecida e o usuário acessa o dashboard

### Cadastro com Email/Senha

1. Usuário preenche nome, email e senha
2. \`signUp()\` cria o usuário no Supabase
3. Email de confirmação pode ser enviado (configurável)
4. Usuário é redirecionado ao dashboard

### Login com Email/Senha

1. Usuário insere email e senha
2. \`signInWithPassword()\` valida as credenciais
3. Sessão é criada e armazenada
4. Redirecionamento ao dashboard

## 🛡️ Proteção de Rotas

O componente \`ProtectedRoute\` verifica se há um usuário autenticado:

- ✅ **Autenticado**: Renderiza o conteúdo
- ❌ **Não autenticado**: Redireciona para \`/login\`

## 📊 Gerenciamento de Estado

O \`AuthContext\` gerencia globalmente:

- Estado do usuário (\`user\`)
- Status de carregamento (\`loading\`)
- Funções de autenticação:
  - \`signInWithGoogle()\`
  - \`signUp(email, password, metadata)\`
  - \`signInWithPassword(email, password)\`
  - \`signOut()\`

## 🐛 Solução de Problemas

### Erro: redirect_uri_mismatch

Verifique se a URL de callback no Google Cloud Console é **exatamente igual** à do Supabase:
\`\`\`
https://seu-projeto.supabase.co/auth/v1/callback
\`\`\`

### Erro: Invalid API key

- Confirme que as variáveis de ambiente estão corretas
- Reinicie o servidor de desenvolvimento após alterar o \`.env\`

### Login não funciona

- Verifique se o provedor Google está ativado no Supabase
- Confirme que as Redirect URLs estão configuradas
- Veja os logs no console do navegador

## 📸 Evidências de Funcionamento

### Tela de Login
![Login](docs/login.png)

### Tela de Cadastro
![Cadastro](docs/signup.png)

### Dashboard com Usuário Autenticado
![Dashboard](docs/dashboard.png)

### Usuário no Supabase Dashboard
![Supabase Users](docs/supabase-users.png)

## 🎓 Objetivos de Aprendizagem Alcançados

- ✅ Configuração de credenciais OAuth no Google Cloud Console
- ✅ Ativação e parametrização do provedor Google no Supabase
- ✅ Integração do método \`signInWithOAuth()\`
- ✅ Captura de sessão com \`getSession()\`
- ✅ Escuta de mudanças com \`onAuthStateChange()\`
- ✅ Implementação de logout com \`signOut()\`
- ✅ Gerenciamento de estado com Context API
- ✅ Rotas protegidas condicionais

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/MinhaFeature\`)
3. Commit suas mudanças (\`git commit -m 'Adiciona MinhaFeature'\`)
4. Push para a branch (\`git push origin feature/MinhaFeature\`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é para fins educacionais.

## 👨‍💻 Autor

Desenvolvido como parte da disciplina de Desenvolvimento Web.

---

**⚠️ Lembre-se**: Nunca comite credenciais ou chaves privadas no repositório. Use sempre variáveis de ambiente!
