# Priorisation des tests — Réservation d'un voyage

**Objectif :** classer les tests de [test-case.md](test-case.md) par risque et impact métier afin de guider l'ordre d'exécution (campagne manuelle, automatisation, régression).

**Légende priorité :**
- `P1` — Bloquant, à exécuter en premier (fumée / smoke) : risque élevé et impact métier élevé
- `P2` — Important, à couvrir après les P1 : risque ou impact modéré
- `P3` — Secondaire, à couvrir si le temps le permet : risque et impact faibles

---

## Matrice de priorisation

| Test | Cas de test associés | Risque | Impact métier | Priorité |
|---|---|---|---|---|
| Paiement valide | TC-13, TC-15 | Élevé | Élevé | P1 |
| Réservation | TC-13, TC-14, TC-19 | Élevé | Élevé | P1 |
| Recherche | TC-01, TC-03, TC-04 | Élevé | Élevé | P1 |
| Confirmation | TC-13, TC-20 | Élevé | Élevé | P1 |
| Session expirée | TC-17 | Moyen | Élevé | P2 |
| Modification voyageurs | TC-VOY-01 à TC-VOY-05 | Moyen | Moyen | P2 |
| Filtre secondaire | TC-10 | Faible | Faible | P3 |

---

## Ordre d'exécution recommandé

1. **P1** — Recherche, Réservation, Paiement valide, Confirmation
2. **P2** — Session expirée, Modification voyageurs
3. **P3** — Filtre secondaire

## Notes

- Les tests P1 couvrent le chemin critique (recherche → sélection → paiement → confirmation) : toute régression ici bloque la mise en production.
- Les tests P2 concernent des cas limites fréquents mais non bloquants pour le parcours principal.
- Les tests P3 portent sur des fonctionnalités de confort (tri/filtres) sans impact direct sur la transaction.
