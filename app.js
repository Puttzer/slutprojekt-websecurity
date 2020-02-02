const express = require("express");
const app = express();

PORT = process.env.PORT || 4000;

//routes that handle requests
// const productsRoutes = require("./routes/products");
// const ordersRoutes = require("./routes/orders");
const auth = require('./routes/register');
const registerRoute = require('./routes/register');

//middleware
app.use(express.static("public"));
app.use(express.json());

app.use("/", registerRoute);
app.use("/", auth);
// app.use("/api/products", productsRoutes);
// app.use("/api/orders", ordersRoutes);

// app.listen(8080, () => console.log("Server started"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
