const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server started on port: ${port}`);
});
