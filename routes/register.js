const { Router } = require("express");
const User = require("../models/User");
const router = new Router();
const JWT = require("jsonwebtoken")
const secret = process.env.SECRET;

router.post("/api/register", async (req, res) => {
  console.log("hej")
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("Something went wrong with your registration, please try again.")
  }
});

router.post("/api/auth", async (req, res) => {
  const userAuth = await User.auth(req.body);
  const confirm = JWT.verify(userAuth, secret);

  if (confirm) {
    res.json(confirm)
  } else {
    res.json({ error: "An error occured with your login request. Please try again or seek help from customer support." })
  }
});

module.exports = router;