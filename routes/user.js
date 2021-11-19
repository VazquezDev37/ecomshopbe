const User = require('../models/User');
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