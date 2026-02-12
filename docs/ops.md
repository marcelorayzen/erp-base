# Operação e documentação

## Como funciona
- Healthcheck em `/api/v1/health`.
- Auditoria em `AuditLog` por tenant/usuário/recurso.
- Runbook mínimo no README + SQL RLS em `docs/sql/rls.sql`.

## Critérios de aceitação
- Time consegue diagnosticar erro por tenant em menos de 10 min.
- Webhook PIX possui rastreio com payload persistido.

## Erros comuns
- Log sem `tenantId`.
- Falta de monitoramento de latência por endpoint.

## Exemplos
- Alertar quando `/api/v1/health` ficar 2min indisponível.
- Criar dashboard de p95 por rota crítica (PIX/fiscal).
