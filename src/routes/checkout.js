const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);



// FRONT npm install react-stripe-checkout

router.post('/payment', async(req, res) => {
    stripe.charges.create({
        source: "tok_1JYZQyLUkaywcbNzeDbgP57h",
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json({ok: true, stripeRes})
        }
    })
})

module.exports = router;