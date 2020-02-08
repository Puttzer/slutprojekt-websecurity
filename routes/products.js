const express = require("express");
const router = express.Router();
const Products = require("../models/products.js")
const verify = require("./verify'")

//gets all products
router.get("/", async (req, res) => {
    const product = await Products.all();
    res.json(product);
});


//gets one specific
router.get("/:id", async (req, res) => {
    const product = await Products.create(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.json({ message: "Unable to find specified produkt. Check your spelling or contact support." });
    }
});

//create new product
router.post("/", verify.verify, async (req, res) => {
    if (req.user.role == "admin") {
        const post = await Products.create(req.body);
        if (post) {
            res.json(post);
        } else {
            res.json({ message: "Cannot add a new product." })
        }
    } else {
        res.json({ mesage: "User not authorized" })
    }
});

//update a products information
router.patch("/:id", verify.verify, async (req, res) => {
    if (req.user.role == "admin") {
        let product = await Products.patch(req.params.id, req.body);
        if (!product) {
            res.json({ message: "Unable to update specified product please try again or contact support." })
        } else {
            res.json(product)
        }
    } else {
        res.json({ mesage: "User not authorized" })
    }
})

//Removing a product from the catalog
router.delete("/:id", verify.verify, async (req, res) => {
    if (req.user.role == "admin") {
        let product = await Products.remove(req.params.id);
        if (!product) {
            res.json({ message: "Unable to remove product." })
        } else {
            res.json(product)
        }
    } else {
        res.json({ mesage: "User not authorized" })
    }
})
module.exports = router;