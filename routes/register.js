const { Router } = require("express");
const User = require("../models/User");
const router = new Router();



router.post("/register", async (req, res) => {
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("Something went wrong with your registration, please try again.")
  }
});

router.post("/auth", async (req, res) => {
  // console.log(req.body)
  // console.log(req.headers);
  const token = await User.auth(req.body);

  if (token) {
    res.json(token)
    console.log(token);
  } else {
    res.json({ error: "An error occured with your login request. " })
  }
});

module.exports = router;