const express = require("express");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const router = express.Router();
const Order = require("../models/orders")

router.get("/api/orders", async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.status(403).json({ message: "403 Forbidden" })
    } else {

        //checking code for errors

        try {
            const user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.SECRET);

            //shows orders depending on what set role the user has

            if (user.role == "admin") {
                const orders = await Order.getOrders();
                res.json(orders)
            } else if (user.role == "customer") {
                const order = await Order.getOrder();
                res.json(order);
            }
        } catch (fail) {
            res.status(403).json({ message: "The server understood the request but refuses to authorize it." })
        }
    }
});

module.exports = router;