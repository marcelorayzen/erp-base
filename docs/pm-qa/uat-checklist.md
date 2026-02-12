# UAT Checklist

## Dados da rodada
- Data:
- Ambiente:
- Build/commit:
- Responsavel PM:
- Responsavel QA:

## Fluxo de validacao (usuario final)
| Item | Resultado (OK/NOK) | Evidencia | Observacao |
|---|---|---|---|
| Wizard 5 perguntas concluido |  |  |  |
| Dashboard abre no mobile sem quebra |  |  |  |
| Cliente criado com sucesso |  |  |  |
| Despesa criada e listada |  |  |  |
| Pedido criado com baixa de estoque |  |  |  |
| Cobranca PIX gerada |  |  |  |
| Webhook atualiza status para pago |  |  |  |
| Documento fiscal criado com CBS/IBS |  |  |  |
| Mensagem WhatsApp enviada |  |  |  |
| Configuracao da empresa atualizada |  |  |  |

## Validacoes de seguranca
| Item | Resultado (OK/NOK) | Evidencia |
|---|---|---|
| Usuario sem sessao recebe 401 |  |  |
| Role sem permissao recebe 403 |  |  |
| Tenant nao acessa dados de outro tenant |  |  |
| Webhook sem assinatura e rejeitado |  |  |

## Go-live recommendation
- [ ] Aprovado para producao
- [ ] Aprovado com restricoes
- [ ] Reprovado (replanejar release)

## Como funciona
PM e QA executam juntos em homologacao e assinam decisao final.

## Criterios de aceitacao
- 100% dos itens P0 em `OK`.
- Sem bug `Sev1` aberto.

## Erros comuns
- Fechar UAT sem evidencia.
- Marcar OK sem reproduzir em mobile.

## Exemplos
- Evidencia valida: print de tela + request/response do endpoint.
