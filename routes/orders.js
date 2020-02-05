const express = require("express");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const router = express.Router();
const Order = require("../models/orders")

router.get("/", async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.json({ message: "403 Forbidden" })
    } else {

        //checking code for errors

        try {
            const user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.SECRET);

            //shows orders depending on what set role the user has

            if (user.role == "admin") {
                const orders = await Order.getOrders();
                res.json(orders)
            } else if (user.role == "customer") {
                const order = await Order.getAOrder(user.userID);
                res.json(order);
            }
        } catch (fail) {
            res.json({ message: "The server understood the request but refuses to authorize it. GET js 27" })
        }
    }
});

router.post("/", async (req, res) => {
    if (req.headers.authorization === undefined) {
        res.json({ message: "get rekt nerd (failed)" })
    } else {
        try {
            const user = jwt.verify(req.headers.authorization.replace("Bearer ", ""), process.env.SECRET);
            const order = await Order.create(req.body, user.userID);
            res.json(order);
        } catch (fail) {
            res.json({ message: "The server understood the request but refuses to authorize it. POST js 41" })
        }
    }
});

module.exports = router;