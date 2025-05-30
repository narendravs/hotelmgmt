import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import verifyToken from "../middleware/auth";
import jwt from "jsonwebtoken";
import User from "../models/user";
const router = express.Router();
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
      max: 12,
    }),
  ],
  async (req: Request, res: Response): Promise<any> => {
    // console.log("Login request received");
    // console.log("Request body:", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_cookie", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        maxAge: 86400000,
      });

      return res.status(200).json({ userId: user._id, token: token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_cookie", "", {
    expires: new Date(0),
  });
  res.status(200).send();
});
export default router;
