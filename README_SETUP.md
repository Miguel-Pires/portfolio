# Portfolio — Setup

## 1. Configurar Supabase

No Supabase, crie:

**Tabela `certificates`:**
```sql
create table certificates (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  issuer     text not null,
  date       text not null,
  image_url  text not null,
  created_at timestamptz default now()
);
alter table certificates enable row level security;
create policy "Public read" on certificates for select using (true);
create policy "Anon insert" on certificates for insert with check (true);
create policy "Anon delete" on certificates for delete using (true);
```

**Storage bucket `certificates`:**
- Crie um bucket público chamado `certificates`
- Em Policies, permita SELECT e INSERT para `anon`

## 2. Criar .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_ADMIN_PASSWORD=sua_senha_aqui
```

## 3. Rodar localmente

```bash
npm run dev
```

Acesse: http://localhost:3000
Admin: http://localhost:3000/admin

## 4. Deploy no Vercel

1. Faça push para GitHub
2. Importe o repositório no Vercel
3. Adicione as variáveis de ambiente no painel do Vercel
4. Deploy automático a cada push

## Adicionar certificados

Acesse `/admin` com a senha configurada no `.env.local`.
Faça upload da imagem, preencha título, emissor e data.
O certificado aparece automaticamente na página principal.
