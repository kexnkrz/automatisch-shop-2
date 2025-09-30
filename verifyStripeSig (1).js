// Minimal Stripe signature verification helper
module.exports = function verifyStripeSig(rawBody, sigHeader, webhookSecret, stripe) {
  if (!webhookSecret) {
    // In dev, skip verification but warn
    console.warn('No STRIPE_WEBHOOK_SECRET set — skipping signature verification (development only).');
    return JSON.parse(rawBody);
  }
  return stripe.webhooks.constructEvent(rawBody, sigHeader, webhookSecret);
};