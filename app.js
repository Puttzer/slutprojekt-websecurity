//no routes here only import and run

const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
require("dotenv").config();
const fs = require("fs");
const bodyParser = require("body-parser");
const JWT = require("jsonwebtoken");

PORT = process.env.PORT || 4000;


//routes that handle requests
// const productsRoutes = require("./routes/products");
// const ordersRoutes = require("./routes/orders");
const registerRoute = require('./routes/register');

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/register", registerRoute);
// app.use("/api/products", productsRoutes);
// app.use("/api/orders", ordersRoutes);

// app.listen(8080, () => console.log("Server started"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

