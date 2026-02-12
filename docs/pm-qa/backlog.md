# Backlog priorizado (MVP)

## Escala de prioridade
- `P0`: bloqueia valor principal ou seguranca.
- `P1`: alta relevancia para uso diario.
- `P2`: melhora importante, nao bloqueia go-live.

## Itens
| ID | Prioridade | Historia | Estimativa | Dependencia |
|---|---|---|---:|---|
| US-001 | P0 | Como owner, quero concluir onboarding em 2 min para comecar a operar rapido | 5 | schema tenant |
| US-002 | P0 | Como operador, quero cadastrar cliente para vender e cobrar | 3 | US-001 |
| US-003 | P0 | Como operador, quero registrar despesas para controlar caixa | 5 | US-001 |
| US-004 | P0 | Como operador, quero criar pedido e baixar estoque | 8 | US-002 |
| US-005 | P0 | Como operador, quero emitir cobranca PIX com QR code | 8 | US-004 |
| US-006 | P0 | Como sistema, quero conciliar webhook PIX automaticamente | 8 | US-005 |
| US-007 | P0 | Como admin, quero isolamento tenant em toda rota/API | 8 | auth + middleware |
| US-008 | P1 | Como owner, quero dashboard semaforo para ver risco diario | 5 | US-003, US-004 |
| US-009 | P1 | Como admin, quero RBAC owner/admin/operador | 5 | US-007 |
| US-010 | P1 | Como owner, quero emitir documento fiscal com CBS/IBS | 8 | US-002 |
| US-011 | P1 | Como operador, quero enviar template por WhatsApp | 5 | US-002 |
| US-012 | P2 | Como owner, quero historico de notificacoes por tenant | 3 | US-008 |

## Definicao de pronto (DoD)
- Codigo em camada correta (`core`, `modules`, `integrations`, `app`).
- Validacao Zod e autorizacao tenant aplicadas.
- Log auditavel para acao sensivel.
- Teste unitario (quando aplicavel) e teste manual documentado.

## Como funciona
Backlog guia planejamento semanal e corte de escopo.

## Criterios de aceitacao
- Toda historia tem prioridade, estimativa e dependencia.
- Historia so vai para `Done` se cumprir DoD.

## Erros comuns
- Historia sem criterio verificavel.
- Itens P2 entrando antes de P0/P1.

## Exemplos
- US-006 so fecha com webhook validando assinatura e rate limit.
