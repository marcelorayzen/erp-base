# PM/QA Docs Pack

Este pacote documenta produto, qualidade e operacao para o ERPsb.

## Ordem recomendada
1. `docs/pm-qa/PRD.md`
2. `docs/pm-qa/roadmap.md`
3. `docs/pm-qa/backlog.md`
4. `docs/pm-qa/acceptance-criteria.md`
5. `docs/pm-qa/qa-test-plan.md`
6. `docs/pm-qa/test-cases.md`
7. `docs/pm-qa/uat-checklist.md`
8. `docs/pm-qa/release-go-no-go.md`
9. `docs/pm-qa/bug-triage-policy.md`

## Como funciona
- PRD define o que construir e por que.
- Roadmap e backlog traduzem estrategia em execucao.
- QA docs definem como validar antes de subir para producao.

## Criterios de aceitacao
- Time PM/Eng/QA consegue planejar sprint sem reuniao adicional.
- Time QA consegue executar smoke, regressao e UAT usando apenas este pacote.

## Erros comuns
- Escrever historias sem criterio de aceite testavel.
- Liberar feature sem checklist de go/no-go.

## Exemplos
- Sprint planning: use `backlog.md` + `acceptance-criteria.md`.
- Release day: use `release-go-no-go.md` + `uat-checklist.md`.
