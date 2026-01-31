const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuid } = require('uuid');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

/* =====================
   Base de données fake
===================== */

let users = [];
let products = [
  { id: "p1", name: "Laptop", price: 1000, stock: 10 },
  { id: "p2", name: "Phone", price: 500, stock: 20 }
];
let carts = {};
let orders = [];

/* =====================
   AUTH
===================== */

app.post('/auth/register', (req, res) => {
  const user = { id: uuid(), ...req.body };
  users.push(user);
  res.json(user);
});
app.post('/auth/login', (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  res.json({ token: user.id });
});

/* =====================
   PRODUITS
===================== */

app.get('/products', (req, res) => {
  res.json(products);
});

/* =====================
   PANIER
===================== */

app.post('/cart/add', (req, res) => {
  const { userId, productId, qty } = req.body;

  if (!carts[userId]) carts[userId] = [];

  carts[userId].push({ productId, qty });
  res.json(carts[userId]);
});

app.get('/cart/:userId', (req, res) => {
  res.json(carts[req.params.userId] || []);
});

/* =====================
   PROMOTIONS
===================== */

function applyPromotion(total, code) {
  if (code === "PROMO10") return total * 0.9;
  return total;
}

/* =====================
   CHECKOUT / COMMANDE
===================== */

app.post('/checkout', async (req, res) => {
  const { userId, promoCode, simulatePaymentError, simulateSlow } = req.body;

  const cart = carts[userId];
  if (!cart || cart.length === 0)
    return res.status(400).json({ error: "Empty cart" });

  // calcul total
  let total = 0;
  for (let item of cart) {
    const product = products.find(p => p.id === item.productId);
    if (!product || product.stock < item.qty)
      return res.status(409).json({ error: "Out of stock" });

    total += product.price * item.qty;
  }

  total = applyPromotion(total, promoCode);

  // simulation lenteur
  if (simulateSlow) await new Promise(r => setTimeout(r, 5000));

  // simulation erreur paiement
  if (simulatePaymentError)
    return res.status(402).json({ error: "Payment failed" });

  // MAJ stock
  for (let item of cart) {
    const product = products.find(p => p.id === item.productId);
    product.stock -= item.qty;
  }
  const order = {
    id: uuid(),
    userId,
    total,
    status: "PAID"
  };
  orders.push(order);
  carts[userId] = [];

  res.json(order);
});

/* =====================
   COMMANDES
===================== */

app.get('/orders/:userId', (req, res) => {
  res.json(orders.filter(o => o.userId === req.params.userId));
});

/* =====================
   RETOUR / REMBOURSEMENT
===================== */

app.post('/orders/:id/refund', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);
  if (!order) return res.status(404).json({ error: "Not found" });

  order.status = "REFUNDED";
  res.json(order);
});

/* =====================
   SERVER
===================== */

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
