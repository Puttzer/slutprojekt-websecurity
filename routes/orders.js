const express = require("express");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const router = express.Router();
const Order = require("../models/orders")
const verify = require("./verify")
console.log(verify)
router.get("/", verify, async (req, res) => {
    try {

        //shows orders depending on what set role the user has
        if (user.role == "admin") {
            const orders = await Order.getOrders();
            res.json(orders)

        } else if (user.role == "customer") {
            const order = await Order.getAOrder(req.user.userID);
            res.json(order);
        }

    } catch (fail) {
        res.json({ message: "CATASTROPHIC FAIL" })
    }
});


router.post("/", async (req, res) => {

    try {

        const order = await Order.create(req.body, user.userID);
        res.json(order);
    } catch (fail) {
        res.json({ message: "CATASTROPHIC FAIL" })
    }

});

module.exports = router;