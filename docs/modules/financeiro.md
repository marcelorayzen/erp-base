# Financeiro

## Como funciona
Registra receitas/despesas e organiza fluxo de caixa por vencimento e pagamento.

## Critérios de aceitação
- Criar transação com Zod.
- Listagem ordenada por criação e filtros de status.

## Erros comuns
- Ignorar timezone em `dueDate`.
- Misturar valor monetário em decimal de ponto flutuante.

## Exemplos
`POST /api/v1/finance/transactions` com `amountInCents`.
