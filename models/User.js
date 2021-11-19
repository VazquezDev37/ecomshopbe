const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const { productSchema } = require('./Product');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
    shoppingCart: { type: [productSchema], default: [] },
},
{ timestamps: true}
);

//JSONWEBTOKEN METHOD FOR USER SCHEMA
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
      { _id: this._id, username: this.username },
      config.get("jwtSecret")
    );
  };

  const User = mongoose.model("User", userSchema);

  //Validation
  function validateUser(user) {
    const schema = Joi.object({
      username: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(225).required(),
      password: Joi.string().min(10).max(225).required(),
    });
    return schema.validate(user);
  }

  function validateLogin(req) {
    const schema = Joi.object({
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required(),
    });
    return schema.validate(req);
  }


  module.exports = {User, userSchema, validateUser, validateLogin};