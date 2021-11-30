const { User, validate } = require('../models/User');
const express = require('express');
const router = express.Router();


//Add User
router.post("/", async (req, res) => {
  try {
  const user = new User(req.body);
    
    await user.save();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error:${ex}`);
  }
});

router.put('/:userId/shoppingcart/:productId', async (req, res) => { 
  try {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);  

  const user = await User.findById(req.params.userId);
  if (!user) return res.status(400).send(`The user with id "${req.params.userId}" does not exist.`);

  const product = user.shoppingCart.id(req.params.productId);
  if (!product) return res.status(400).send(`The product with id "${req.params.productId}" does not in the users shopping cart.`);

  product.name = req.body.name;
  product.description = req.body.description;
  product.category = req.body.category;
  product.price = req.body.price;
  // product.dateModified = Date.now();

  await user.save();
  return res.send(product);
} catch (ex) {
  return res.status(500).send(`Internal Server Error: ${ex}`); 
}
});

//Get All Users
router.get('/all', async (req, res) => {
  try {
    const user = await User.find();
    return res.send(user);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});

//Find User by ID
router.get('/:id', async (req, res) => {
  try {
const user = await User.findById(req.params.id);
if (!user)
return res.status(400).send(`The user with id "${req.params.id}" does not exist.`);
  return res.send(user);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
});


//DELETE USER
router.delete("/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user)
        return res
          .status(400)
          .send(`The user with id “${id.params.id}” does not exist`);
      return res.send(user);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error:${ex}`);
    }
  });



module.exports = router