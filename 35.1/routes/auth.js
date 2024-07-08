const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

const router = new Router();

router.post("/login", async function (req, res, next) {
  try {
    const { username, password } = req.body;

    if (await User.authenticate(username, password)) {
      const token = jwt.sign({ username }, SECRET_KEY);
      await User.updateLoginTimestamp(username);
      return res.json({ token });
    } else {
      throw new ExpressError("Invalid username/password", 400);
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    const { username } = await User.register(req.body);
    const token = jwt.sign({ username }, SECRET_KEY);
    await User.updateLoginTimestamp(username);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;