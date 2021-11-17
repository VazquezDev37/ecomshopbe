const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    isAdmin: { type: Boolean, default: false},
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




module.exports = {User, userSchema, validateUser};


