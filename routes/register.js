const { Router } = require("express");
const User = require("../models/User");
const router = new Router();

router.post("/", async (req, res) => {
  console.log("hej")
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("Something went wrong with your registration, please try again.")
  }

});

router.post("/")



