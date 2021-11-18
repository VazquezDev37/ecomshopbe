const Product = require('../models/Product');
const express = require('express');
const router = express.Router();


router.post("/product", async (req, res) => {
  try {
  const product = new Product(req.body);
    
    await product.save();
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});

router.get("/api/products", async (req, res) => {
  try {
  const newProduct = new Product(req.body);
  const products = products.findAllProducts();
    
    await newProduct.save();
    return res.send(newProduct);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});

router.get('/api/products/:id', async (req, res) => {
  try {
  const id = req.params.id;
  const product = products.findProductById(id); return res.send(product);
  }catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});

  router.put('/api/products/:id', async (req, res) => {
    try {
    const id = req.params.id;
    const productToUpdate = (req.body);
    const updatedProduct = products.updateProduct(id, productToUpdate);
        return res.send(updatedProduct);
    }catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });

  //DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    const product = await User.findByIdAndRemove(req.params.id);
    if (!product)
      return res
        .status(400)
        .send(`The product with id “${id.params.id}” does not exist`);
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});





module.exports = router