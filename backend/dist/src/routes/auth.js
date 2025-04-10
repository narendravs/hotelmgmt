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
const express_validator_1 = require("express-validator");
const users_1 = __importDefault(require("../models/users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = __importDefault(require("../middleware/auth"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post("/login", [
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6,
        max: 12,
    }),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
        console.log(email);
        const user = yield users_1.default.findOne({ email: email });
        console.log(user);
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });
        res.cookie("auth_cookie", token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production",
            secure: true,
            maxAge: 86400000,
        });
        return res.status(200).json({ userId: user._id, token: token });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/validate-token", auth_1.default, (req, res) => {
    res.status(200).send({ userId: req.userId });
});
router.post("/logout", (req, res) => {
    res.cookie("auth_cookie", "", {
        expires: new Date(0),
    });
    res.status(200).send();
});
exports.default = router;
