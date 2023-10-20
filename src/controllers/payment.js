const Stripe = require('stripe')

const STRIPE_KEY = process.env.STRIPE_KEY
const stripe = new Stripe(STRIPE_KEY) 

const createSession = async (req,res) => {
   const session = await stripe.checkout.sessions.create({
    line_items: [{
        price_data: {
            product_data: {
                name: 'proteina',
            },
            currency: 'usd',
            unit_amount: 2000
        },
        quantity: 1
    }],
    mode: 'payment',
    success_url:'http://localhost:3001/payment/success',
    cancel_url:'http://localhost:3001/payment/cancel'
   })
   return res.json(session)
}

module.exports = createSession

