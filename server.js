const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_...');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});
const db = admin.firestore();

const app = express();
app.use(bodyParser.json());

app.post('/create-session', async (req, res) => {
  const { plan, uid } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'google_pay'],
    mode: plan === 'premium' ? 'subscription' : 'payment',
    line_items: [{ price: 'price_...', quantity: 1 }],
    success_url: 'https://victorbosah50-code.github.io/aegis-academy-/',
    cancel_url: 'https://victorbosah50-code.github.io/aegis-academy-/',
    metadata: { uid }
  });
  res.json({ id: session.id });
});

app.listen(3000, () => console.log('Backend running'));
