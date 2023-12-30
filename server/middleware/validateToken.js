import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "User is not authorized" });
    }
  } else {
    res
      .status(401)
      .json({ message: "User is not authorized or token is missing" });
  }
};

export default validateToken;
