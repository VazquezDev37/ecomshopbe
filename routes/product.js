const router = require("express").Router();


router.post("/", async (req, res) =>{
    try {
    const newProduct = new Product({

        text: req.body.text,
        email: req.body.email,
      });
      await newProduct.save();
      return res.send(newProduct);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });






module.exports = router