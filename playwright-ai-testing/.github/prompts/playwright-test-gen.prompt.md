---
name: playwright-test-gen
description: Describe when to use this prompt
agent: agent
---

Je veux que tu y ailler petit a petit, que tu me génère un test e2e pour une application e-commerce avec Playwright. 


ARRANGE : tu dois aller sur la page d'accueil de l'application 

ACT : Je veux que tu me génère le code d'un test qui va sur la page d'accueil
Cliquer sur le bouton Shop Coffee. Ajouter au panier tout les caffe de la page et ensuite aller sur la page cliquer sur l'icône lucide-shopping-cart qui est le panier. 

ASSERTION : verifier que c'est bien la page d'accueil et que le titre de la page est correct.

Verifier que les caffe sont bien disponible et que le nombre de caffe dans le panier est correct.

Cré le test playwright correspondant à ce scénario.
