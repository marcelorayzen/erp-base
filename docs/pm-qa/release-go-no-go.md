# Release Go/No-Go Checklist

## 1) Tecnico
- [ ] `pnpm lint` sem erro bloqueante.
- [ ] `pnpm exec tsc --noEmit` verde.
- [ ] `pnpm prisma:generate` verde.
- [ ] Migrations revisadas e plano de rollback pronto.

## 2) Produto
- [ ] Historias P0 do ciclo marcadas como `Done`.
- [ ] Criterios de aceite aprovados.
- [ ] Mudancas de escopo documentadas.

## 3) QA
- [ ] Smoke executado em homologacao.
- [ ] Regressao P0/P1 executada.
- [ ] UAT aprovada (`docs/pm-qa/uat-checklist.md`).

## 4) Seguranca
- [ ] Validador de tenant ativo em todas as rotas de dominio.
- [ ] RBAC testado.
- [ ] Rate limit ativo em webhook.
- [ ] Audit log gerando eventos criticos.

## 5) Operacao
- [ ] Monitoramento de health ativo.
- [ ] Alertas de erro 5xx configurados.
- [ ] Responsavel on-call definido para janela de release.

## 6) Rollback
- [ ] Procedimento documentado.
- [ ] Janela de reversao definida.
- [ ] Banco com backup/snapshot recente.

## Decisao final
- Status: `GO` / `NO-GO`
- Data/hora:
- Responsavel PM:
- Responsavel Tech Lead:
- Responsavel QA:

## Como funciona
Checklist e preenchido em war room antes do deploy.

## Criterios de aceitacao
- Todos itens obrigatorios marcados.
- Decisao assinada por PM + QA + Tech Lead.

## Erros comuns
- Liberar com item critico pendente.
- Nao validar plano de rollback.

## Exemplos
- Se webhook PIX falhar em homologacao, decisao deve ser `NO-GO`.
