# Notificações

## Como funciona
Orquestra notificações internas e por WhatsApp com contexto por tenant.

## Critérios de aceitação
- Persistir canal e status de leitura.
- Priorizar alertas de risco (vencimento/estoque).

## Erros comuns
- Notificação sem destinatário e sem fallback.
- Não versionar templates.

## Exemplos
Service: `src/modules/notificacoes/notification.service.ts`.
