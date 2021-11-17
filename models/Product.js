const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Array },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
})

const Product = mongoose.model('product, productSchema');

module.exports = Product;