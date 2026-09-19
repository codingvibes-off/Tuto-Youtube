# Bugs connus — Voyago (terrain de test Coding Vibes)

Ce fichier documente les bugs et cas limites **intégrés volontairement** dans
l'application, pour préparer les épisodes de la série (détection manuelle,
tests aux valeurs limites, cas négatifs, puis correction par un agent IA).

Ne pas corriger ces points sans réfléchir à l'épisode qui doit les mettre en
scène — certains sont réutilisés sur plusieurs niveaux (détection manuelle,
automatisation Playwright, puis fix par agent).

---

## BUG_CONNU #1 — Règle de mot de passe incohérente front/back

**Catégorie :** validation de formulaire incohérente.

**Où :**
- Front : [`frontend/src/app/features/auth/register.component.ts`](frontend/src/app/features/auth/register.component.ts) — getter `passwordValid` (n'exige que 6 caractères) et le texte d'aide dans [`register.component.html`](frontend/src/app/features/auth/register.component.html) ("6 caractères minimum").
- Back : [`backend/src/auth/dto/register.dto.ts`](backend/src/auth/dto/register.dto.ts) — `RegisterDto.password` exige `@MinLength(8)` **et** `@Matches(/\d/)` (au moins un chiffre).

**Comment le déclencher :** à l'inscription, saisir un mot de passe de 6-7
caractères sans chiffre (ex. `abcdef`). Le champ est accepté côté front (pas
d'erreur, bouton actif), la requête part vers l'API, qui répond `400` avec
un message précis (`"Le mot de passe doit contenir au moins 8
caractères."` / `"...au moins un chiffre."`).

**Le vrai piège :** le front **ignore** ce message et affiche toujours un
texte générique ("Erreur lors de l'inscription. Veuillez réessayer.") — voir
le bloc `error:` dans `register.component.ts`. L'utilisateur ne comprend
donc pas pourquoi son inscription échoue.

**Contraste volontaire :** [`login.component.ts`](frontend/src/app/features/auth/login.component.ts) fait l'inverse — il affiche le vrai message renvoyé par l'API (compte inexistant vs mot de passe incorrect). Comparer les deux est un bon exercice.

---

## BUG_CONNU #2 — Valeur limite : voyageurs à 0 / dates incohérentes

**Statut :** volet "voyageurs" corrigé (règle métier 1-9 voyageurs par
recherche). Le volet "dates incohérentes" reste ouvert, voir plus bas.

**Catégorie :** valeur limite mal gérée.

**Correction appliquée (voyageurs) :**
- Front : [`frontend/src/app/features/home/home.component.ts`](frontend/src/app/features/home/home.component.ts) — le compteur `travelers` est un champ éditable (`data-testid="travelers-value"`, saisie libre au clavier en plus des boutons `-`/`+`) ; `travelersInvalid` détecte une valeur hors `[MIN_TRAVELERS=1, MAX_TRAVELERS=9]` et désactive alors le bouton `search-submit`, avec un message d'erreur (`data-testid="travelers-error"`) affiché sous la grille de recherche dans [`home.component.html`](frontend/src/app/features/home/home.component.html).
- Front (garde-fou défensif) : [`frontend/src/app/features/results/results.component.ts`](frontend/src/app/features/results/results.component.ts) — si `/resultats` est atteint avec un `travelers` hors de `[1, 9]` (URL forgée), le chargement est bloqué et l'alerte `data-testid="travelers-warning"` l'indique clairement (elle ne dit plus "la recherche a été exécutée quand même").
- Back : [`backend/src/catalog/dto/search-query.dto.ts`](backend/src/catalog/dto/search-query.dto.ts) et [`backend/src/cart/dto/add-cart-item.dto.ts`](backend/src/cart/dto/add-cart-item.dto.ts) — `travelers` a maintenant `@Min(1)` et `@Max(9)`, donc l'API rejette ces valeurs avec un `400`.

**Cas de test associés (analyse aux valeurs limites) :**


**Non couvert par ce correctif :** la mise à jour de la quantité de
voyageurs *dans le panier* (`cart-increment-*` / `cart-decrement-*` dans
[`cart.component.html`](frontend/src/app/features/cart/cart.component.html), route `PATCH /api/cart/items/:id` via [`update-cart-item.dto.ts`](backend/src/cart/dto/update-cart-item.dto.ts)) n'a pas été borné — elle peut encore descendre à 0. À traiter dans un épisode dédié si besoin.

**Bug restant — dates incohérentes :** rien ne vérifie qu'une date de
retour choisie sur l'accueil est postérieure à la date de départ, ni côté
front ni côté back (`SearchQueryDto`). Toujours reproductible et toujours
un bon cas de test aux valeurs limites / cas négatif.

---

## BUG_CONNU #3 — Message d'erreur de paiement générique

**Catégorie :** cas d'erreur mal affiché.

**Où :**
- Back (message précis, correct) : [`backend/src/payment/payment.service.ts`](backend/src/payment/payment.service.ts) — méthode `simulate()`. La règle de simulation :
  - un numéro de carte se terminant par un **chiffre impair** → `errorCode: "CARD_DECLINED"`, message *"Paiement refusé par votre banque..."*
  - une date d'expiration (`MM/YY`) dans le passé → `errorCode: "EXPIRED_CARD"`, message *"Cette carte a expiré..."*
  - sinon → paiement accepté.
- Front (message ignoré) : [`frontend/src/app/features/payment/payment.component.ts`](frontend/src/app/features/payment/payment.component.ts) — dans `pay()`, la branche `else` (paiement refusé) écrase toujours `errorMessage` avec le texte générique *"Une erreur est survenue lors du paiement. Veuillez réessayer."*, sans jamais lire `result.errorCode` ni `result.message`.

**Comment le déclencher :** sur `/paiement`, utiliser un numéro de carte se
terminant par un chiffre impair (ex. `4242 4242 4242 4241`). Le paiement est
refusé, mais impossible de savoir pourquoi depuis l'interface — alors que
l'API, elle, le sait très bien (vérifiable via les devtools réseau).

---

## BUG_CONNU #4 — Régression panier : code promo figé + réduction cosmétique

**Catégorie :** bug de régression / fonctionnalité qui en casse une autre.

**Où :** [`frontend/src/app/core/services/cart.service.ts`](frontend/src/app/core/services/cart.service.ts).

**Le mécanisme (deux facettes) :**

1. **Réduction figée (régression).** `applyPromoCode()` calcule le montant
   de la réduction **une seule fois**, au moment où le code est appliqué
   (`this.frozenDiscount.set(this.subtotal() * (percent / 100))`), et le
   stocke en euros. `updateTravelers()` met bien à jour `items` (donc
   `subtotal` se recalcule via le `computed`), mais ne touche jamais
   `frozenDiscount`. Résultat : si on applique un code promo **puis** qu'on
   change le nombre de voyageurs sur un article du panier, le total affiché
   ne correspond plus au pourcentage annoncé (-10 %, -15 %). Ça ne casse
   rien tant qu'on n'enchaîne pas ces deux actions dans cet ordre précis —
   typiquement le genre de régression qu'un test manuel ponctuel ne voit
   pas, mais qu'un test de non-régression Playwright attraperait.

2. **Réduction purement cosmétique.** Le code promo n'existe que côté
   Angular (`CartService`) : il n'est jamais envoyé au backend. Le
   `PaymentService` (backend) facture toujours le sous-total réel des
   `CartItem` (`unitPrice × travelers`), sans aucune remise. Conséquence
   visible : la page `/paiement` affiche un total réduit (ex. 198 €) mais
   la réservation confirmée et le total enregistré côté API/admin affichent
   le plein tarif (220 €). Le panier "ment" sur ce qui sera réellement
   débité.

**Comment le déclencher :** ajouter un article au panier, appliquer
`VOYAGO10` (10 %) ou `BIENVENUE15` (15 %) via `data-testid="promo-input"` /
`apply-promo`, puis modifier le nombre de voyageurs avec les boutons
`cart-increment-*` / `cart-decrement-*` : le total (`data-testid="cart-total"`)
ne suit plus le pourcentage annoncé. Aller jusqu'au paiement et comparer le
total affiché avec le total de la réservation confirmée / vu depuis
`/admin`.

---

## Comptes de démonstration (seed)

| Rôle  | Email                        | Mot de passe |
|-------|-------------------------------|--------------|
| Admin | `admin@voyago.demo`          | `Admin1234`  |
| User  | `alex.martin@voyago.demo`    | `Voyage2026` |

## Règle de paiement simulé (rappel)

Un numéro de carte se terminant par un chiffre **pair** est accepté ; un
chiffre **impair**, refusé. Voir `backend/src/payment/payment.service.ts`.
