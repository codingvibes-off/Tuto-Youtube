import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      // Environnement E2E reproductible, dans l'ordre :
      //  1. base SQLite dédiée (isolée de dev.db et des test-*.db des tests
      //     d'intégration backend) repartie de zéro à chaque run ;
      //  2. build propre : un tsconfig.tsbuildinfo (cache incrémental tsc)
      //     obsolète peut faire croire à `nest build` que tout est à jour
      //     et lui faire sauter la génération de dist/, cassant le
      //     démarrage du serveur sans erreur visible ;
      //  3. migrations + seed (même commande que le Dockerfile backend),
      //     rejoués avant que le serveur n'écoute, pour des données de
      //     départ connues (comptes de démo, destinations, vols, hôtels).
      command:
        'rm -f prisma/e2e.db prisma/e2e.db-journal && ' +
        'rm -rf dist tsconfig.tsbuildinfo && npm run build && ' +
        'npx prisma migrate deploy && npx prisma db seed && ' +
        'node dist/main.js',
      cwd: './backend',
      url: 'http://localhost:3000/api/catalog/flights',
      reuseExistingServer: !process.env.CI,
      // Budget plus large que le frontend : build + migrate + seed
      // s'exécutent avant que le serveur ne commence à écouter.
      timeout: 90_000,
      // Chemin relatif au fichier schema.prisma (backend/prisma/), comme
      // DATABASE_URL="file:./dev.db" dans backend/.env — et non relatif au
      // cwd du process.
      env: {
        DATABASE_URL: 'file:./e2e.db',
      },
    },
    {
      command: 'npm start',
      cwd: './frontend',
      url: 'http://localhost:4200',
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
});
