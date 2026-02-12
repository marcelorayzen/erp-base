# Bug Triage Policy

## Objetivo
Padronizar classificacao, prioridade e fluxo de correcao de bugs.

## Classificacao
| Severidade | Definicao |
|---|---|
| Sev1 | Interrompe fluxo critico, perda de dados ou falha de seguranca |
| Sev2 | Impacto alto com workaround |
| Sev3 | Impacto moderado sem bloquear operacao principal |
| Sev4 | Cosmetic/baixa relevancia |

## Prioridade
| Prioridade | Regra |
|---|---|
| P0 | Corrigir imediatamente (hotfix) |
| P1 | Corrigir antes da proxima release |
| P2 | Corrigir na proxima sprint |
| P3 | Backlog de melhoria |

## Fluxo
1. QA registra bug com evidencia (passos, esperado, atual, logs).
2. PM define impacto de negocio e prioridade.
3. Tech Lead define dono tecnico e prazo.
4. QA valida fix e fecha ticket.

## SLA sugerido
- Sev1/P0: 4h para mitigacao.
- Sev2/P1: 1 dia util.
- Sev3/P2: 1 sprint.

## Campos obrigatorios no ticket
- Ambiente
- Tenant afetado
- Usuario/role
- Endpoint/rota
- Evidencia (print, payload, resposta)

## Como funciona
Triage diario rapido (15 min) com PM, QA e Tech Lead.

## Criterios de aceitacao
- Nenhum bug sem severidade/prioridade definida.
- Todo bug fechado possui evidencias de reteste.

## Erros comuns
- Abrir bug sem passos para reproducao.
- Misturar bug com melhoria no mesmo ticket.

## Exemplos
- Exemplo Sev1: endpoint retorna dados de outro tenant.
