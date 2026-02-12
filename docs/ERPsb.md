# ERPsb Blueprint

## 1. O que e
- Como funciona: ERP SaaS mobile-first para PMEs brasileiras com onboarding em 5 perguntas, módulos essenciais e uso diário pelo celular.
- Critérios de aceitação: usuário cria empresa, entra no dashboard, cadastra cliente, emite cobrança PIX e acompanha semáforo em menos de 5 minutos.
- Erros comuns: excesso de campos no onboarding, telas desktop-first, fluxos que exigem treinamento.
- Exemplos: jornada MEI: wizard -> cliente -> venda -> cobrança PIX -> confirmação webhook.

## 2. Contexto de mercado
- Como funciona: resolve fragmentação (planilhas + WhatsApp + app bancário + emissor fiscal isolado) em uma única operação.
- Critérios de aceitação: reduzir retrabalho operacional em 30% e fechamento financeiro semanal sem planilha paralela.
- Erros comuns: tratar PMEs como enterprise; ignorar latência em 4G; não considerar transição fiscal 2026-2033.
- Exemplos: microvarejo com 2 funcionários usando Android e internet instável.

## 3. Público-alvo
- Como funciona: foco em MEI, nanoempreendedor e microempresa em crescimento (serviço, comércio e híbridos).
- Critérios de aceitação: interface legível em telas pequenas, ações principais em até 3 toques, linguagem simples.
- Erros comuns: UX cheia de jargão contábil e cadastros obrigatórios extensos.
- Exemplos: salão, oficina, loja de bairro, prestação de serviço domiciliar.

## 4. Analisar a concorrência
- Como funciona: benchmark de Tiny/Omie/Bling/ContaAzul + apps de cobrança para copiar o essencial e remover fricção.
- Critérios de aceitação: onboarding mais rápido, PIX nativo conciliado e WhatsApp transacional sem plugin manual.
- Erros comuns: competir por volume de features e não por tempo de valor.
- Exemplos: diferencial prático: tela de semáforo + cobrança PIX em 1 fluxo.

## 5. Modelo de negócio
- Como funciona: freemium por faixa de faturamento e volume de documentos/integrações.
- Critérios de aceitação: plano grátis funcional com limite saudável; upgrade guiado por uso real.
- Erros comuns: paywall cedo demais, pricing por usuário sem aderência ao pequeno negócio.
- Exemplos:
  - Free: até R$ 15 mil/mês, 100 cobranças PIX, dashboard e financeiro.
  - Pro: automações, fiscal completo e WhatsApp avançado.

## 6. Roteiro
- Como funciona: entrega incremental em 4 ondas.
- Critérios de aceitação: cada onda gera valor de negócio testável em produção.
- Erros comuns: tentar fiscal completo antes de fluxo financeiro mínimo validado.
- Exemplos:
  1. Semana 1-2: base técnica (tenant, auth, rls, seed, health).
  2. Semana 3-4: financeiro + vendas + estoque mínimo.
  3. Semana 5-6: PIX Mercado Pago + webhook + conciliação.
  4. Semana 7-8: fiscal (CBS/IBS), WhatsApp e observabilidade.

## 7. Funcionalidades
- Como funciona: módulos independentes com contratos simples e APIs REST em `/api/v1`.
- Critérios de aceitação: todas as operações críticas validam tenant, role e payload (Zod).
- Erros comuns: regras de negócio espalhadas em routes sem camada de módulo.
- Exemplos:
  - Dashboard semáforo.
  - Cadastros (clientes).
  - Financeiro (receitas/despesas).
  - Vendas e baixa de estoque.
  - PIX (charge + webhook).
  - Fiscal (NFE/NFSE/NFCE com CBS/IBS).
  - WhatsApp transacional.

## 8. Pilha tecnológica
- Como funciona: stack única full TypeScript para reduzir custo cognitivo do time.
- Critérios de aceitação: compatibilidade com Next.js 15, Prisma 6, Supabase Postgres 16 e deploy Vercel.
- Erros comuns: adicionar dependências redundantes que aumentam build cold-start.
- Exemplos:

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 15 App Router + Tailwind 4 + shadcn/ui |
| Backend | Route Handlers Next.js + TypeScript |
| Banco | PostgreSQL 16 (Supabase) + Prisma 6 |
| Auth | NextAuth v5 (credentials starter) |
| Testes | Vitest + Playwright |
| Observabilidade | Sentry (env preparada) + audit log |

