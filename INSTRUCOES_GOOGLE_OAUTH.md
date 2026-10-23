# 🔐 Guia Completo: Configuração Google OAuth para Supabase

Este guia detalha passo a passo como configurar a autenticação com Google OAuth 2.0 para seu projeto Supabase.

## 📋 Pré-requisitos

- Conta Google
- Projeto no Supabase já criado
- Acesso ao [Google Cloud Console](https://console.cloud.google.com/)

---

## 🎯 PARTE 1: Configuração no Google Cloud Console

### Passo 1: Criar ou Selecionar um Projeto

1. Acesse: https://console.cloud.google.com/
2. No topo da página, clique no **seletor de projetos**
3. Clique em **"Novo Projeto"** ou selecione um existente
4. Se criar novo:
   - Nome do projeto: `Supabase Auth App` (ou nome da sua preferência)
   - Clique em **"Criar"**

### Passo 2: Configurar a Tela de Consentimento OAuth

1. No menu lateral, vá em: **APIs e Serviços** > **Tela de consentimento OAuth**
2. Selecione o tipo de usuário:
   - ✅ **Externo** (recomendado para testes e apps públicos)
   - Clique em **"Criar"**

3. **Preencha as informações obrigatórias:**

   **Informações do app:**
   - Nome do app: `Supabase Auth App`
   - Email de suporte ao usuário: `seu-email@gmail.com`
   
   **Informações de contato do desenvolvedor:**
   - Endereços de email: `seu-email@gmail.com`

4. Clique em **"Salvar e continuar"**

5. **Escopos (opcional para OAuth básico):**
   - Você pode pular esta etapa clicando em **"Salvar e continuar"**
   - Os escopos básicos do Google (email, profile, openid) são incluídos automaticamente

6. **Usuários de teste (apenas para modo de teste):**
   - Adicione emails de teste se quiser
   - Clique em **"Salvar e continuar"**

7. Revise o resumo e clique em **"Voltar ao painel"**

### Passo 3: Criar Credenciais OAuth 2.0

1. No menu lateral, vá em: **APIs e Serviços** > **Credenciais**
2. Clique no botão **"+ Criar credenciais"** no topo
3. Selecione **"ID do cliente OAuth"**

4. **Configure o cliente OAuth:**

   - **Tipo de aplicativo:** `Aplicativo da Web`
   
   - **Nome:** `Supabase Auth Client`
   
   - **Origens JavaScript autorizadas:** (opcional, pode deixar vazio)
     ```
     http://localhost:5173
     ```
   
   - **URIs de redirecionamento autorizados:** (IMPORTANTE!)
     ```
     https://dpmuajhquziunvohylmb.supabase.co/auth/v1/callback
     ```
     
     > ⚠️ **ATENÇÃO**: Substitua `dpmuajhquziunvohylmb` pelo ID do SEU projeto Supabase!
     
     Para encontrar seu ID:
     - Acesse seu projeto no Supabase Dashboard
     - Vá em **Settings** > **API**
     - Copie a parte após `https://` e antes de `.supabase.co` da URL

5. Clique em **"Criar"**

6. **Uma janela aparecerá com suas credenciais:**
   - ✅ Copie o **Client ID** (algo como: `123456789-abc123.apps.googleusercontent.com`)
   - ✅ Copie o **Client Secret** (algo como: `GOCSPX-abc123xyz789`)
   - ⚠️ **GUARDE ESSAS CREDENCIAIS** - você precisará delas no próximo passo

---

## 🔧 PARTE 2: Configuração no Supabase Dashboard

### Passo 1: Ativar o Provedor Google

1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard)
2. No menu lateral, vá em: **Authentication** > **Providers**
3. Role a página até encontrar **Google**
4. Clique para expandir as configurações do Google
5. Ative o toggle **"Enable Sign in with Google"**

### Passo 2: Inserir as Credenciais

1. Cole o **Client ID** do Google no campo apropriado
2. Cole o **Client Secret** do Google no campo apropriado
3. ✅ Clique em **"Save"** no final da seção

### Passo 3: Configurar URLs de Redirecionamento

1. No menu lateral, vá em: **Authentication** > **URL Configuration**

