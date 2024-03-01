const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "youare@verrypretty";

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    req.userType = data.user.userType;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticateUser;
