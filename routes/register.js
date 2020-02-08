const { Router } = require("express");
const User = require("../models/User");
const router = new Router();



router.post("/api/register", async (req, res) => {
  console.log("Ska came before reggae, But did you know that reggae came from ska?");
  const user = await User.register(req.body);
  if (user) {
    res.json(user);
  } else {
    res.send("Something went wrong with your registration, please try again.")
  }
});

router.post("/api/auth", async (req, res) => {
  const token = await User.auth(req.body);

  if (token) {
    res.status(201).json(token)
    console.log(token);
  } else {
    res.json({ error: "An error occured with your login request. 1234" })
  }
});

module.exports = router;