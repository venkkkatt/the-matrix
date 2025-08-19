const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (token == null) return res.status(401).json("token is null");

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, userPayload) => {
    if (err) return res.status(403).json("Access denied");
    req.user = userPayload;
    next();
  });
}

module.exports = authenticateToken;
