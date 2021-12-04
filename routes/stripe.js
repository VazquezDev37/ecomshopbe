const router = require("express").Router();
const stripe = require('stripe')('sk_test_51JyQ8LFWtTbIjd1dAPZ2ZLwdzPbFaC0vGRyb4e6t0CSv0KnC7smvk4ElwXzKziK72FRVyWO5IoVizSWNMt95i3cH00F0QZJtwV');
const express = require('express');
const app = express();

app.use(express.static('public'));


const YOUR_DOMAIN = 'http://localhost:4242';




router.post("/payment", async (req, res)=> {
  Stripe.charge.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
  },
  (stripeErr, stripeRes) => {
      if (stripeErr) {
          res.status(500).send(stripeErr);
      } else {
          res.status(401).send(stripeRes);
      }
  });
});




router.post("/", async (req, res) => {
  try {
  const code= new Code(req.body);
   
  const coupon = await stripe.coupons.create({
    percent_off: 10,
    duration: 'repeating',
    duration_in_months: 3,
  });
 
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});


router.post("/", async (req, res) => {
  try {
  const promo= new Promo(req.body);
    
  const promotionCode = await stripe.promotionCodes.create({
    coupon: 'Z4OV52SU',
  });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});



app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: '84.99_61a5a3f42bf60bcd17abb6a0',
        quantity: 1,
      },
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: '15.99_61a69b478b5cd951dbad14bb',
        quantity: 1,
      },
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: '159.99_61a5a3932bf60bcd17abb69e',
        quantity: 1,
      },
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: '15.99_61a5a2a52bf60bcd17abb69a',
        quantity: 1,
      },
      
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));




module.exports = router;