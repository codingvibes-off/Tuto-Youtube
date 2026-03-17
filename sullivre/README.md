# 📚 Sullivan Sextius — Bibliothèque de Lectures

Site web premium pour répertorier et partager tes lectures.

---

## 🗂 Structure du projet

```
/
├── index.html      ← Page principale (structure HTML)
├── styles.css      ← Tout le design (CSS variables, dark mode, responsive)
├── data.js         ← ⭐ Tes livres et catégories (fichier principal à modifier)
└── app.js          ← Logique et interactions JavaScript
```

---

## 📖 Ajouter un livre

Ouvre `data.js` et ajoute un objet dans le tableau `BOOKS` :

```js
{
  id: 13,                          // ID unique (incrémente +1)
  title: "Titre du livre",
  author: "Prénom Nom",
  category: "business",            // voir la liste des catégories ci-dessous
  rating: 5,                       // de 1 à 5
  tags: ["tag1", "tag2"],          // mots-clés pour la recherche
  summary: "Résumé du livre...",
  recommendation: "Ta recommandation personnelle...",
  cover: "https://url-image.jpg",  // URL de la couverture (optionnel)
  coverColor: "#C9A84C",           // couleur de fond si pas d'image
  amazon: "https://amazon.fr/...", // lien d'achat
  tiktok: "https://tiktok.com/...",// lien ta vidéo TikTok
  featured: true,                  // true = "coup de cœur"
  recent: true,                    // true = "dernier ajout"
  addedDate: "2026-03-15"          // date d'ajout
}
```

### Catégories disponibles

| id            | Label                   |
|---------------|-------------------------|
| `business`    | Business                |
| `psychologie` | Psychologie             |
| `dev-perso`   | Développement personnel |
| `philosophie` | Philosophie             |
| `productivite`| Productivité            |
| `finance`     | Finance                 |
| `histoire`    | Histoire                |
| `science`     | Science                 |
| `fiction`     | Fiction                 |

---

## 🖼 Trouver les couvertures

Quelques sources gratuites :
- **Open Library** : `https://covers.openlibrary.org/b/isbn/[ISBN]-L.jpg`
- **Google Books** : recherche l'ISBN, clique sur le livre → "Aperçu du livre" → URL de l'image
- **Amazon** : copie l'URL de la couverture sur la page produit

---

## 🚀 Déployer sur Vercel

1. Crée un compte sur [vercel.com](https://vercel.com)
2. Installe Vercel CLI : `npm i -g vercel`
3. Dans le dossier du projet : `vercel`
4. Suis les instructions → c'est en ligne en 30 secondes !

Ou simplement :
- Va sur [vercel.com/new](https://vercel.com/new)
- Glisse/dépose le dossier du projet
- ✅ Déployé !

---

## 🎨 Personnalisation

### Changer les couleurs
Dans `styles.css`, modifie les variables CSS au début :
```css
:root {
  --gold: #C9A84C;      /* couleur principale (or) */
  --accent: #E87040;    /* couleur d'accent */
  --bg: #0A0A0B;        /* fond principal */
}
```

### Modifier le nom / profil
Dans `index.html`, cherche "Sullivan Sextius" et remplace par ton nom.

---

## ✨ Fonctionnalités

- ✅ Page d'accueil avec hero, stats, catégories, coups de cœur, derniers ajouts
- ✅ Page catégories avec filtres et tri
- ✅ Page livre détaillée (résumé, recommandation, lien Amazon, TikTok)
- ✅ Page recommandations
- ✅ Recherche dynamique (titre, auteur, tags, catégorie)
- ✅ Design dark mode premium
- ✅ 100% responsive (mobile first)
- ✅ Animations fluides
- ✅ Prêt pour Vercel (zéro configuration)
