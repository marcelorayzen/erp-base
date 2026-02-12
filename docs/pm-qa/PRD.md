# PRD - ERPsb MVP

## 1) Visao do produto
ERP mobile-first para PME brasileira com onboarding em 2 minutos, operacao diaria simplificada e compliance fiscal progressivo (CBS/IBS 2026-2033).

## 2) Problema
Empresas pequenas quebram por falta de visibilidade de caixa, vendas e obrigacoes fiscais. Solucoes atuais sao caras, lentas ou complexas.

## 3) Objetivos do MVP
- Reduzir tempo para primeiro valor para menos de 5 minutos.
- Habilitar cobranca PIX com conciliacao automatica.
- Dar visao de risco diario via dashboard semaforo.
- Garantir isolamento multi-tenant por linha.

## 4) Fora de escopo (MVP)
- Motor contabil completo.
- BI avancado com cubos analiticos.
- Marketplace de apps de terceiros.

## 5) Personas
- `MEI operador`: usa celular Android, precisa receber e controlar despesas.
- `Owner microempresa`: acompanha caixa e risco fiscal.
- `Admin interno`: configura usuarios, permissoes e integracoes.

## 6) Jornada principal
1. Usuario responde wizard (5 perguntas).
2. Sistema cria tenant e configuracoes iniciais.
3. Usuario cadastra cliente.
4. Usuario gera venda e cobranca PIX.
5. Webhook confirma pagamento.
6. Dashboard atualiza semaforo e fluxo.

## 7) Requisitos funcionais
- Dashboard com semaforo e cards de risco.
- Cadastros: clientes.
- Financeiro: receita/despesa, vencimento, pagamento.
- Vendas: pedido com baixa de estoque.
- PIX: charge + webhook + conciliacao.
- Fiscal: emissao com campos CBS/IBS.
- WhatsApp: envio de template.
- Configuracoes por tenant.

## 8) Requisitos nao funcionais
- Latencia p95 API < 200ms.
- Disponibilidade mensal >= 99.5%.
- Suporte 4G com UX responsiva.
- RLS ativo e validacao de tenant em todas as rotas.

## 9) KPIs de produto
| KPI | Meta | Janela |
|---|---:|---|
| Tempo para primeiro valor | < 5 min | semanal |
| Conclusao do wizard | >= 70% | semanal |
| Primeira cobranca PIX paga | >= 40% dos novos tenants | mensal |
| Erro 5xx em API | < 1% | diario |

## 10) Dependencias
- Mercado Pago (PIX e webhook).
- WhatsApp Business API.
- Focus NFe para fiscal.
- Supabase Postgres.

## 11) Riscos e mitigacao
| Risco | Impacto | Mitigacao |
|---|---|---|
| Webhook instavel | Alta | retry idempotente + auditoria |
| Mudanca fiscal | Alta | campos de coexistencia + feature flag |
| UX complexa | Media | testes de usabilidade no onboarding |

## 12) Criterio de release MVP
- Fluxo onboarding -> venda -> PIX -> conciliacao validado ponta a ponta.
- Sem quebra de isolamento tenant em testes de seguranca.
- Testes criticos aprovados (smoke + regressao P0/P1).

## Como funciona
Este PRD vira fonte unica de decisao para produto e engenharia.

## Criterios de aceitacao
- Cada funcionalidade do backlog referencia objetivo do PRD.
- Todo item tem KPI de sucesso associado.

## Erros comuns
- PRD com metas vagas sem numero.
- Misturar escopo MVP com roadmap de 12 meses.

## Exemplos
- Exemplo de decisao: recurso sem impacto em KPI nao entra no MVP.
