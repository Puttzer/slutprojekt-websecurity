const express = require("express");
// const jwt = require("jsonwebtoken")
require("dotenv").config();
const router = express.Router();
const Order = require("../models/orders")
const verify = require("../routes/verify")
// console.log(verify)
router.get("/", verify.verify, async (req, res) => {
    try {

        //shows orders depending on what set role the user has
        if (req.user.role == "admin") {
            const orders = await Order.getOrders();
            res.json(orders)

        } else if (req.user.role == "customer") {
            const order = await Order.getAOrder(req.user.userID);
            res.json(order);
        }

    } catch (fail) {
        res.json({ message: "CATASTROPHIC FAIL 1" })
    }
});


router.post("/", verify.verify, async (req, res) => {
    try {
        const order = await Order.create(req.body, req.user.userID);
        res.json(order);
    } catch (fail) {
        res.json({ message: "CATASTROPHIC FAIL 2" })
    }

});

module.exports = router;