## 9. Arquitetura
- Como funciona: monólito modular (DDD leve) com pastas por responsabilidade.
- Critérios de aceitação: `tenantId` em entidades de domínio e enforcement em todos endpoints.
- Erros comuns: acoplamento entre integrações e UI; bypass de autorização no módulo.
- Exemplos:

```text
src/
  app/
    (dashboard)/...
    api/v1/...
  core/
    auth/
    tenant/
    security/
    validation/
    observability/
  modules/
    dashboard/
    cadastros/
    financeiro/
    vendas/
    pix/
    fiscal/
    estoque/
    whatsapp/
    notificacoes/
    configuracoes/
  integrations/
    mercado-pago/
    whatsapp-business/
    focus-nfe/
  lib/
prisma/schema.prisma
docs/
```

```ts
// middleware.ts
import { withTenantContext } from "@/core/tenant/middleware";
export default withTenantContext;
```

## 10. Pré-requisitos
- Como funciona: ambiente local mínimo para rodar app + banco.
- Critérios de aceitação: comando de instalação e migração finaliza sem erro.
- Erros comuns: esquecer `DATABASE_URL` e `NEXTAUTH_SECRET`.
- Exemplos:
  - Node 20+
  - pnpm 10+
  - PostgreSQL 16 (local ou Supabase)

## 11. Instalação local
- Como funciona: setup em 7 passos.
- Critérios de aceitação: login demo funcional e `GET /api/v1/health` retornando `ok`.
- Erros comuns: não executar `prisma:generate` antes de migrar.
- Exemplos:

```bash
pnpm install
copy .env.example .env
pnpm prisma:generate
pnpm prisma:migrate
pnpm db:seed
pnpm dev
```

## 12. Variáveis ​​de ambiente
- Como funciona: centralizadas em `src/lib/env.ts` com validação Zod.
- Critérios de aceitação: app falha cedo quando env crítica está ausente.
- Erros comuns: usar tokens reais em ambiente de dev compartilhado.
- Exemplos:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/erpsb"
NEXTAUTH_SECRET="change-me"
NEXTAUTH_URL="http://127.0.0.1:3000"
MERCADO_PAGO_ACCESS_TOKEN=""
MERCADO_PAGO_WEBHOOK_SECRET=""
WHATSAPP_TOKEN=""
FOCUS_NFE_TOKEN=""
DEFAULT_TENANT_SLUG="demo"
```

## 13. Rodando o projeto
- Como funciona: `pnpm dev` sobe app web + APIs no mesmo processo.
- Critérios de aceitação: dashboard acessível e endpoints respondendo.
- Erros comuns: conflito de porta 3000 e cache antigo do Prisma Client.
- Exemplos:

```bash
pnpm dev
# http://127.0.0.1:3000/dashboard
```

## 14. Banco de dados
- Como funciona: modelo multi-tenant em Prisma + políticas SQL de RLS no Supabase.
- Critérios de aceitação: consultas de tenant A nunca retornam dados de tenant B.
- Erros comuns: esquecer índice composto (`tenantId`, chave funcional) e unique tenant-aware.
- Exemplos:

```prisma
model FinancialTransaction {
  id            String          @id @default(cuid())
  tenantId      String
  kind          TransactionKind
  amountInCents Int
  tenant        Tenant          @relation(fields: [tenantId], references: [id])
  @@index([tenantId, kind, dueDate])
}
```

```sql
alter table "FinancialTransaction" enable row level security;
create policy tenant_isolation_transaction on "FinancialTransaction"
  using ("tenantId" = current_setting('request.jwt.claim.tenant_id', true));
