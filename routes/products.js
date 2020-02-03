const express = require("express");
const router = express.Router();
const Products = require("../models/products.js")


router.get("/api/products", async (req, res) => {
    const product = await Products.all();
    res.json(product);
});

router.get("/api/products/:id", async (req, res) => {
    const product = await Products.create(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Unable to find specified produkt. Check your spelling or contact support." });
    }
});

router.post("/api/products", async (req, res) => {
    const post = await Products.create(req.body);
    if (!post) {
        res.json({ message: "Cannot add a new product." })
    } else {
        res.json(post);
    }
});

module.exports = router;