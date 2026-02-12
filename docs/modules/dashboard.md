# Dashboard

## Como funciona
Consolida indicadores críticos (contas vencidas, vendas abertas e estoque baixo) com semáforo verde/amarelo/vermelho.

## Critérios de aceitação
- Atualizar indicadores por tenant.
- Mostrar status em menos de 1s no carregamento da página.

## Erros comuns
- Calcular métricas sem filtro de tenant.
- Exibir números sem janela temporal definida.

## Exemplos
Endpoint sugerido: `GET /api/v1/dashboard/summary`.
