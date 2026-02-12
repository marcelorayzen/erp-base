# PIX

## Como funciona
Gera cobrança via Mercado Pago, armazena QR Code e concilia por webhook assinado.

## Critérios de aceitação
- Charge criada com externalId único por tenant.
- Webhook com assinatura e rate limit.

## Erros comuns
- Confiar em webhook sem validação.
- Não registrar evento bruto para auditoria.

## Exemplos
`POST /api/v1/pix/charge` e `POST /api/v1/pix/webhook`.
