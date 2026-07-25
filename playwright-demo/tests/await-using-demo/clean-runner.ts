import { chromium } from '@playwright/test';

/**
 * NOUVELLE MÉTHODE — await using
 * `using` déclare une ressource "disposable" : dès qu'on sort du bloc englobant,
 * qu'on en sorte normalement OU via une exception, sa méthode de nettoyage
 * (ici context.close()) est appelée automatiquement.
 */
export async function cleanRun() {
  const browser = await chromium.launch();

  for (let i = 0; i < 5; i++) {
    try {
      await using context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://www.saucedemo.com');

      throw new Error('simulation d\'un test qui plante'); // même simulation que la version leaky

      // pas de context.close() ici : `using` s'en charge automatiquement,
      // même après le throw juste au-dessus
    } catch {
      // l'erreur est avalée pour la démo — le context, lui, est déjà fermé
    }
  }
  console.log('Contexts encore ouverts (await using) :', browser.contexts().length);
  await browser.close();
}
