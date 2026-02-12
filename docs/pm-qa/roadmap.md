# Roadmap PM/Eng - 8 semanas

## Visao geral
Roadmap orientado a valor: primeiro fluxo de caixa e recebimento, depois escala fiscal.

## Plano por sprint
| Sprint | Objetivo | Entregas | Criterio de pronto |
|---|---|---|---|
| S1 | Fundacao | auth, tenant context, schema, seed, health | login e health funcionando |
| S2 | Operacao basica | cadastros, financeiro, dashboard semaforo | fluxo caixa basico completo |
| S3 | Comercial | vendas + baixa estoque | pedido com movimento de estoque |
| S4 | PIX core | criar charge, salvar QR, webhook assinado | pagamento conciliado |
| S5 | Fiscal base | emissao fiscal com campos CBS/IBS | documento criado com trilha auditavel |
| S6 | WhatsApp e alertas | template send e notificacoes | envio com status persistido |
| S7 | Qualidade | regressao, observabilidade, hardening | P0/P1 sem blockers |
| S8 | Go-live | UAT, runbook, checklist release | go/no-go aprovado |

## Marcos
- M1 (fim S2): usuario em operacao diaria.
- M2 (fim S4): recebimento PIX automatizado.
- M3 (fim S6): fluxo fiscal + comunicacao completa.
- M4 (fim S8): pronto para producao controlada.

## Como funciona
Cada sprint tem escopo fechado, criterio de pronto e dono de entrega.

## Criterios de aceitacao
- Nenhuma sprint fecha sem demo de fluxo ponta a ponta.
- Blocker de seguranca ou isolamento tenant interrompe release.

## Erros comuns
- Trocar prioridades no meio da sprint sem corte formal.
- Fechar sprint com historias parcialmente prontas.

## Exemplos
- Exemplo de corte: mover relatorio avancado de S3 para backlog futuro para proteger S4 PIX.
