# Plano de testes QA

## 1) Objetivo
Garantir que fluxo critico de operacao PME (onboarding -> venda -> PIX -> conciliacao) esta estavel, seguro e isolado por tenant.

## 2) Escopo
- Em escopo: API v1, fluxos principais UI, seguranca tenant/RBAC, integracoes mockadas.
- Fora de escopo: carga massiva e testes exploratorios de longo prazo.

## 3) Estrategia
- `Smoke`: validar operacao minima apos deploy.
- `Regressao`: validar modulos P0/P1 antes de release.
- `Seguranca funcional`: tenant isolation, role, assinatura webhook, rate limit.
- `Compatibilidade`: mobile viewport (Android foco).

## 4) Ambientes
| Ambiente | Uso | Dados |
|---|---|---|
| Local | dev + debug | seed demo |
| Homolog | QA integrado | massa controlada |
| Prod | monitoramento | dados reais |

## 5) Tipos de teste
- Unitario: regras puras (`rbac`, `rate-limit`).
- API: contrato, status code, erros.
- E2E: jornada de negocio.
- Manual UAT: validacao com perfil de usuario.

## 6) Criterios de entrada
- Historia com criterio de aceite definido.
- Build sem erro de typecheck.
- Ambientes e massa disponiveis.

## 7) Criterios de saida
- Nenhum bug `Sev1` aberto.
- Bugs `Sev2` com workaround aprovado pelo PM.
- Checklist de go/no-go aprovado.

## 8) Severidade de defeitos
| Severidade | Definicao | SLA |
|---|---|---|
| Sev1 | quebra fluxo principal ou risco de dados | hotfix imediato |
| Sev2 | impacto alto com workaround | corrigir antes release final |
| Sev3 | impacto moderado | proxima sprint |
| Sev4 | cosmetico | backlog |

## 9) Como funciona
QA executa smoke diario e regressao por release candidate.

## 10) Criterios de aceitacao
- Plano cobre todos os modulos P0/P1.
- Existe criterio objetivo de entrada e saida.

## 11) Erros comuns
- Testar so caminho feliz.
- Ignorar cenarios de autorizacao.

## 12) Exemplos
- Exemplo de regressao P0: webhook PIX invalido deve retornar 401.
