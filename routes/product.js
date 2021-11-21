const Product = require('../models/Product');
const express = require('express');
const router = express.Router();


//Add Product
router.post("/", async (req, res) => {
  try {
  const product = new Product(req.body);
    
    await product.save();
    return res.send(product);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});

//Get All Products
router.get('/all', async (req, res) => {
  try {
    const product = await Product.find();
    return res.send(product);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});

//Find Product by ID
router.get('/:id', async (req, res) => {
  try {
const product = await Product.findById(req.params.id);
if (!product)
return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
  return res.send(product);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
});

//Update Product
router.put('/:id', async (req, res) => {
  try {

const product = await Product.findByIdAndUpdate(
  req.params.id,
  {
    title: req.body.title,
    desc: req.body.desc,
    category: req.body.category,
    price: req.body.price,
    countInStock: req.body.countInStock,
    imageUrl: req.body.imageUrl 
  },
    { new: true }
  );
if (!product)
return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
    await product.save();
    return res.send(product);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});

  //DELETE PRODUCT
router.delete('/:id', async (req, res) => {
    try {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
  return res.status(400).send(`The product with id "${req.params.id}" does not exist.`);
      return res.send(product);
  } catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`);
  }
  });





module.exports = router