import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const isUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json("No token");
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(400).json("Invalid request");
    }
    next();
  } catch (error) {
    res.status(500).json(error);
  }
};
