import { chromium } from '@playwright/test';

/**
 * ANCIENNE MÉTHODE
 * Si une assertion plante entre l'ouverture du context et son .close(),
 * la ligne de fermeture n'est jamais atteinte. Le context reste ouvert
 * en mémoire — c'est la fuite classique.
 */
export async function leakyRun() {
  const browser = await chromium.launch();

  for (let i = 0; i < 5; i++) {
    try {
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://www.saucedemo.com');

      throw new Error('simulation d\'un test qui plante'); // ex: une assertion qui échoue

      // eslint-disable-next-line no-unreachable
      await context.close(); // <-- jamais exécuté
    } catch {
      // on avale l'erreur pour que la démo continue, mais le context, lui, ne se ferme jamais
    }
  }

  console.log('Contexts encore ouverts (ancienne méthode) :', browser.contexts().length);
  await browser.close();
}
