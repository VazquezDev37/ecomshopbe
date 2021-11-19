const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
//const productRoutes = require("./routes/product");
const product = require('./routes/product');
const cart = require('./routes/cart');


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/products", productRoutes);
app.use('/api/product', product);
app.use('/api/cart', cart);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});
