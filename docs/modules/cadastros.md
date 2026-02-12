# Cadastros

## Como funciona
Centraliza cadastro de clientes para uso em financeiro, vendas, PIX e fiscal.

## Critérios de aceitação
- CRUD de clientes com `tenantId` obrigatório.
- Busca rápida por nome/documento.

## Erros comuns
- Duplicar cliente por falta de validação mínima.
- Não reaproveitar cadastro entre módulos.

## Exemplos
Service: `src/modules/cadastros/customer.service.ts`.
