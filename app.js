const express = require("express");
const app = express();

PORT = process.env.PORT || 8080;


// in
const Products = require("./routes/products");
const orderRoutes = require("./routes/orders");

const registerRoute = require('./routes/register');

app.use(express.static("public"));
app.use(express.json());


// out
app.use("/", registerRoute);

app.use("/api/products", Products);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
