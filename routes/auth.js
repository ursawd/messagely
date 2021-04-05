// AUTH.JS - Login & Register Express Routes

const jwt = require("jsonwebtoken");
const { Router } = require("express");
const ExpressError = require("../expressError");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const router = new Router();

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const valid = await User.authenticate(username, password);
    if (valid) {
      let token = jwt.sign({ username }, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({ token });
    } else {
      throw new ExpressError("Invalid user -or- password", 400);
    }
  } catch (err) {
    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    if (!username || !password || !first_name || !last_name || !phone) {
      throw new ExpressError("All registration information required", 401);
    }
    user = await User.register(
      username,
      password,
      first_name,
      last_name,
      phone
    );
    token = jwt.sign(user, SECRET_KEY);
    return res.json({ token });
  } catch (err) {
    next(err);
  }
});
//--------------------------------------------------------

//--------------------------------------------------------
module.exports = router;
