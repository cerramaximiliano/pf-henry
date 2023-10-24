const Stripe = require('stripe');
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);
const secret = 'whsec_ariQxppdm3B7yhLDtFpaAvuAMSIRueZ2'


const webHookhandler = async (req, res) => {
    const payload = req.body;
    const sig = req.headers['stripe-signature'];
  
    try {
      const event = stripe.webhooks.constructEvent(payload, sig, secret);
  
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const result = await webhook(session);
        console.log(result);
        res.status(200).json({ message: 'Webhook event processed successfully' });
      } else {
        res.status(200).json({ message: 'Webhook event not of interest' });
      }
    } catch (error) {
      console.error('Webhook signature verification failed.');
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = webHookhandler;