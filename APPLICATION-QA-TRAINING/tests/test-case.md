# Cas de test — Réservation d'un voyage

**Exigence source :**
> Un utilisateur doit pouvoir rechercher un vol, sélectionner un voyage et finaliser sa réservation.

**Périmètre :** parcours complet de réservation, découpé en 3 fonctionnalités :
1. Recherche de vol
2. Sélection du voyage
3. Finalisation de la réservation

**Légende type :** `Nominal` = cas passant standard · `Alternatif` = variante valide · `Erreur` = cas limite / invalide

---

## 1. Recherche de vol

### TC-01 — Recherche standard avec résultats
- **Type :** Nominal
- **Préconditions :** L'utilisateur est sur la page d'accueil / recherche
- **Étapes :**
  1. Renseigner la ville de départ
  2. Renseigner la ville d'arrivée
  3. Choisir une date de départ (et retour si aller-retour)
  4. Cliquer sur "Rechercher"
- **Résultat attendu :** Une liste de vols correspondants s'affiche, triée (ex. par prix ou horaire)

### TC-02 — Recherche aller simple vs aller-retour
- **Type :** Alternatif
- **Étapes :** Basculer entre "Aller simple" et "Aller-retour" avant de lancer la recherche
- **Résultat attendu :** Le formulaire adapte les champs (date retour visible/masquée) et la recherche renvoie des résultats cohérents avec le mode choisi

### TC-03 — Aucun résultat trouvé
- **Type :** Erreur
- **Étapes :** Rechercher un trajet/date sans vol disponible (ex. destination inexistante desservie)
- **Résultat attendu :** Message clair "Aucun vol trouvé" + suggestion (changer de date, destination proche)

### TC-04 — Champs obligatoires non renseignés
- **Type :** Erreur
- **Étapes :** Cliquer sur "Rechercher" sans ville de départ ou d'arrivée
- **Résultat attendu :** Message de validation bloquant, recherche non lancée

### TC-05 — Ville de départ = ville d'arrivée
- **Type :** Erreur
- **Étapes :** Sélectionner la même ville en départ et arrivée
- **Résultat attendu :** Message d'erreur explicite, recherche bloquée

### TC-06 — Date de départ dans le passé
- **Type :** Erreur
- **Étapes :** Sélectionner une date antérieure à aujourd'hui
- **Résultat attendu :** Date non sélectionnable ou message d'erreur si forcée via URL/API

### TC-07 — Date de retour antérieure à la date de départ
- **Type :** Erreur
- **Étapes :** Mode aller-retour, choisir une date retour < date départ
- **Résultat attendu :** Message d'erreur, impossible de lancer la recherche

---

## 2. Sélection du voyage

### TC-08 — Consultation du détail d'un vol
- **Type :** Nominal
- **Préconditions :** Une liste de résultats est affichée (suite TC-01)
- **Étapes :** Cliquer sur un vol de la liste
- **Résultat attendu :** Détail affiché : prix, horaires, escales, compagnie, bagages inclus

### TC-09 — Comparaison de plusieurs vols
- **Type :** Alternatif
- **Étapes :** Ouvrir puis fermer le détail de plusieurs vols successivement
- **Résultat attendu :** Retour à la liste sans perte des critères de recherche ni rechargement complet

### TC-10 — Tri et filtres des résultats
- **Type :** Alternatif
- **Étapes :** Appliquer un tri (prix, durée) et/ou un filtre (escales, compagnie)
- **Résultat attendu :** La liste se met à jour correctement selon le critère choisi

### TC-11 — Sélection d'un vol devenu indisponible
- **Type :** Erreur
- **Étapes :** Sélectionner un vol dont la disponibilité a changé entre l'affichage et le clic (ex. dernière place prise)
- **Résultat attendu :** Message d'indisponibilité, proposition d'alternatives, pas de blocage de l'application

### TC-12 — Navigation retour depuis le détail
- **Type :** Nominal
- **Étapes :** Depuis le détail d'un vol, cliquer sur "Retour"
- **Résultat attendu :** Retour à la liste de résultats avec les critères de recherche conservés

---

## 3. Finalisation de la réservation

### TC-13 — Réservation complète avec succès
- **Type :** Nominal
- **Préconditions :** Un vol est sélectionné (suite TC-08)
- **Étapes :**
  1. Saisir les informations passager (nom, prénom, date de naissance, etc.)
  2. Choisir un moyen de paiement
  3. Valider les CGV
  4. Confirmer la réservation
- **Résultat attendu :** Réservation confirmée, numéro/référence affiché, email de confirmation envoyé

### TC-14 — Informations passager incomplètes ou invalides
- **Type :** Erreur
- **Étapes :** Laisser un champ obligatoire vide ou saisir un format invalide (ex. date de naissance incohérente)
- **Résultat attendu :** Validation bloquante avec message précis par champ

### TC-15 — Échec du paiement
- **Type :** Erreur
- **Étapes :** Utiliser un moyen de paiement refusé (carte invalide, fonds insuffisants simulés)
- **Résultat attendu :** Message d'échec clair, possibilité de réessayer sans perdre les informations déjà saisies

### TC-16 — Abandon avant validation finale
- **Type :** Alternatif
- **Étapes :** Quitter le parcours de réservation avant confirmation (fermeture, retour navigateur)
- **Résultat attendu :** Aucune réservation ni débit effectué ; état cohérent si l'utilisateur revient

### TC-17 — Session expirée pendant la finalisation
- **Type :** Erreur
- **Étapes :** Laisser le parcours de réservation inactif jusqu'à expiration de session, puis tenter de confirmer
- **Résultat attendu :** Message d'expiration, redirection sécurisée, aucune réservation partielle enregistrée

### TC-18 — CGV non acceptées
- **Type :** Erreur
- **Étapes :** Tenter de confirmer sans cocher la case d'acceptation des CGV
- **Résultat attendu :** Confirmation bloquée, message explicite

### TC-19 — Double clic sur "Confirmer"
- **Type :** Erreur
- **Étapes :** Cliquer plusieurs fois rapidement sur le bouton de confirmation
- **Résultat attendu :** Une seule réservation créée, un seul débit effectué (pas de doublon)

### TC-20 — Confirmation de réservation reçue
- **Type :** Nominal
- **Étapes :** Après confirmation, vérifier l'email/notification reçu
- **Résultat attendu :** Contenu correct (référence, détails du vol, montant, coordonnées passager)

---

## Synthèse de couverture

| Fonctionnalité | Nominal | Alternatif | Erreur |
|---|---|---|---|
| Recherche de vol | TC-01 | TC-02 | TC-03, TC-04, TC-05, TC-06, TC-07 |
| Sélection du voyage | TC-08, TC-12 | TC-09, TC-10 | TC-11 |
| Finalisation | TC-13, TC-20 | TC-16 | TC-14, TC-15, TC-17, TC-18, TC-19 |
