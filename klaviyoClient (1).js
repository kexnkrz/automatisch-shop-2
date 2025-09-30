const axios = require('axios');
const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;

async function trackOrder(order) {
  if (!KLAVIYO_API_KEY) {
    console.log('Klaviyo key not set — skipping track (dev).', order.email || '(no email)');
    return;
  }
  // This is a placeholder - replace with real Klaviyo track API usage
  try {
    await axios.post('https://a.klaviyo.com/api/track', {
      token: KLAVIYO_API_KEY,
      event: 'Placed Order',
      customer_properties: { email: order.email },
      properties: { order }
    });
  } catch (err) {
    console.error('Klaviyo track failed', err.response?.data || err.message);
  }
}

module.exports = { trackOrder };