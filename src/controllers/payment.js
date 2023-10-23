const Stripe = require("stripe");
const STRIPE_KEY = process.env.STRIPE_KEY;
const stripe = new Stripe(STRIPE_KEY);

console.log(STRIPE_KEY);

const createSession = async (req, res) => {
  let { products, totalPrice } = req.body;

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
        unit_amount: product.price * 100, // Convert price to cents
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3001/products",
    cancel_url: "http://localhost:3001/payment/cancel",
  });
  console.log(session.url);

  res.json(session.url);
  console.log(req.body);
};

module.exports = createSession;