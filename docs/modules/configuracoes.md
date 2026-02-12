# Configurações

## Como funciona
Armazena dados da empresa, regime fiscal e conclusão de onboarding.

## Critérios de aceitação
- `upsert` idempotente por tenant.
- API `GET/PUT /api/v1/config/me` com RBAC.

## Erros comuns
- Duplicar configuração da empresa.
- Misturar configuração global e por tenant.

## Exemplos
Service: `src/modules/configuracoes/settings.service.ts`.
