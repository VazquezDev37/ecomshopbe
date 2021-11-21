const Product = require('../models/Product');
const { User }  = require('../models/User');
const router = require("express").Router();


//Add to Cart
router.post("/:userId/:prodId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const product = await Product.findById(req.params.prodId);
      user.shoppingCart.push(product);
      await user.save();
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });

  //All in Cart
  router.get("/:userId/:prodId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const product = await Product.findById(req.params.prodId);
      user.shoppingCart.push(product);
      await user.save();
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });

  //Get User Cart
  router.get("/find/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne(req.params.userId);
       
      cart.shoppingCart.push(cart);
      await user.save();
      return res.send(cart);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });

  //Delete from Cart
  router.delete("/:userId/:prodId", async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.userId);
        const product = await Product.findByIdAndRemove(req.params.prodId);
      user.shoppingCart.push(product);
      await user.save();
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });


module.exports = router