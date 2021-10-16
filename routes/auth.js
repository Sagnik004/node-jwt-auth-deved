const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt    = require("jsonwebtoken"); 
const User   = require("../model/User");
const { registerValidation, loginValidation } = require("../validations/validation");

// {URL}:{PORT}/api/user/register
router.post("/register", async (req, res) => {
  const { error, value } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('Email already exists!');
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ id: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// {URL}:{PORT}/api/user/login
router.post("/login", async (req, res) => {
  const {error, value} = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid Credentials!");
  }

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Credentials!");
  }

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
