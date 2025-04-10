"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get("/me", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    console.log("userId......", userId);
    try {
        const user = yield users_1.default.findOne({ _id: userId });
        console.log("user..." + user);
        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "something went wrong" });
    }
}));
router.post("/register", [
    (0, express_validator_1.check)("firstName", "First Name is required").isString(),
    (0, express_validator_1.check)("lastName", "Last Name is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        const userExists = yield users_1.default.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).json({ message: "User alreday exists" });
        }
        const user = new users_1.default(req.body);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_cookie", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return res.status(200).json({ message: "User registered OK" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}));
exports.default = router;
