const axios = require('axios');

const PRINTFUL_KEY = process.env.PRINTFUL_KEY;

async function createOrder(order) {
  if (!PRINTFUL_KEY) {
    console.log('Printful API key not set — skipping actual fulfillment (dev). Order payload:', JSON.stringify(order));
    return { simulated: true };
  }

  // Map your internal order shape to Printful's API - this is a simplified example
  const payload = {
    recipient: {
      name: order.recipient_name || 'Kunde',
      address1: order.address1 || 'Musterstraße 1',
      city: order.city || 'Berlin',
      country_code: order.country_code || 'DE'
    },
    items: (order.items || []).map(it => ({
      sync_variant_id: it.sync_variant_id || null,
      quantity: it.quantity || 1
    }))
  };

  const res = await axios.post('https://api.printful.com/orders', payload, {
    headers: { Authorization: `Bearer ${PRINTFUL_KEY}` }
  });
  return res.data;
}

module.exports = { createOrder };