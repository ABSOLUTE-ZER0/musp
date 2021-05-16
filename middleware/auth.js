const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Acquire token from header
  const token = req.header("x-auth-token");

  // Token check
  if (!token) {
    const error = [{ msg: "No token, access denied" }];
    return res.status(401).json({
      errors: error,
    });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    req.token = token;
    next();
  } catch (err) {
    const error = [{ msg: "Token is not valid" }];
    return res.status(401).json({
      errors: error,
    });
  }
};
