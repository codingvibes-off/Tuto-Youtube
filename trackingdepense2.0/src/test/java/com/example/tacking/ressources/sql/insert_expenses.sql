-- Insertion de l'utilisateur avec UUID fixe
INSERT INTO users(id, name, email, password)
VALUES ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Test User', 'testuser@example.com', 'testpassword');

-- Insertion de la catégorie avec UUID fixe
INSERT INTO categories (id, label, date)
VALUES ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Test Category','2025-09-15' );

-- Insertion des dépenses avec UUID fixes
INSERT INTO expense (id, amount, expense_date, user_id, categories_id)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 100.0, '2025-09-15', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
  ('22222222-2222-2222-2222-222222222222', 200.0, '2025-09-16', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');
