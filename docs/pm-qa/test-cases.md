# Casos de teste (QA)

## Convencao
- `P`: prioridade do caso (`P0`, `P1`, `P2`).
- `AUTO`: candidato a automacao (`SIM`, `NAO`).

| ID | P | Modulo | Cenário | Pre-condicao | Passos | Resultado esperado | AUTO |
|---|---|---|---|---|---|---|---|
| TC-001 | P0 | Auth/Tenant | Acesso sem sessao | sem login | chamar `GET /api/v1/finance/transactions` | 401 `UNAUTHENTICATED` | SIM |
| TC-002 | P0 | Tenant | Isolamento entre tenants | 2 tenants com dados distintos | chamar listagem com tenant A | nenhum dado do tenant B | SIM |
| TC-003 | P0 | RBAC | Operador em rota admin | usuario operador | `POST /api/v1/fiscal/invoices` | 403 `ROLE_FORBIDDEN` | SIM |
| TC-004 | P0 | Cadastros | Criar cliente valido | sessao + tenant | `POST /api/v1/cadastros/customers` | 201 com `tenantId` correto | SIM |
| TC-005 | P0 | Financeiro | Criar despesa | sessao + tenant | `POST /api/v1/finance/transactions` | transacao persistida | SIM |
| TC-006 | P0 | Vendas | Pedido baixa estoque | cliente e item existentes | `POST /api/v1/sales/orders` | pedido criado + quantidade decrementada | SIM |
| TC-007 | P0 | PIX | Criar charge | cliente existente | `POST /api/v1/pix/charge` | status `PENDING`, qr salvo | SIM |
| TC-008 | P0 | PIX | Webhook sem assinatura | payload valido sem header | `POST /api/v1/pix/webhook` | 401 `INVALID_SIGNATURE` | SIM |
| TC-009 | P0 | PIX | Webhook valido concilia | assinatura correta | `POST /api/v1/pix/webhook` | charge `PAID` | SIM |
| TC-010 | P1 | Fiscal | Documento com ano invalido | sessao admin | ano 2035 | 400 validacao | SIM |
| TC-011 | P1 | WhatsApp | Envio template | token provider valido | `POST /api/v1/whatsapp/send` | mensagem `SENT` persistida | NAO |
| TC-012 | P1 | Config | Atualizar dados empresa | sessao admin | `PUT /api/v1/config/me` | dados atualizados | SIM |
| TC-013 | P1 | Dashboard | Resumo semaforo | dados financeiros e estoque | `GET /api/v1/dashboard/summary` | semaforo coerente com risco | SIM |
| TC-014 | P2 | UI Mobile | Onboarding em viewport pequeno | tela 360x800 | preencher 5 perguntas | fluxo conclui sem quebra visual | NAO |
| TC-015 | P2 | Rate limit | Burst webhook | assinatura valida | 70 chamadas em 1 min | parte das chamadas retorna 429 | SIM |

## Como funciona
Este arquivo e base para execucao manual e para priorizar automacao.

## Criterios de aceitacao
- Todo fluxo P0 possui ao menos 1 caso de erro e 1 de sucesso.
- Casos possuem resultado esperado objetivo.

## Erros comuns
- Caso sem pre-condicao.
- Resultado esperado vago (ex: "deve funcionar").

## Exemplos
- TC-008 valida seguranca de webhook.
