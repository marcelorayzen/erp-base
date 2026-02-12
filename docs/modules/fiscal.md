# Fiscal

## Como funciona
Emite NFE/NFSE/NFCE com campos CBS/IBS e coexistência tributária 2026-2033.

## Critérios de aceitação
- Persistir `cbsRate`, `ibsRate`, `legacyTaxRate`, `coexistenceYear`.
- Integrar com Focus NFe para emissão.

## Erros comuns
- Perder rastreabilidade entre documento interno e número externo.
- Não suportar regime de transição.

## Exemplos
`POST /api/v1/fiscal/invoices`.
