# WhatsApp

## Como funciona
Dispara templates via WhatsApp Business API e registra status de envio.

## Critérios de aceitação
- Mensagem persistida com `providerMessageId`.
- Falha da API externa com erro rastreável.

## Erros comuns
- Enviar texto livre sem template aprovado.
- Não salvar retorno do provider.

## Exemplos
`POST /api/v1/whatsapp/send`.
