# Criterios de aceite (produto + QA)

## Regras globais
1. Toda rota de dominio exige tenant valido.
2. Toda escrita sensivel gera audit log.
3. Payload invalido retorna erro 400 padrao.
4. Usuario sem papel necessario recebe 403.

## Criterios por fluxo

### Onboarding
- Dado usuario novo, quando responde 5 perguntas, entao configuracao da empresa e criada/atualizada.
- Nao deve exigir mais de 5 campos obrigatorios.

### Cadastro de cliente
- Dado tenant autenticado, quando envia `name`, entao cliente e criado com `tenantId`.
- Quando payload invalido, retorna 400 com `issues`.

### Financeiro
- Dado transacao valida, quando cria despesa/receita, entao item aparece em listagem do tenant.
- Nao pode listar dados de outro tenant.

### Vendas + estoque
- Dado pedido com itens validos, quando cria pedido, entao estoque decrementa e movimento OUT e registrado.
- Se item nao existir no tenant, nao deve atualizar estoque.

### PIX
- Dado charge valida, quando cria cobranca, entao persiste `externalId`, `qrCode` e status `PENDING`.
- Dado webhook com assinatura invalida, entao retorna 401.
- Dado webhook valido, entao charge muda para `PAID`.

### Fiscal
- Dado documento fiscal valido, quando cria emissao, entao salva `cbsRate`, `ibsRate`, `coexistenceYear`.
- Ano fora de 2026-2033 deve falhar validacao.

### WhatsApp
- Dado template valido, quando envia mensagem, entao persiste status `SENT` e id do provedor.

## Como funciona
QA usa estes criterios para aprovar historia em homologacao.

## Criterios de aceitacao
- Cada criterio e verificavel por API ou UI.
- Critico P0 tem cobertura de teste manual e automatizada quando possivel.

## Erros comuns
- Criterio subjetivo (ex: "ficou facil de usar").
- Nao definir comportamento de erro.

## Exemplos
- Exemplo objetivo: "retorna 403 quando role operador tenta endpoint admin".
