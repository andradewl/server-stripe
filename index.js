const stripe = require('stripe')('sk_test_51OtaX0JA4oGedNG8rAzctAxCGtoZMKsCjmkTTYTZ3QG4nzZEpYL4029oQ4oHxTfQTzeRtZfUVgzGTW5CZv3uWqZh00NfpQg12i');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/payment-sheet', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Create a new PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: ['card'],
    });

    // Return the client secret for the PaymentIntent
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating PaymentIntent:', error);
    res.status(500).json({ error: 'An error occurred while creating PaymentIntent.' });
  }
});

app.listen(4002, () => console.log("Running on http://localhost:4002"));