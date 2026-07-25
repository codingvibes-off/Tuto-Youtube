# Projet de démo — "Le guide ultime Playwright 2026"

Projet minimal pour le bloc [14:00–19:00] du script : un agent qui répare un test cassé, en direct.

## Installation

```bash
npm install
npx playwright install --with-deps
```

## Vérifier que ça tourne (avant l'enregistrement)

```bash
npm test
```

Le test doit passer en vert sur `tests/cart.spec.ts`. Si ce n'est pas le cas, saucedemo.com
a peut-être changé son markup — vérifie le sélecteur `Add to cart` avant de filmer.

## Déroulé de la démo (à l'écran)

1. **Montrer le test qui passe** — `npm test`, tout est vert.
2. **Casser le test en direct** — remplace le contenu de `tests/cart.spec.ts` par celui de
   `tests/cart.broken.example.ts.txt` (sélecteur `'Add to cart'` → `'Ajouter au panier'`,
   qui n'existe pas sur la page).
3. **Relancer, montrer l'échec** — `npm test`, le test rouge, l'erreur de sélecteur introuvable.
4. **Connecter l'agent** :
   ```bash
   npx playwright bind --port 9222
   ```
   puis donner à l'agent (Claude Code + serveur MCP Playwright) accès à ce port et au repo.
5. **Laisser l'agent explorer et corriger** — il doit lire le DOM via le snapshot ARIA,
   repérer le bon sélecteur, et proposer un correctif dans `tests/cart.spec.ts`.
6. **Relancer, montrer le vert** — `npm test`, retour au succès, sans intervention manuelle
   sur le sélecteur.

## Filet de sécurité

Si l'agent ne trouve pas le bon sélecteur du premier coup (ça arrive), prévoir un deuxième
essai en coupant au montage — mentionné dans les notes de production du script principal.

## Démo bonus — `await using` (preuve à l'écran)

Pour illustrer concrètement la fuite de contexts vs le nettoyage automatique :

```bash
npm run demo:await-using
```

Le terminal affiche la comparaison brute :

```
--- Ancienne méthode ---
Contexts encore ouverts (ancienne méthode) : 5

--- await using ---
Contexts encore ouverts (await using) : 0
```

Les deux runners (`tests/await-using-demo/leaky-runner.ts` et `clean-runner.ts`) exécutent
exactement le même scénario — un test qui plante 5 fois de suite avant d'arriver au
`.close()`. Seule différence : l'un utilise `await using`, l'autre non.

**Prérequis :** Node 20.11+ (ou 22+) et TypeScript 5.2+ pour le support d'`await using`
(Explicit Resource Management). Si `npm run demo:await-using` plante avec une erreur de
syntaxe sur `using`, vérifie ta version de Node avec `node -v` avant de filmer.
