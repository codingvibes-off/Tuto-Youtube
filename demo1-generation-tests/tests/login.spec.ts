import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Cas nominaux', () => {
  test('le bouton "Se connecter" reste désactivé tant que les deux champs ne sont pas remplis', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.loginButton).toBeDisabled();

    await loginPage.fillEmail('demo@coding-vibes.fr');
    await expect(loginPage.loginButton).toBeDisabled();

    await loginPage.fillPassword('password123');
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('une connexion avec un email valide et le bon mot de passe affiche un message de confirmation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('demo@coding-vibes.fr', 'password123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Connexion réussie ✅');
  });
});

test.describe('Cas limites', () => {
  test('un mot de passe d\'exactement 8 caractères passe la validation de longueur', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('demo@coding-vibes.fr', '12345678');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Identifiants invalides.');
  });

  test('un mot de passe de 7 caractères, juste sous la limite, déclenche l\'erreur de longueur', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('demo@coding-vibes.fr', '1234567');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Le mot de passe doit contenir au moins 8 caractères.');
  });

  test('un mot de passe composé d\'un unique espace suffit à activer le bouton "Se connecter"', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.fillEmail('demo@coding-vibes.fr');
    await loginPage.fillPassword(' ');

    await expect(loginPage.loginButton).toBeEnabled();
  });
});

test.describe('Cas de gestion d\'erreurs', () => {
  test('un email mal formaté affiche "Format d\'email invalide."', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('email-invalide', 'password123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Format d'email invalide.");
  });

  test('des identifiants au format valide mais inconnus affichent "Identifiants invalides."', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('inconnu@example.com', 'motdepasse123');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Identifiants invalides.');
  });

  test('le message d\'erreur n\'est pas visible avant la soumission du formulaire', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.errorMessage).toBeHidden();
  });
});
