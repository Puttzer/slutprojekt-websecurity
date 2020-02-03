const express = require("express");
const router = express.Router();
const Products = require("../models/products.js")


router.get("/api/products", async (req, res) => {
    const product = await Products.all();
    res.json(product);
});

router.post("/api/products", async (req, res) => {
    const post = await Products.create(req.body);
    if (!post) {
        res.json({ message: "Couldnt create the product" })
    } else {
        res.json(post);
    }
});

module.exports = router;