# Plan de test - Login SauceDemo (Happy Path)

## Application Overview

Ce plan de test couvre exclusivement le flux de connexion (login) de l'application Swag Labs (SauceDemo), disponible à l'adresse https://www.saucedemo.com/. Il ne couvre volontairement qu'un seul scénario : la connexion réussie (happy path) avec les identifiants standard valides `standard_user` / `secret_sauce`, vérifiant que l'utilisateur arrive correctement sur la page inventory (liste des produits) après authentification. Aucun scénario d'échec (identifiants invalides, utilisateur bloqué, etc.) n'est inclus dans ce plan.

Page de login :
- Champ `Username` (sélecteur `[data-test="username"]`)
- Champ `Password` (sélecteur `[data-test="password"]`)
- Bouton `Login` (sélecteur `[data-test="login-button"]`)
- Encart d'aide listant les usernames acceptés et le mot de passe commun `secret_sauce`

Page d'arrivée après connexion réussie :
- URL : https://www.saucedemo.com/inventory.html
- Titre de l'onglet : "Swag Labs"
- Titre de section "Products" affiché
- Liste de 6 produits visible (ex. "Sauce Labs Backpack", "Sauce Labs Bike Light", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket", "Sauce Labs Onesie", "Test.allTheThings() T-Shirt (Red)"), chacun avec une image, un nom, un prix et un bouton "Add to cart"

## Test Scenarios

### 1. Connexion (Login)

**Seed:** ``

#### 1.1. 1.1 Connexion réussie avec identifiants valides (standard_user / secret_sauce)

**File:** `specs/login.spec.ts`

**Steps:**
  1. Naviguer vers https://www.saucedemo.com/ (état de départ : non authentifié, aucune session active)
    - expect: La page de login s'affiche avec le titre 'Swag Labs'
    - expect: Le champ 'Username' (data-test="username") est visible et vide
    - expect: Le champ 'Password' (data-test="password") est visible et vide
    - expect: Le bouton 'Login' (data-test="login-button") est visible et cliquable
    - expect: L'encart d'aide affichant les usernames acceptés et le mot de passe 'secret_sauce' est visible
  2. Cliquer sur le champ 'Username' et saisir la valeur 'standard_user'
    - expect: Le champ 'Username' contient exactement la valeur 'standard_user'
  3. Cliquer sur le champ 'Password' et saisir la valeur 'secret_sauce'
    - expect: Le champ 'Password' contient la valeur saisie (affichée masquée, de type password)
  4. Cliquer sur le bouton 'Login'
    - expect: Aucun message d'erreur n'apparaît sur la page
    - expect: L'utilisateur est redirigé automatiquement vers une nouvelle page
  5. Vérifier l'URL de la page atteinte après connexion
    - expect: L'URL de la page est exactement https://www.saucedemo.com/inventory.html
  6. Vérifier le titre de l'onglet du navigateur
    - expect: Le titre de la page est 'Swag Labs'
  7. Vérifier la présence de l'en-tête de section produits
    - expect: Le texte 'Products' est visible en haut de la liste des articles
  8. Vérifier la présence de la liste des produits sur la page inventory
    - expect: Au moins 6 articles produits sont affichés (ex. 'Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)')
    - expect: Chaque produit affiche une image, un nom, un prix et un bouton 'Add to cart'
  9. Vérifier la présence des éléments de navigation propres à l'utilisateur connecté (menu hamburger 'Open Menu' et icône panier)
    - expect: Le bouton 'Open Menu' est visible en haut à gauche, confirmant que la session est bien authentifiée
    - expect: L'icône du panier (shopping cart) est visible en haut à droite de la page
