import { leakyRun } from './leaky-runner';
import { cleanRun } from './clean-runner';

/**
 * À lancer pendant l'enregistrement : npm run demo:await-using
 * Le terminal affiche la comparaison brute des deux méthodes.
 * Attendu :
 *   Contexts encore ouverts (ancienne méthode) : 5
 *   Contexts encore ouverts (await using)      : 0
 */
(async () => {
  console.log('--- Ancienne méthode ---');
  await leakyRun();

  console.log('\n--- await using ---');
  await cleanRun();
})();
