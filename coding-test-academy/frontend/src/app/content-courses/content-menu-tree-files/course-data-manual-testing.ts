import { CourseTheme } from '../content-courses.component';
export const COURSE_DATA_MANUAL_TESTING: CourseTheme[] = [
  {
    label: 'Introduction aux tests logiciels',
    items: [
      { label: "Qu'est-ce que le test logiciel ?"},
      {label: "Quizz 1", 
        quizz:[ { question: "Quel est l'objectif du test logiciel ?", options: ["Détecter bugs", "Coder plus vite", "Supprimer du code"], correctAnswerIndex: 0}] 
      },
      { label: 'Pourquoi tester ?' },
      { label: "Les conséquences d'un défaut"},
      { label: "Le rôle du testeur dans une entreprise"},
      { label: "Qualité logicielle : définition et enjeux"},
      { label: "Vérification vs Validation"},
    ],
  },
  {
    label: 'Cycle de vie logiciel',
    items: [
      {
        label: 'SDLC',
        items: [
          { label: 'Cascade', quizz:[] },
          { label: 'Agile', quizz:[] },
          { label: 'Scrum' , quizz:[]},
          { label: 'Kanban', quizz:[] },
          { label: 'V-Model', quizz:[] },
        ],
      },
      {
        label: 'STLC',
        items: [
          { label: "Analyse des exigences" , quizz:[]},
          { label: 'Planification des tests' , quizz:[]},
          { label: 'Conception des cas de test' , quizz:[]},
          { label: "Mise en place de l'environnement", quizz:[] },
          { label: 'Exécution des tests', quizz:[] },
          { label: 'Clôture du cycle de test', quizz:[] },
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
          { label: 'Les 7 principes du test logiciel', quizz:[] },
          { label: 'Le paradoxe du pesticide', quizz:[]},
          { label: 'Les tests montrent la présence de défauts', quizz:[]},
          { label: "L'absence d'erreur est une illusion" , quizz:[]},
        ],
      },
      {
        label: 'Niveaux de test',
        items: [
          { label: 'Tests unitaires', quizz:[] },
          { label: "Tests d'intégration", quizz:[] },
          { label: 'Tests système' },
          { label: "Tests d'acceptance (UAT)", quizz:[] },
        ],
      },
      {
        label: 'Types de test',
        items: [
          { label: 'Tests fonctionnels', quizz:[] },
          { label: 'Tests non-fonctionnels', quizz:[] },
          { label: 'Tests de régression', quizz:[] },
          { label: 'Tests de fumée (Smoke)', quizz:[]},
          { label: 'Tests de sanité (Sanity)' , quizz:[]},
          { label: 'Tests exploratoires', quizz:[] },
          { label: 'Tests de performance', quizz:[] },
          { label: 'Tests de sécurité (introduction)' , quizz:[]},
          { label: "Tests d'accessibilité" , quizz:[]},
          { label: 'Tests de compatibilité' , quizz:[]},
        ],
      },
      {
        label: 'Approches de test',
        items: [
          { label: 'Boîte noire (Black Box)', quizz:[] },
          { label: 'Boîte blanche (White Box)' , quizz:[]},
          { label: 'Boîte grise (Grey Box)', quizz:[] },
          { label: 'Tests statiques vs dynamiques', quizz:[] },
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
          { label: "Partitionnement en classes d'équivalence", quizz:[] },
          { label: 'Analyse des valeurs limites (BVA)', quizz:[] },
          { label: 'Table de décision', quizz:[] },
          { label: "Test par transition d'état", quizz:[] },
          { label: "Test par cas d'utilisation" , quizz:[]},
          { label: 'Pairwise testing', quizz:[] },
        ],
      },
      {
        label: 'Cas de test',
        items: [
          { label: "Structure d'un cas de test" , quizz:[]},
          { label: 'Préconditions et postconditions' , quizz:[]},
          { label: 'Données de test' , quizz:[]},
          { label: 'Critères de passage / échec' , quizz:[]},
          { label: 'Traçabilité avec les exigences' , quizz:[]},
        ],
      },
      {
        label: 'Scénarios de test',
        items: [
          { label: 'Différence scénario vs cas de test', quizz:[] },
          { label: 'Rédiger des scénarios efficaces', quizz:[] },
          { label: 'Priorisation des scénarios', quizz:[] },
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
          { label: 'Détection et signalement', quizz:[]},
          { label: 'Triage et qualification', quizz:[] },
          { label: 'Assignation et correction' , quizz:[]},
          { label: 'Vérification et clôture' , quizz:[]},
        ],
      },
      {
        label: 'Rapport de bug',
        items: [
          { label: "Structure d'un bon rapport de bug", quizz:[] },
          { label: 'Sévérité vs Priorité' , quizz:[]},
          { label: 'Étapes de reproduction' , quizz:[]},
          { label: 'Captures d\'écran et logs' , quizz:[]},
          { label: 'Environnement de test' , quizz:[]},
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
          { label: 'Objectifs et périmètre' , quizz:[]},
          { label: 'Stratégie de test' , quizz:[]},
          { label: 'Ressources et planning' , quizz:[]},
          { label: 'Risques et mitigations' , quizz:[]},
          { label: "Critères d'entrée et de sortie", quizz:[] },
        ],
      },
      {
        label: 'Métriques de test',
        items: [
          { label: 'Taux de couverture des tests' , quizz:[]},
          { label: 'Taux de défauts trouvés / corrigés' , quizz:[]},
          { label: 'Vélocité de test' , quizz:[]},
          { label: "Rapport d'avancement" , quizz:[]},
        ],
      },
      {
        label: 'Gestion de la régression',
        items: [
          { label: 'Quand régresser ?' , quizz:[]},
          { label: 'Sélection des tests de régression', quizz:[] },
          { label: 'Suite de régression', quizz:[] },
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
          { label: 'Jira' , quizz:[]},
          { label: 'TestRail' , quizz:[]},
          { label: 'Xray' , quizz:[]},
          { label: 'Zephyr', quizz:[] },
        ],
      },
      {
        label: 'Outils de test API',
        items: [
          { label: 'Postman — bases' , quizz:[]},
          { label: 'Postman — collections & environnements', quizz:[] },
          { label: 'Postman — assertions' , quizz:[]},
          { label: 'Insomnia' , quizz:[]},
        ],
      },
      {
        label: 'Outils navigateur',
        items: [
          { label: 'DevTools — Console' , quizz:[]},
          { label: 'DevTools — Network' , quizz:[]},
          { label: 'DevTools — Application / Cookies' , quizz:[]},
          { label: 'BrowserStack' , quizz:[]},
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
      { label: 'Le testeur dans une équipe Scrum' , quizz:[]},
      { label: 'Definition of Done (DoD)', quizz:[] },
      { label: 'Definition of Ready (DoR)' , quizz:[]},
      { label: "Tests d'acceptance et critères d'acceptation" , quizz:[]},
      { label: 'BDD — Behavior Driven Development' , quizz:[]},
      { label: 'Gherkin & scénarios Given / When / Then', quizz:[] },
      { label: 'Three Amigos' , quizz:[]},
      { label: 'Shift-left testing' , quizz:[]},
    ],
  },
  {
    label: "Tests d'interface utilisateur",
    items: [
      { label: 'Vérification des maquettes (Figma / Zeplin)', quizz:[] },
      { label: 'Tests de navigation et de flux' , quizz:[]},
      { label: 'Tests de formulaires' , quizz:[]},
      { label: 'Tests responsive / mobile', quizz:[] },
      { label: 'Tests cross-browser' , quizz:[]},
      { label: 'Heuristiques de test UI (HICCUPPS, SFDIPOT)' , quizz:[]},
    ],
  },
  {
    label: "Tests d'API",
    items: [
      { label: 'Comprendre REST & HTTP' , quizz:[]},
      { label: 'Méthodes HTTP (GET, POST, PUT, DELETE…)' , quizz:[]},
      { label: 'Codes de statut HTTP' , quizz:[]},
      { label: "Structure d'une requête / réponse" , quizz:[]},
      { label: 'Tester une API avec Postman', quizz:[] },
      { label: 'Authentification (JWT, OAuth, API Key)' , quizz:[]},
      { label: 'Tests de contrat (introduction)', quizz:[] },
    ],
  },
  {
    label: 'Soft skills & Professionnalisme',
    items: [
      { label: 'Communication avec les développeurs' , quizz:[]},
      { label: 'Rédiger des rapports clairs', quizz:[] },
      { label: 'Esprit critique et curiosité' , quizz:[]},
      { label: 'Gestion des priorités', quizz:[] },
      { label: 'Travailler avec des exigences incomplètes' , quizz:[]},
      { label: 'Éthique du testeur' , quizz:[]},
    ],
  },
];
