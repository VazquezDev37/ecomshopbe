const router = require("express").Router();
const Stripe = require("stripe")("Secret_key");

//router.post("/payment", async (req, res)=> {
 //   stripe.charges.create({
 //       source: req.body.tokenId,
 //       amount: req.body.amount,
 //       currency: "usd",
 //   },
  //  (stripeErr, stripeRes) => {
  //      if (stripeErr) {
  //          res.status(500).json(stripeErr);
  //      } else {
 //           res.status(201).json(stripeRes);
 //       }
 //   });
//});

router.post("/", async (req, res) => {
    try {
        const stripe =  Stripe(req.body);
        
      //stripe.shoppingCart.push(stripe);
      await stripe.save();
      return res.send(stripe);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });


module.exports = router;