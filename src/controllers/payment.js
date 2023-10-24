const Stripe = require("stripe");
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);
const Order = require('../models/orders');

const URL_BASE = 'http://localhost:5173/';


const createOrder = async (result) => {
  console.log(result)
  console.log(result.products)
  try {
      const newOrder = new Order({
        products:  result.products,
        total: result.totalPrice,
        userId: 12345687,
        status:"pending"
      });
      await newOrder.save();
      return { newOrder };
  } catch (error) {
    throw new Error(error);
  }
};


console.log(STRIPE_KEY);

const createSession = async (req, res) => {
  let { products, totalPrice } = req.body;

  const newOrder = await createOrder(products, totalPrice);
  console.log(newOrder);

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
    success_url: `http://localhost:5173/myaccount/${newOrder._id}`,
    cancel_url: "http://localhost:3001/payment/cancel",
  });
  console.log(session.url);

  res.json(session.url);
  console.log(req.body);
};

module.exports = createSession;
