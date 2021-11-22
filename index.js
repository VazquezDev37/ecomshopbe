const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const user = require("./routes/user");
const auth = require("./routes/auth");
const product = require('./routes/product');
const cart = require('./routes/cart');
const order = require('./routes/order');
const stripe = require('./routes/stripe');


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", user);
app.use("/api/auth", auth);
app.use('/api/product', product);
app.use('/api/cart', cart);
app.use('/api/order', order);
app.use('/api/stripe', stripe);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});
