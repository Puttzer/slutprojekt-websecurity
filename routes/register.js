const { Router } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs')
const router = new Router();

router.post("/", async (req, res) => {
  // console.log('hej')
  const newUser = {
    email: email,
    password: await bcrypt.hash(req.body.password),
    name: name,
    adress: {
      street: street,
      zip: zip,
      city: city
    }
  };
  const user = await User.register(newUser)
  res.json(user)
});


module.exports = router;
