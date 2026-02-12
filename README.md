# ERPsb - Starter Kit Profissional

Monolito modular para ERP SaaS mobile-first, focado em PMEs brasileiras, com multi-tenant por linha (RLS), PIX nativo, WhatsApp e base fiscal para CBS/IBS.

## Visao geral
- Onboarding rapido (wizard de 5 perguntas).
- Operacao principal em celular (Android-first / PWA-ready).
- Isolamento de dados por tenant (`tenantId` em entidades de dominio).
- Integracoes prontas para Mercado Pago, WhatsApp Business e Focus NFe.

## Stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 + base de componentes
- PostgreSQL 16 (Supabase) + Prisma 6
- NextAuth v5 (`5.0.0-beta.30`)
- Vitest + Playwright
- Vercel (deploy)

## Arquitetura de pastas
```text
src/
  app/                # paginas e API routes
  core/               # auth, tenant, security, validation, observability
  modules/            # regras de negocio por modulo
  integrations/       # adaptadores externos (PIX, WhatsApp, Fiscal)
  lib/                # db, env e utilitarios
prisma/
  schema.prisma
  seed.ts
docs/
  ERPsb.md
  openapi.yaml
  pm-qa/
  sql/rls.sql
```

## Pre-requisitos
- Node.js 20+
- pnpm 10+
- PostgreSQL 16 (local ou Supabase)

## Passo a passo local (profissional)

### 1) Instalar dependencias
```bash
pnpm install
```

### 2) Configurar ambiente
```bash
copy .env.example .env
```
Edite o arquivo `.env` com suas credenciais.

### 3) Preparar Prisma Client
```bash
pnpm prisma:generate
```

### 4) Aplicar migrations
```bash
pnpm prisma:migrate
```

### 5) Popular base inicial
```bash
pnpm db:seed
```

### 6) Rodar aplicacao
```bash
pnpm dev
```
Acesse: `http://127.0.0.1:3000`

### 7) Login inicial (seed)
- Email: `owner@demo.local`
- Senha: `123456`

## Validacao rapida (smoke)
1. Abrir `http://127.0.0.1:3000/login`.
2. Fazer login com usuario demo.
3. Acessar `http://127.0.0.1:3000/dashboard`.
4. Testar healthcheck:
```bash
curl http://127.0.0.1:3000/api/v1/health
```
Esperado: `{"status":"ok",...}`

## Variaveis de ambiente
| Variavel | Obrigatoria | Descricao |
|---|---|---|
| `DATABASE_URL` | Sim | conexao principal com PostgreSQL |
| `DIRECT_URL` | Recomendado | conexao direta para migrations |
| `NEXTAUTH_SECRET` | Sim | segredo de sessao/autenticacao |
| `NEXTAUTH_URL` | Sim | URL base da aplicacao |
| `MERCADO_PAGO_ACCESS_TOKEN` | Sim (PIX prod) | token da API Mercado Pago |
| `MERCADO_PAGO_WEBHOOK_SECRET` | Sim (PIX prod) | validacao de assinatura webhook |
| `WHATSAPP_TOKEN` | Sim (WhatsApp prod) | token WhatsApp Business |
| `WHATSAPP_PHONE_NUMBER_ID` | Sim (WhatsApp prod) | identificador do numero |
| `FOCUS_NFE_TOKEN` | Sim (Fiscal prod) | token da Focus NFe |
| `SENTRY_DSN` | Recomendado | observabilidade de erros |
| `DEFAULT_TENANT_SLUG` | Sim | tenant padrao para bootstrap |

## Scripts operacionais
| Script | Funcao |
|---|---|
| `pnpm dev` | sobe aplicacao em desenvolvimento |
| `pnpm build` | gera build de producao |
| `pnpm start` | executa build de producao |
| `pnpm lint` | valida qualidade de codigo com ESLint |
| `pnpm test:unit` | executa testes unitarios (Vitest) |
| `pnpm test:e2e` | executa testes E2E (Playwright) |
| `pnpm prisma:generate` | gera Prisma Client |
| `pnpm prisma:migrate` | aplica migration em desenvolvimento |
| `pnpm prisma:deploy` | aplica migration em producao |
| `pnpm db:seed` | popula massa inicial |

## Banco e multi-tenant
- `tenantId` esta presente nas entidades de dominio.
- Middleware injeta contexto de tenant.
- Guards validam autorizacao por tenant e role.
- Politicas de RLS para Supabase em `docs/sql/rls.sql`.

## API base disponivel
- `GET /api/v1/health`
- `GET /api/v1/dashboard/summary`
- `GET/POST /api/v1/cadastros/customers`
- `GET/POST /api/v1/finance/transactions`
- `GET/POST /api/v1/sales/orders`
- `POST /api/v1/pix/charge`
- `POST /api/v1/pix/webhook`
- `POST /api/v1/fiscal/invoices`
- `GET/POST /api/v1/stock/items`
- `POST /api/v1/whatsapp/send`
- `GET/PUT /api/v1/config/me`

Contrato OpenAPI: `docs/openapi.yaml`

## Checklist minimo antes de deploy
1. `pnpm lint`
2. `pnpm prisma:generate`
3. `pnpm build`
4. Validar smoke em homologacao
5. Conferir webhook PIX e segredos de producao

## Contribuicao
- Pull Requests usam template em `.github/pull_request_template.md`.
- Issues usam templates em `.github/ISSUE_TEMPLATE/`.
- CI automatica roda em `.github/workflows/ci.yml`.

## Documentacao de produto e QA
- Guia PM/QA: `docs/pm-qa/README.md`
- PRD: `docs/pm-qa/PRD.md`
- Roadmap: `docs/pm-qa/roadmap.md`
- Backlog: `docs/pm-qa/backlog.md`
- Criterios de aceite: `docs/pm-qa/acceptance-criteria.md`
- Plano de testes: `docs/pm-qa/qa-test-plan.md`
- Casos de teste: `docs/pm-qa/test-cases.md`
- UAT checklist: `docs/pm-qa/uat-checklist.md`
- Go/No-Go: `docs/pm-qa/release-go-no-go.md`
- Politica de triagem: `docs/pm-qa/bug-triage-policy.md`

## Troubleshooting
- Erro de banco: confirme `DATABASE_URL` e se o Postgres esta ativo.
- Erro de Prisma Client: rode `pnpm prisma:generate`.
- Erro de auth: valide `NEXTAUTH_SECRET` e `NEXTAUTH_URL`.
- Webhook PIX rejeitado: verifique `MERCADO_PAGO_WEBHOOK_SECRET`.

## Licenca
Licenca de uso pessoal particular (versao formal), titularidade de Marcelo Rayzen.
Uso comercial e distribuicao para terceiros sao proibidos sem autorizacao expressa por escrito.
Regras completas no arquivo `LICENSE` (contato: `11 99388-2374`).
