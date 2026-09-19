# Environnements — Voyago

Index des environnements générés/validés par la Skill `test-environment-generation`.
Rapport complet de validation : [`environment-report.md`](../environment-report.md) (racine du repo).

Principe appliqué : **réutiliser l'existant plutôt que dupliquer**. Ce repo
avait déjà un `docker-compose.yml`, un `playwright.config.ts` et une config
Jest fonctionnels — ces dossiers ne recréent donc pas de nouvelle
configuration, ils **documentent et pointent vers** la configuration réelle,
avec pour chacun : objectif, démarrage/arrêt, variables, base de données,
seed, tests, dépannage, et les liens à visiter.

| Environnement | Dossier | Nécessite Docker ? | Reste actif après ? |
|---|---|---|---|
| [TEST](./test/README.md) | `backend/` (Jest) | Non | Non — s'exécute et s'arrête |
| [E2E](./e2e/README.md) | `e2e/` + `playwright.config.ts` | Non | Non — démarré/arrêté par Playwright |
| [STAGING](./staging/README.md) | `docker-compose.yml` (racine) | Oui | Oui — jusqu'à `docker compose down` |

PRODUCTION et PRÉPRODUCTION n'existent pas dans ce repository (aucune infra
réelle) — la Skill ne les crée jamais (cf. règle *« ne jamais utiliser la
production »* dans `.claude/skills/test-environment-generation/SKILL.md`).
