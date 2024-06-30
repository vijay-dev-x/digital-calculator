const SECRET_KEY = "123456";
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (token === SECRET_KEY) {
      return next();
    }
  }

  return res.sendStatus(403); // Forbidden
};

module.exports = authenticateJWT;
