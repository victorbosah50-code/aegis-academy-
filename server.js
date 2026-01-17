const express = require('express');
const stripe = require('stripe')('sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'); // ← YOUR Stripe SECRET key
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

app.post('/create-session', async (req, res) => {
  const { plan, uid } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'google_pay'],
      mode: plan === 'premium' ? 'subscription' : 'payment',
      line_items: [{
        price: plan === 'premium' ? 'price_1...' : 'price_1...', // ← create prices in Stripe dashboard
        quantity: 1
      }],
      success_url: 'https://victorbosah50-code.github.io/aegis-academy-/success.html',
      cancel_url: 'https://victorbosah50-code.github.io/aegis-academy-/cancel.html',
      metadata: { uid, plan }
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
