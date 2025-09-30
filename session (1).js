const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

router.get('/session', async (req, res) => {
  const { session_id } = req.query;
  if (!session_id) return res.status(400).json({ error: 'session_id missing' });
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['line_items'] });
    res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not retrieve session' });
  }
});

module.exports = router;