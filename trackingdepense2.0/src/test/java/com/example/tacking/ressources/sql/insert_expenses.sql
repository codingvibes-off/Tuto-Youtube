-- Insertion de l'utilisateur avec UUID fixe
INSERT INTO users(id, name, email)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test User', 'testuser@example.com');

-- Insertion de la catégorie avec UUID fixe
INSERT INTO category (id, date, label)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2025-09-15', 'Test Category');

-- Crée des UUID fixes pour les tests
INSERT INTO expense (id, amount, date, description, user_id, category_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 100.0, '2025-09-15', 'Test Expense 1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('22222222-2222-2222-2222-222222222222', 200.0, '2025-09-16', 'Test Expense 2', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
