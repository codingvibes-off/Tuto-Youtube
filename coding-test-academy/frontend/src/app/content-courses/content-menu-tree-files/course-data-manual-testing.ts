import { CourseTheme } from '../content-courses.component';
export const COURSE_DATA_MANUAL_TESTING: CourseTheme[] = [
  {
    label: 'Introduction aux tests logiciels',
    items: [
      { label: "Qu'est-ce que le test logiciel ?" },
      { label: 'Pourquoi tester ?' },
      { label: "Les conséquences d'un défaut" },
      { label: "Le rôle du testeur dans une entreprise" },
      { label: "Qualité logicielle : définition et enjeux" },
      { label: "Vérification vs Validation" },
    ],
  },
  {
    label: 'Cycle de vie logiciel',
    items: [
      {
        label: 'SDLC',
        items: [
          { label: 'Cascade' },
          { label: 'Agile' },
          { label: 'Scrum' },
          { label: 'Kanban' },
          { label: 'V-Model' },
        ],
      },
      {
        label: 'STLC',
        items: [
          { label: "Analyse des exigences" },
          { label: 'Planification des tests' },
          { label: 'Conception des cas de test' },
          { label: "Mise en place de l'environnement" },
          { label: 'Exécution des tests' },
          { label: 'Clôture du cycle de test' },
        ],
      },
    ],
  },
  {
    label: 'Fondamentaux du test',
    items: [
      {
        label: 'Principes du test',
        items: [
          { label: 'Les 7 principes du test logiciel' },
          { label: 'Le paradoxe du pesticide' },
          { label: 'Les tests montrent la présence de défauts' },
          { label: "L'absence d'erreur est une illusion" },
        ],
      },
      {
        label: 'Niveaux de test',
        items: [
          { label: 'Tests unitaires' },
          { label: "Tests d'intégration" },
          { label: 'Tests système' },
          { label: "Tests d'acceptance (UAT)" },
        ],
      },
      {
        label: 'Types de test',
        items: [
          { label: 'Tests fonctionnels' },
          { label: 'Tests non-fonctionnels' },
          { label: 'Tests de régression' },
          { label: 'Tests de fumée (Smoke)' },
          { label: 'Tests de sanité (Sanity)' },
          { label: 'Tests exploratoires' },
          { label: 'Tests de performance' },
          { label: 'Tests de sécurité (introduction)' },
          { label: "Tests d'accessibilité" },
          { label: 'Tests de compatibilité' },
        ],
      },
      {
        label: 'Approches de test',
        items: [
          { label: 'Boîte noire (Black Box)' },
          { label: 'Boîte blanche (White Box)' },
          { label: 'Boîte grise (Grey Box)' },
          { label: 'Tests statiques vs dynamiques' },
        ],
      },
    ],
  },
  {
    label: 'Conception des tests',
    items: [
      {
        label: 'Techniques de conception',
        items: [
          { label: "Partitionnement en classes d'équivalence" },
          { label: 'Analyse des valeurs limites (BVA)' },
          { label: 'Table de décision' },
          { label: "Test par transition d'état" },
          { label: "Test par cas d'utilisation" },
          { label: 'Pairwise testing' },
        ],
      },
      {
        label: 'Cas de test',
        items: [
          { label: "Structure d'un cas de test" },
          { label: 'Préconditions et postconditions' },
          { label: 'Données de test' },
          { label: 'Critères de passage / échec' },
          { label: 'Traçabilité avec les exigences' },
        ],
      },
      {
        label: 'Scénarios de test',
        items: [
          { label: 'Différence scénario vs cas de test' },
          { label: 'Rédiger des scénarios efficaces' },
          { label: 'Priorisation des scénarios' },
        ],
      },
    ],
  },
  {
    label: 'Gestion des anomalies',
    items: [
      {
        label: "Cycle de vie d'un bug",
        items: [
          { label: 'Détection et signalement' },
          { label: 'Triage et qualification' },
          { label: 'Assignation et correction' },
          { label: 'Vérification et clôture' },
        ],
      },
      {
        label: 'Rapport de bug',
        items: [
          { label: "Structure d'un bon rapport de bug" },
          { label: 'Sévérité vs Priorité' },
          { label: 'Étapes de reproduction' },
          { label: 'Captures d\'écran et logs' },
          { label: 'Environnement de test' },
        ],
      },
    ],
  },
  {
    label: 'Planification & Suivi',
    items: [
      {
        label: 'Plan de test',
        items: [
          { label: 'Objectifs et périmètre' },
          { label: 'Stratégie de test' },
          { label: 'Ressources et planning' },
          { label: 'Risques et mitigations' },
          { label: "Critères d'entrée et de sortie" },
        ],
      },
      {
        label: 'Métriques de test',
        items: [
          { label: 'Taux de couverture des tests' },
          { label: 'Taux de défauts trouvés / corrigés' },
          { label: 'Vélocité de test' },
          { label: "Rapport d'avancement" },
        ],
      },
      {
        label: 'Gestion de la régression',
        items: [
          { label: 'Quand régresser ?' },
          { label: 'Sélection des tests de régression' },
          { label: 'Suite de régression' },
        ],
      },
    ],
  },
  {
    label: 'Outils du testeur',
    items: [
      {
        label: 'Gestion des tests',
        items: [
          { label: 'Jira' },
          { label: 'TestRail' },
          { label: 'Xray' },
          { label: 'Zephyr' },
        ],
      },
      {
        label: 'Outils de test API',
        items: [
          { label: 'Postman — bases' },
          { label: 'Postman — collections & environnements' },
          { label: 'Postman — assertions' },
          { label: 'Insomnia' },
        ],
      },
      {
        label: 'Outils navigateur',
        items: [
          { label: 'DevTools — Console' },
          { label: 'DevTools — Network' },
          { label: 'DevTools — Application / Cookies' },
          { label: 'BrowserStack' },
        ],
      },
      {
        label: 'Automatisation (initiation)',
        items: [
          { label: 'Jest' },
          { label: 'Cypress' },
          { label: 'Selenium' },
          { label: 'Playwright (introduction)' },
        ],
      },
    ],
  },
  {
    label: 'Tests dans un contexte Agile',
    items: [
      { label: 'Le testeur dans une équipe Scrum' },
      { label: 'Definition of Done (DoD)' },
      { label: 'Definition of Ready (DoR)' },
      { label: "Tests d'acceptance et critères d'acceptation" },
      { label: 'BDD — Behavior Driven Development' },
      { label: 'Gherkin & scénarios Given / When / Then' },
      { label: 'Three Amigos' },
      { label: 'Shift-left testing' },
    ],
  },
  {
    label: "Tests d'interface utilisateur",
    items: [
      { label: 'Vérification des maquettes (Figma / Zeplin)' },
      { label: 'Tests de navigation et de flux' },
      { label: 'Tests de formulaires' },
      { label: 'Tests responsive / mobile' },
      { label: 'Tests cross-browser' },
      { label: 'Heuristiques de test UI (HICCUPPS, SFDIPOT)' },
    ],
  },
  {
    label: "Tests d'API",
    items: [
      { label: 'Comprendre REST & HTTP' },
      { label: 'Méthodes HTTP (GET, POST, PUT, DELETE…)' },
      { label: 'Codes de statut HTTP' },
      { label: "Structure d'une requête / réponse" },
      { label: 'Tester une API avec Postman' },
      { label: 'Authentification (JWT, OAuth, API Key)' },
      { label: 'Tests de contrat (introduction)' },
    ],
  },
  {
    label: 'Soft skills & Professionnalisme',
    items: [
      { label: 'Communication avec les développeurs' },
      { label: 'Rédiger des rapports clairs' },
      { label: 'Esprit critique et curiosité' },
      { label: 'Gestion des priorités' },
      { label: 'Travailler avec des exigences incomplètes' },
      { label: 'Éthique du testeur' },
    ],
  },
];
