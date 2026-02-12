# Vendas

## Como funciona
Cria pedidos e baixa estoque no mesmo fluxo transacional.

## Critérios de aceitação
- Pedido grava itens.
- Estoque decrementa e gera movimentação OUT.

## Erros comuns
- Atualizar estoque fora de transação.
- Não validar item vazio no pedido.

## Exemplos
`POST /api/v1/sales/orders`.
