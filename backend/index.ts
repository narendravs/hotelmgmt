import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./src/routes/auth";
import hotelRoutes from "./src/routes/hotels";
import bookingRoutes from "./src/routes/my-bookings";
import myHotelRoutes from "./src/routes/my-hotels";
import userRoutes from "./src/routes/users";
import jwt from "jsonwebtoken";
const bodyParser = require("body-parser");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

const port = 5000;

//connect mongoose database and check the connection return true or false
mongoose
  .connect(process.env.MONGODB_URI as string, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);

app.get("/test", (req: Request, res: Response) => {
  res.send(path.join(__dirname, "../../frontend/index.html"));
});

app.get("/token", (req: Request, res: Response) => {
  const payload = { name: "narendra" };
  const secret = "narenn185";
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  //res.status(200).json({ token: token });
  res.send(path.join(__dirname, "../../frontend/index.html"));
});

app.get("/checkToken", (req: Request, res: Response) => {
  const token = req.headers["authorization"]?.split(" ")[1] || "";
  console.log(token);
  const secret = "narenn185";
  try {
    const success = jwt.verify(token, secret);
    res.status(200).json({ data: success });
  } catch (error) {
    res.status(401).json({ message: "invalid" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port} successfully`);
});
