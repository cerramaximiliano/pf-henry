const Stripe = require("stripe");
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);
const Order = require('../models/orders');
const createOrder = require('./controllers/createOrder');


const createSession = async (req, res) => {
  let { products, totalPrice } = req.body;

  const newOrder = await createOrder({products, totalPrice});

  if (typeof totalPrice !== "number" && Array.isArray(products)) {
    totalPrice = products.reduce((acc, product) => acc + product.price, 0);
  }

  const lineItems = products.map((product) => {
    return {
      price_data: {
        product_data: {
          name: product.title,
          images: [product.image],
        },
        currency: "usd",
        unit_amount: product.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL_FRONT}/myaccount/${newOrder._id}`,
    cancel_url: `${process.env.URL_FRONT}/myaccount/error`,
  });
  res.json(session.url);
};

module.exports = createSession;