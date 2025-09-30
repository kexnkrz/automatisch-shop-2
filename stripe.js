const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);
const verifyStripeSig = require('../utils/verifyStripeSig');
const printfulClient = require('../services/printfulClient');
const klaviyoClient = require('../services/klaviyoClient');

// Create a Checkout Session (example minimal implementation)
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body; // expected: [{id, name, price, quantity}]
    const line_items = items.map(it => ({
      price_data: {
        currency: 'eur',
        product_data: { name: it.name },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/`,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Erstellen der Session' });
  }
});

// Webhook endpoint for stripe events
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = verifyStripeSig(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET, stripe);
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('Checkout completed for session:', session.id);

    // Example: fulfill order via Printful (skeleton)
    try {
      const order = {
        email: session.customer_details?.email || session.customer_email,
        items: session.display_items || [],
        metadata: session.metadata || {}
      };
      // call printful client (will be a stub if no API key)
      await printfulClient.createOrder(order);
      // track in Klaviyo
      await klaviyoClient.trackOrder(order);
    } catch (err) {
      console.error('Error during fulfillment:', err);
    }
  }

  res.json({ received: true });
});

module.exports = router;