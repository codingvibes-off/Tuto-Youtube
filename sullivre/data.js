// ============================================================
//  DATA.JS — Bibliothèque de livres
//  Modifie ce fichier pour ajouter / modifier tes livres
// ============================================================

const CATEGORIES = [
  { id: 'business',    label: 'Business',              emoji: '💼', color: '#C9A84C' },
  { id: 'psychologie', label: 'Psychologie',            emoji: '🧠', color: '#7C6FCD' },
  { id: 'dev-perso',   label: 'Développement personnel',emoji: '🚀', color: '#4CAF7C' },
  { id: 'philosophie', label: 'Philosophie',            emoji: '🏛️', color: '#E87040' },
  { id: 'productivite',label: 'Productivité',           emoji: '⚡', color: '#3DA9FC' },
  { id: 'finance',     label: 'Finance',                emoji: '📈', color: '#56C273' },
  { id: 'histoire',    label: 'Histoire',               emoji: '📜', color: '#D4837A' },
  { id: 'science',     label: 'Science',                emoji: '🔬', color: '#00BCD4' },
  { id: 'fiction',     label: 'Fiction',                emoji: '✨', color: '#FF6B9D' },
];

// ============================================================
//  BOOKS — Ajoute tes livres ici
//  coverColor: couleur de fond si pas d'image
//  cover: URL de la couverture (optionnel)
//  tiktok: URL de ta vidéo TikTok (optionnel)
//  amazon: lien d'achat (optionnel)
//  featured: true = apparaît dans "coups de cœur"
//  recent: true = apparaît dans "derniers ajouts"
// ============================================================

