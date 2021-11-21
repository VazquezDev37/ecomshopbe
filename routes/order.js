const Order = require('../models/Order');
const express = require('express');
const router = express.Router();

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
        const order = await Order.find(req.params.userId);
       
      order.shoppingCart.push(order);
      await user.save();
      return res.send(order);
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