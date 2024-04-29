import jwt from "jsonwebtoken";
import { getUserById } from "../Controllers/user.controller.js";

const isAuthenticated = async (req, res, next) => {
  let token;
  if (req.headers) {
    try {
      token = await req.headers["x-auth-token"];
      if (!token) {
        return res.status(400).json({ Error: "Invalid Authorization" });
      }
      const decode = jwt.verify(token, process.env.SECRETKEY);
      req.user = await getUserById(decode.id);
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export { isAuthenticated };
