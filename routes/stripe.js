const router = require("express").Router();
const stripe = require('stripe')('sk_test_51JyQ8LFWtTbIjd1dAPZ2ZLwdzPbFaC0vGRyb4e6t0CSv0KnC7smvk4ElwXzKziK72FRVyWO5IoVizSWNMt95i3cH00F0QZJtwV');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (e.g. pr_1234) of the product you want to sell
        price: 'price_1JzB9kFWtTbIjd1dtugTH38Z',
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

// router.post("/payment", async (req, res)=> {
//    Stripe.charge.create({
//        source: req.body.tokenId,
//        amount: req.body.amount,
//        currency: "usd",
//    },
//    (stripeErr, stripeRes) => {
//        if (stripeErr) {
//            res.status(500).send(stripeErr);
//        } else {
//            res.status(401).send(stripeRes);
//        }
//    });
// });


module.exports = router;