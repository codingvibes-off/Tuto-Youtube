---
name: test-data-factory
description: Génère des jeux de données de test réalistes pour un formulaire, une API ou un schéma de base de données. À utiliser quand l'utilisateur demande des "données de test", un "jeu de données", "des exemples de payload", ou veut tester un formulaire d'inscription/réservation/paiement. Produit systématiquement 3 catégories par champ : cas valide, cas limite, cas invalide.
---

# Test Data Factory

## Objectif

Ne jamais générer des données "propres" par défaut (type "John Doe, [email protected]").
Toujours produire des données pensées pour révéler des bugs : valeurs limites, caractères
spéciaux, unicode, formats internationaux, et cas clairement invalides.

## Instructions

Quand on te donne un champ un schéma de formulaire ou un DOM HTML, pour CHAQUE champ génère 3 valeurs :

1. **Valide (réaliste)** — une donnée plausible mais non triviale (pas "John Doe")
2. **Limite (edge case)** — la valeur qui teste les bornes : longueur max/min, caractère
   spécial, unicode, valeur à zéro, valeur négative, date limite (aujourd'hui, hier, futur lointain)
3. **Invalide** — une valeur qui doit être rejetée par une validation correcte

### Règles par type de champ

- **Email** : valide → adresse avec `+` (alias) ; limite → domaine très long ou email avec
  accents ; invalide → sans `@`, ou avec espace
- **Nom / Prénom** : valide → nom courant ; limite → nom avec apostrophe (`O'Brien`), accents
  (`Éléonore`), tiret (`Jean-Pierre`), ou un seul caractère ; invalide → chiffres ou chaîne vide
- **Téléphone** : valide → format national ; limite → format international avec indicatif
  (`+33 6...`) ; invalide → trop court ou avec lettres
- **Date** : valide → date plausible ; limite → aujourd'hui, ou date juste avant/après une
  borne métier (ex: majorité 18 ans pile) ; invalide → date future impossible ou format cassé
  (`31/02/2026`)
- **Montant / Nombre** : valide → valeur courante ; limite → 0, valeur négative, valeur
  décimale à beaucoup de chiffres, valeur max autorisée ; invalide → texte à la place d'un nombre
- **Texte libre (adresse, commentaire...)** : valide → texte normal ; limite → très long texte,
  emoji, injection basique (`<script>`, `' OR 1=1`) ; invalide → vide si le champ est obligatoire

### Format de sortie

Par défaut : JSON structuré, un objet par catégorie (valid / edge / invalid), regroupés par
champ. Si l'utilisateur précise CSV, SQL insert, ou payload API, adapte le format mais garde
la même logique des 3 catégories.

## Exemple

**Entrée** : formulaire d'inscription avec email, prénom, téléphone, date de naissance

**Sortie** :
```json
{
  "email": {
    "valid": "marie.dupont+test@gmail.com",
    "edge": "élise.o'brien@sous-domaine.exemple-tres-long.com",
    "invalid": "marie.dupont at gmail.com"
  },
  "prenom": {
    "valid": "Marie",
    "edge": "Jean-Pierre O'Brien",
    "invalid": ""
  },
  "telephone": {
    "valid": "0612345678",
    "edge": "+33 6 12 34 56 78",
    "invalid": "abc123"
  },
  "date_naissance": {
    "valid": "1990-04-12",
    "edge": "2008-08-20",
    "invalid": "31/02/2026"
  }
}
```

### Sauvegarde

En plus d'afficher le résultat, écris toujours le jeu de données généré dans un fichier
`.json` sous `.claude/skills/test-data-factory/data/`. Nomme le fichier d'après le(s)
champ(s) ou le formulaire concerné (ex: `data/adresse.json`, `data/inscription.json`).
Si le fichier existe déjà, propose de l'écraser ou de le versionner (`adresse-2.json`)
plutôt que d'écraser silencieusement.

## Script optionnel

Pour une génération en masse (100+ lignes), utilise `scripts/generate_data.py` qui s'appuie
sur Faker et applique automatiquement les règles d'edge cases ci-dessus.
