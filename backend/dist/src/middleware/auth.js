"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[0];
    const token = req.cookies["auth_cookie"];
    //const token = req.headers.auth_cookie as string;
    //const token = req.cookies.auth_cookie;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2FmMjdhYzg1Y2JjMGZhY2Q5YjYyYjgiLCJpYXQiOjE3Mzk1MzQxMDYsImV4cCI6MTczOTYyMDUwNn0.aF2MRMtkzf3sJwJyBFLgtbsjtCbyTEHQxlZX83-9OGk";
    console.log("cookie", token);
    if (!token) {
        return res.status(401).json({ message: "unauthorised" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        console.log("decoded...", decoded);
        req.userId = decoded.userId;
        console.log("verifyToken...", req.userId);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};
exports.default = verifyToken;
