const router = require("express").Router();
const { User, validateUser, validateLogin } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//Register Ecom Shop
router.post("/register", async (req, res)=> {
    
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already registered.");
        const salt = await bcrypt.genSalt(10);
        user = new User({
          username: req.body.username,
          email: req.body.email,
          password: await bcrypt.hash(req.body.password, salt),
        });
        await user.save();
        const token = user.generateAuthToken();
        return res
          .header("x-auth-token", token)
          .header("access-control-expose-headers", "x-auth-token")
          .send({ _id: user._id, username: user.username, email: user.email });
      } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);

  }
});

//Login Ecom Shop
router.post("/login", async (req, res)=> {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password .");
    
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password.");
    const token = user.generateAuthToken();
    return res.send({
      token: token,
      // username:username,
      email: req.body.email,
    });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});



module.exports = router