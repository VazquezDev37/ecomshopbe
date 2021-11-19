const Product = require('../models/Product');
const { User }  = require('../models/User');
const router = require("express").Router();

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

  router.delete("/:userId/:prodId", async (req, res) => {
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


module.exports = router