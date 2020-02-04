const express = require("express");
const router = express.Router();
const Products = require("../models/products.js")

//gets all products
router.get("/api/products", async (req, res) => {
    const product = await Products.all();
    res.json(product);
});


//gets one specific
router.get("/api/products/:id", async (req, res) => {
    const product = await Products.create(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Unable to find specified produkt. Check your spelling or contact support." });
    }
});

//create new product
router.post("/api/products", async (req, res) => {
    const post = await Products.create(req.body);
    if (!post) {
        res.json({ message: "Cannot add a new product." })
    } else {
        res.json(post);
    }
});

//update a products information
router.patch("/api/products/:id", async (req, res) => {
    let product = await Products.patch(req.params.id, req.body);
    if (!product) {
        res.json({ message: "Unable to update specified product please try again or contact support." })
    } else {
        res.json(product)
    }
})

//Removing a product from the catalog
router.delete("/api/products/:id", async (req, res) => {
    let product = await Products.remove(req.params.id);
    if (!product) {
        res.json({ message: "Unable to remove product." })
    } else {
        res.json(product)
    }
})
module.exports = router;