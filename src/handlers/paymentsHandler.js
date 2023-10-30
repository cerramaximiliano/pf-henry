const Stripe = require("stripe");
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);
const Order = require('../models/orders');
const {createOrder} = require('../controllers/ordersControllers');


const createSession = async (req, res) => {
  let { products, totalPrice, userId } = req.body;
  console.log('Products', products)
  const newOrder = await createOrder({products, totalPrice, userId});
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
        unit_amount: Math.round(product.price * 100 * 100)/100,
      },
      quantity: product.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.URL_FRONT}/myaccount/orders/${newOrder._id}`,
    cancel_url: `${process.env.URL_FRONT}/myaccount/error`,
  });
  res.json(session.url);
};

module.exports = createSession;