# Estoque

## Como funciona
Mantém saldo por SKU e alerta mínimo para impacto no semáforo.

## Critérios de aceitação
- Upsert por `(tenantId, sku)`.
- Consulta rápida de itens críticos.

## Erros comuns
- SKU sem unicidade por tenant.
- Movimentação sem motivo.

## Exemplos
`GET/POST /api/v1/stock/items`.
