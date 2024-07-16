const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT for payload {username, admin}. */

function createToken(username, admin = false) {
  let payload = { username, admin };
  // FIXES BUG 2
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

module.exports = createToken;