const BOOKS = [
  {
  "id": 1,
  "title": "La vérité vous rendra libre",
  "author": "Charles Gave",
  "category": "productivite",
  "rating": 5,
  "tags": ["habitudes", "transformation", "systèmes"],
  "summary": "La méthode scientifique pour construire de bonnes habitudes et briser les mauvaises. Une approche par l'accumulation de petites améliorations de 1% chaque jour.",
  "recommendation": "Le meilleur livre sur les habitudes que j'aie jamais lu. Concret, actionnable, et basé sur des preuves scientifiques solides. Indispensable.",
  "cover": "https://m.media-amazon.com/images/I/513JpwgqAwL.jpg",
  "coverColor": "#3DA9FC",
  "amazon": "https://www.amazon.fr/V%C3%A9rit%C3%A9-vous-rendra-libre-Lhistoire/dp/2364452651/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2GOFPWBXL3GLT&dib=eyJ2IjoiMSJ9.3bXKkQ6KDif5-2CfTyu7Pg.CCSzqFOumbty0HB3_CtyN2i6_mvFeMuxpdfw1ckt67w&dib_tag=se&keywords=charles+gaves+la+verite&qid=1773600376&sprefix=charles+gaves+la+verite%2Caps%2C260&sr=8-1",
  "tiktok": "https://www.tiktok.com/@sullivan.sextius",
  "featured": true,
  "recent": true,
  "addedDate": "2026-03-10"
},
    {
  "id": 2,
  "title": "La Voix de la connaissance",
  "author": "Don Miguel Ruiz",
  "category": "spiritualite",
  "rating": 5,
  "tags": ["conscience", "verite", "perception"],
  "summary": "Don Miguel Ruiz explique comment la 'voix de la connaissance' dans notre esprit crée des illusions, des jugements et des peurs qui nous éloignent de la vérité. Le livre invite à se libérer des histoires mentales et à retrouver une perception plus authentique de la réalité.",
  "recommendation": "Un livre court mais très profond qui aide à comprendre comment notre esprit construit des illusions. Idéal pour développer plus de lucidité et de liberté intérieure.",
  "cover": "https://images.epagine.fr/357/9782889534357_1_75.jpg",
  "coverColor": "#4A6FA5",
  "amazon": "https://www.amazon.fr/voix-connaissance-guide-pratique-int%C3%A9rieure/dp/2889534359/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2WFHR0Q9C3S10&dib=eyJ2IjoiMSJ9.YjXYTjMkVVlOsQkE7EAv2Ewz6_9F5URs1Bn85tbLIzsNzQaW26U4mHBGfBD_wDfG.COelvPCgqBfuxxMSxdXb7zW8w8p00_1cOXjGJO43sBo&dib_tag=se&keywords=miguel+ruiz+la+voix+de+la+connaissance&qid=1773600696&sprefix=miuel+ruiz+la+voix+de+la+connaissance%2Caps%2C242&sr=8-1",
  "tiktok": "https://www.tiktok.com/@sullivan.sextius",
  "featured": true,
  "recent": false,
  "addedDate": "2026-02-15"
},
  {
  "id": 3,
  "title": "Plus malin que le diable",
  "author": "Napoleon Hill",
  "category": "developpement",
  "rating": 5,
  "tags": ["mental", "discipline", "peur"],
  "summary": "Dans ce livre provocateur écrit en 1938 mais publié bien plus tard, Napoleon Hill imagine une interview avec le Diable pour révéler les mécanismes mentaux qui empêchent les individus de réussir : peur, procrastination, doute et influence sociale. :contentReference[oaicite:2]{index=2}",
  "recommendation": "Un livre puissant sur la liberté mentale. Il explique comment reprendre le contrôle de ses pensées et sortir de la 'dérive' qui empêche la majorité des gens de réussir.",
  "cover": "https://m.media-amazon.com/images/I/81UJcLg8AGL._UF1000,1000_QL80_.jpg",
  "coverColor": "#D4A017",
  "amazon": "https://www.amazon.fr/Plus-malin-Diable-Napoleon-Hill-ebook/dp/B00HFY5QYY",
  "tiktok": "https://www.tiktok.com/@sullivan.sextius",
  "featured": true,
  "recent": true,
  "addedDate": "2026-03-15"
},
 {
  "id": 4,
  "title": "Le Gang des Antillais",
  "author": "Loïc Léry",
  "category": "histoire",
  "rating": 4,
  "tags": ["crime", "antilles", "société"],
  "summary": "L’histoire vraie du célèbre gang des Antillais à Paris dans les années 1970 et 1980. Une plongée dans le crime organisé, les tensions sociales et la vie des jeunes de la diaspora antillaise.",
  "recommendation": "Un récit fascinant et poignant, à la croisée de l’histoire et du documentaire. Idéal pour comprendre un pan méconnu de la société française.",
  "cover": "https://images.epagine.fr/903/9782373111903_1_75.jpg",
  "coverColor": "#8B3E2F",
  "amazon": "https://www.amazon.fr/gang-Antillais-Poche-Lo%C3%AFc-L%C3%A9ry/dp/237311190X/ref=sr_1_2?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=G83Y7R3QRBQH&dib=eyJ2IjoiMSJ9.XDHuoxMgVK6IZE9yUxGnZiv4Rm5dn70jwlaS9v2Jr7qAU0krjDG6-tfsJdZ37mhCXMO-oGcWlSvSd1zyCVlKczgqWcguxXYciosen0Fjrsu3KY-439PnvTtJORYo0uwTgyYQpFwzP3SZ1JUZqV2FVN5OBUwyJCLHsUnXBq8rPOI.FfA3hmoACAlIdRZOR1wB5pn2nmPKflGRzSzxwv0wJ1I&dib_tag=se&keywords=le+gang+des+antillais&qid=1773600803&sprefix=le+gang+des+antillai%2Caps%2C334&sr=8-2",
  "tiktok": "https://www.tiktok.com/@sullivan.sextius",
  "featured": false,
  "recent": true,
  "addedDate": "2026-03-05"
},
  {
  "id": 5,
  "title": "Cyberpunk : le nouveau totalitaire",
  "author": "Asma Mhalla",
  "category": "technologie",
  "rating": 5,
  "tags": ["cyberpunk", "société", "futur"],
  "summary": "Une plongée dans l'univers du cyberpunk et des nouvelles formes de totalitarisme numérique. L'auteur explore comment la technologie, le contrôle et la surveillance façonnent nos sociétés contemporaines.",
  "recommendation": "Indispensable pour comprendre les enjeux du numérique et du futur de notre société. Provocateur et très éclairant.",
  "cover": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTrkCdTlzy-Wl0PMx2M6pHXL3qrT8ZT--ThRAyNi2obOJwLx4Cxqm8o61aNJjMvV6DBv6KffbLFDCqPpLjAgTXxKajL4US_&usqp=CAc",
  "coverColor": "#2E3B4E",
  "amazon": "https://www.amazon.fr/Cyberpunk-nouveau-totalitaire-Asma-Mhalla/dp/2021587584/ref=sr_1_2?crid=30UTT8OFE334S&dib=eyJ2IjoiMSJ9.K7M63VusSaIx8VjMSkcL5wS6YamX-V5kFyXZxaJX0BfhXReXPxj9wunlGkvlX_WuDre1_9QNPW4Hg4Sh8mBW2izxZFBX1T-O4C0RVY2FOQk9NSZUPhnVJE-DHuYqdexw-UWDRLLXpMNHV78tpHl0OtbmS3OY79mpTYBW7M8IXpYBlB_YDEFKgFGY35l45jjblm56_WS4EcTjw1tn0q48RNJBa6G6EwR17rWeM__m9h2UsyG9NWi2vcQoqA-IiIqbOwRgOYXtyt6XbqJUSPv1sTOdVCicyv1qqveuafmE1i4.nwiVB-3SsazTeuRBs0WaIRzgIxzhXeifjV0fwvsi3nY&dib_tag=se&keywords=cyberpunk&qid=1773600903&sprefix=cyberpiu%2Caps%2C235&sr=8-2",
  "tiktok": "https://www.tiktok.com/@sullivan.sextius",
  "featured": true,
  "recent": true,
  "addedDate": "2026-01-20"
},
  {
  "id": 6,
  "title": "Toutes blessent, la dernière tue",
  "author": "Karine Giebel",
  "category": "thriller",
  "rating": 5,
  "tags": ["thriller", "suspense", "psychologie"],
  "summary": "Un thriller intense où Karine Giebel explore la manipulation, la vengeance et les secrets destructeurs. L'intrigue captive et ne lâche jamais le lecteur jusqu'à la dernière page.",
  "recommendation": "Un page-turner haletant qui montre tout le talent de Giebel pour le suspense psychologique. Impossible de le poser avant la fin.",
  "cover": "https://images.epagine.fr/903/9782266291903_1_75.jpg",
  "coverColor": "#A52A2A",
  "amazon": "https://www.amazon.fr/s?k=Toutes+blessent+la+derniere+tue+Karine+Giebel",
  "tiktok": "",
  "featured": true,
  "recent": true,
  "addedDate": "2026-03-15"
},
  {
    id: 7,
    title: "Deep Work",
    author: "Cal Newport",
    category: "productivite",
    rating: 5,
    tags: ["concentration", "performance", "focus"],
    summary: "Cal Newport défend la thèse que la capacité à travailler en concentration profonde est la compétence la plus précieuse — et la plus rare — du 21e siècle.",
    recommendation: "Ce livre a radicalement changé ma façon de travailler. Si tu veux performer dans un monde de distractions, c'est obligatoire.",
    cover: "https://covers.openlibrary.org/b/id/8592187-L.jpg",
    coverColor: "#3DA9FC",
    amazon: "https://www.amazon.fr/s?k=Deep+Work+Cal+Newport",
    tiktok: "https://www.tiktok.com/@sullivan.sextius",
    featured: true,
    recent: true,
    addedDate: "2026-02-28"
  },
  {
    id: 8,
    title: "The 4-Hour Work Week",
    author: "Timothy Ferriss",
    category: "dev-perso",
    rating: 4,
    tags: ["liberté", "automatisation", "lifestyle"],
    summary: "Tim Ferriss propose un système pour s'évader du monde des 9h-18h, automatiser ses revenus et vivre la vie de ses rêves — sans attendre la retraite.",
    recommendation: "Provocateur et inspirant. Pas tout à prendre au pied de la lettre, mais les concepts de délégation et d'automatisation sont précieux.",
    cover: "https://covers.openlibrary.org/b/id/6963901-L.jpg",
    coverColor: "#4CAF7C",
    amazon: "https://www.amazon.fr/s?k=4+Hour+Work+Week+Ferriss",
    tiktok: "",
    featured: false,
    recent: false,
    addedDate: "2025-11-05"
  },
  {
    id: 9,
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "science",
    rating: 4,
    tags: ["physique", "univers", "cosmologie"],
    summary: "Stephen Hawking guide le lecteur à travers les mystères de l'univers : le Big Bang, les trous noirs, la nature du temps et la quête d'une théorie unifiée.",
    recommendation: "Hawking rend la cosmologie accessible à tous. Un voyage mental extraordinaire dans les profondeurs de l'univers.",
    cover: "https://covers.openlibrary.org/b/id/8228637-L.jpg",
    coverColor: "#00BCD4",
    amazon: "https://www.amazon.fr/s?k=Brief+History+Time+Hawking",
    tiktok: "",
    featured: false,
    recent: false,
    addedDate: "2025-10-15"
  },
  {
    id: 10,
    title: "1984",
    author: "George Orwell",
    category: "fiction",
    rating: 5,
    tags: ["dystopie", "surveillance", "liberté"],
    summary: "Dans un monde totalitaire où Big Brother surveille tout, Winston Smith ose penser par lui-même. Un roman visionnaire sur le pouvoir, la vérité et la résistance.",
    recommendation: "Un chef-d'œuvre absolu. Plus que jamais d'actualité. À lire une fois dans sa vie — ou deux fois.",
    cover: "https://covers.openlibrary.org/b/id/8743161-L.jpg",
    coverColor: "#FF6B9D",
    amazon: "https://www.amazon.fr/s?k=1984+Orwell",
    tiktok: "https://www.tiktok.com/@sullivan.sextius",
    featured: false,
    recent: false,
    addedDate: "2025-09-20"
  },
  {
    id: 11,
    title: "The Lean Startup",
    author: "Eric Ries",
    category: "business",
    rating: 4,
    tags: ["startup", "agilité", "itération"],
    summary: "Eric Ries présente une méthode révolutionnaire pour lancer des entreprises : tester rapidement, apprendre de ses erreurs, et pivoter si nécessaire.",
    recommendation: "La bible de l'entrepreneuriat moderne. Si tu construis un produit, ce livre est incontournable.",
    cover: "https://covers.openlibrary.org/b/id/8592120-L.jpg",
    coverColor: "#C9A84C",
    amazon: "https://www.amazon.fr/s?k=The+Lean+Startup+Eric+Ries",
    tiktok: "",
    featured: false,
    recent: true,
    addedDate: "2026-03-12"
  },
  {
    id: 12,
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    category: "philosophie",
    rating: 5,
    tags: ["sens", "résilience", "existence"],
    summary: "Survivant des camps de concentration nazis, Viktor Frankl expose sa théorie de la logothérapie : l'homme peut tout endurer s'il trouve un sens à sa souffrance.",
    recommendation: "Le livre le plus profond que j'aie lu. Frankl nous rappelle que même dans les pires circonstances, nous pouvons choisir notre attitude.",
    cover: "https://covers.openlibrary.org/b/id/8374508-L.jpg",
    coverColor: "#E87040",
    amazon: "https://www.amazon.fr/s?k=Man+Search+for+Meaning+Frankl",
    tiktok: "https://www.tiktok.com/@sullivan.sextius",
    featured: true,
    recent: false,
    addedDate: "2025-12-01"
  },
];

// Export pour utilisation dans app.js
// (pas besoin de module.exports en HTML pur)
