const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token =
  //   req.body.token || req.query.token || req.headers["x-access-token"];

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(new createHttpError.Forbidden("A token is required for authentication"));
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("decoded",decoded);
    req.user = decoded;
  } catch (err) {
    return next(new createHttpError.Unauthorized("Invalid Token"));
  }
  return next();
};

module.exports = verifyToken;