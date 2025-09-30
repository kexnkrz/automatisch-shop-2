require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stripeRoutes = require('./routes/stripe');

const app = express();
app.use(cors());
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    // keep raw body for stripe webhook verification
    req.rawBody = buf.toString();
  }
}));

app.get('/', (req, res) => res.send('Automatisch-Shop Backend läuft.'));

app.use('/api/stripe', stripeRoutes);


const sessionRoutes = require('./routes/session');
app.use('/api', sessionRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});