```

## 15. Testes
- Como funciona: unitários para regras críticas e e2e para smoke.
- Critérios de aceitação: RBAC e rate-limit cobertos; endpoint health validado em e2e.
- Erros comuns: depender só de e2e sem cobertura de regra de domínio.
- Exemplos:

```bash
pnpm test:unit
pnpm test:e2e
```

## 16. Implantação em produção (Vercel)
- Como funciona: deploy da branch principal com envs de produção configuradas.
- Critérios de aceitação: build sem erro, migração executada e health verde.
- Erros comuns: não separar env de preview/prod e esquecer webhook URL pública.
- Exemplos:
  1. Conectar repo na Vercel.
  2. Configurar env vars.
  3. Rodar `pnpm prisma:deploy` no pipeline.
  4. Registrar webhook Mercado Pago e WhatsApp.

## 17. Estrutura de massas
- Como funciona: `prisma/seed.ts` cria tenant demo, owner e settings iniciais.
- Critérios de aceitação: login demo (`owner@demo.local / 123456`) e tenant ativo.
- Erros comuns: seed sem idempotência e dados sem `tenantId`.
- Exemplos:

```ts
await prisma.membership.upsert({
  where: { tenantId_userId: { tenantId: tenant.id, userId: user.id } },
  update: { role: "owner" },
  create: { tenantId: tenant.id, userId: user.id, role: "owner" }
});
```

## 18. Módulos
- Como funciona: cada módulo possui service próprio consumido por API routes.
- Critérios de aceitação: módulo executa sem conhecer detalhes de framework.
- Erros comuns: acessar integração externa direto na UI.
- Exemplos:

| Módulo | Service | Endpoints |
|---|---|---|
| Financeiro | `src/modules/financeiro/transaction.service.ts` | `GET/POST /api/v1/finance/transactions` |
| Vendas | `src/modules/vendas/order.service.ts` | `GET/POST /api/v1/sales/orders` |
| PIX | `src/modules/pix/pix.service.ts` | `POST /api/v1/pix/charge`, `POST /api/v1/pix/webhook` |
| Fiscal | `src/modules/fiscal/fiscal.service.ts` | `POST /api/v1/fiscal/invoices` |

## 19. API
- Como funciona: API REST versionada em `/api/v1`, com Zod + auth + tenant guard.
- Critérios de aceitação: respostas padronizadas, status code correto e auditoria para operações críticas.
- Erros comuns: aceitar webhook sem assinatura e sem limitador de taxa.
- Exemplos:

```http
POST /api/v1/finance/transactions
x-tenant-id: tnt_123
Content-Type: application/json

{
  "kind": "expense",
  "description": "Conta de luz",
  "amountInCents": 15990,
  "dueDate": "2026-02-20"
}
```

```json
{
  "data": {
    "id": "cm7...",
    "tenantId": "tnt_123",
    "kind": "expense",
    "amountInCents": 15990
  }
}
```

```http
POST /api/v1/pix/webhook
x-signature: <MERCADO_PAGO_WEBHOOK_SECRET>

{
  "tenantId": "tnt_123",
  "data": { "id": "123456" },
  "action": "payment.updated"
}
```

## 20. Ó e documentação
- Como funciona: operação com observabilidade mínima (health, audit log, tratamento de erro e docs versionadas).
- Critérios de aceitação: incidente rastreável por tenant, usuário e recurso alterado.
- Erros comuns: logs sem contexto de tenant e ausência de runbook.
- Exemplos:
  - `src/core/observability/audit-log.ts` para rastreio.
  - `docs/sql/rls.sql` para segurança de dados.
  - `README.md` para run local rápido.

## 21. Documentação por módulo
- Como funciona: cada módulo possui documento dedicado em `docs/modules`.
- Critérios de aceitação: conter fluxo, payload e regras de negócio.
- Erros comuns: documentação centralizada demais e não acionável.
- Exemplos:
  - `docs/modules/dashboard.md`
  - `docs/modules/financeiro.md`
  - `docs/modules/pix.md`
  - `docs/modules/fiscal.md`

## 22. Métricas de sucesso
- Como funciona: medir aquisição de valor, confiabilidade e desempenho.
- Critérios de aceitação:
  - Tempo para primeiro valor < 5 min.
  - Latência p95 da API < 200ms.
  - Disponibilidade >= 99,5%.
  - Conversão Free -> Pago >= 8% em 90 dias.
- Erros comuns: medir só receita sem medir ativação real.
- Exemplos:
  - Evento: `wizard_completed`.
  - Evento: `first_pix_paid`.
  - Evento: `first_fiscal_document_authorized`.

## 23. Licenciada
- Como funciona: distribuicao sob licenca proprietaria de uso pessoal particular, com restricao de uso comercial.
- Critérios de aceitação: arquivo `LICENSE` presente, formal e juridicamente claro para permissões e restrições.
- Erros comuns: uso comercial sem autorizacao expressa por escrito do titular.
- Exemplos:

```text
LICENCA DE USO PESSOAL PARTICULAR - VERSAO FORMAL
Titular: Marcelo Rayzen
```
