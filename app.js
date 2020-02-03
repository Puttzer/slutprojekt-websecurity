const express = require("express");
const app = express();

PORT = process.env.PORT || 4000;



const Products = require("./routes/products");
// const ordersRoutes = require("./routes/orders");
const auth = require('./routes/register');
const registerRoute = require('./routes/register');


app.use(express.static("public"));
app.use(express.json());

app.use("/", registerRoute);
app.use("/", auth);
app.use("/", Products);
// app.use("/api/orders", ordersRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
