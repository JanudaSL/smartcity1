import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyJwt(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing auth header" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // user info
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