2. Configure as seguintes URLs:

   **Site URL:**
   ```
   http://localhost:5173
   ```
   
   **Redirect URLs:**
   ```
   http://localhost:5173
   http://localhost:5173/**
   ```
   
   > Para produção, adicione também sua URL de produção (ex: `https://meuapp.com`)

3. Clique em **"Save"**

---

## 🧪 PARTE 3: Testar a Configuração

### 1. Execute o projeto localmente

```bash
cd auth-supabase-app
npm run dev
```

### 2. Acesse no navegador

Abra: http://localhost:5173

### 3. Teste o fluxo de login

1. Clique em **"Entrar com Google"**
2. Você será redirecionado para a página de consentimento do Google
3. Selecione sua conta Google
4. Autorize o acesso ao app
5. Você deve ser redirecionado de volta para o dashboard
6. Seus dados (nome, email, foto) devem aparecer na tela

### 4. Verifique no Supabase

1. Vá em: **Authentication** > **Users** no Supabase Dashboard
2. Você deve ver seu usuário listado com:
   - Email
   - Provider: `google`
   - Data de criação

---

## 🐛 Solução de Problemas Comuns

### ❌ Erro: `redirect_uri_mismatch`

**Problema:** A URL de callback não corresponde

**Solução:**
1. Verifique se a URL no Google Cloud Console é EXATAMENTE:
   ```
   https://SEU-PROJECT-ID.supabase.co/auth/v1/callback
   ```
2. Não pode ter `/` no final
3. Não pode ter espaços
4. Deve usar HTTPS (não HTTP)

### ❌ Erro: `Access blocked: This app's request is invalid`

**Problema:** Configuração da tela de consentimento incompleta

**Solução:**
1. Volte para **Tela de consentimento OAuth**
2. Verifique se preencheu:
   - Nome do app
   - Email de suporte
   - Email do desenvolvedor
3. Publique o app se necessário (sair do modo de teste)

### ❌ Erro: `Invalid client ID`

**Problema:** Client ID ou Secret incorretos

**Solução:**
1. Verifique se copiou as credenciais corretamente
2. Sem espaços extras no início ou fim
3. Tente gerar novas credenciais no Google Cloud Console

### ❌ Login funciona mas não redireciona

**Problema:** Site URL ou Redirect URLs incorretas no Supabase

**Solução:**
1. Vá em **Authentication** > **URL Configuration**
2. Adicione todas as URLs necessárias:
   ```
   http://localhost:5173
   http://localhost:5173/**
   ```

### ❌ Erro: `Email not allowed`

**Problema:** App está em modo de teste e seu email não está na lista

**Solução:**
1. Vá em **Tela de consentimento OAuth**
2. Em **Usuários de teste**, adicione seu email
3. OU publique o app para produção

---

## 📝 Checklist Final

Antes de considerar a configuração completa, verifique:

- [ ] Projeto criado no Google Cloud Console
- [ ] Tela de consentimento OAuth configurada
- [ ] Credenciais OAuth criadas (Client ID e Secret)
- [ ] URI de redirecionamento correta no Google Cloud
- [ ] Provedor Google ativado no Supabase
- [ ] Client ID e Secret inseridos no Supabase
- [ ] Site URL configurada no Supabase
- [ ] Redirect URLs configuradas no Supabase
- [ ] Teste de login funcionando
- [ ] Usuário aparecendo no Supabase Dashboard

---

## 🚀 Próximos Passos

Após configurar o OAuth:

1. ✅ Implemente lógica adicional no dashboard (CRUD)
2. ✅ Adicione mais provedores (GitHub, Facebook, etc.)
3. ✅ Configure email confirmation se necessário
4. ✅ Implemente recuperação de senha
5. ✅ Prepare para deploy em produção

---

## 🔗 Links Úteis

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [Google Cloud Console](https://console.cloud.google.com/)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

---

## 💡 Dicas de Segurança

1. ❌ **NUNCA** comite o arquivo `.env` no Git
2. ✅ Use `.env.example` como template
3. ✅ Adicione `.env` no `.gitignore`
4. ✅ Para produção, use variáveis de ambiente do servidor
5. ✅ Rotacione o Client Secret periodicamente
6. ✅ Limite os escopos ao mínimo necessário

---

**✨ Configuração concluída com sucesso!**
