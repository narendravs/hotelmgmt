"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./src/routes/auth"));
const hotels_1 = __importDefault(require("./src/routes/hotels"));
const my_bookings_1 = __importDefault(require("./src/routes/my-bookings"));
const my_hotels_1 = __importDefault(require("./src/routes/my-hotels"));
const users_1 = __importDefault(require("./src/routes/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "50mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
const port = 5000;
//connect mongoose database and check the connection return true or false
mongoose_1.default
    .connect(process.env.MONGODB_URI, {
// useNewUrlParser: true,
// useUnifiedTopology: true,
})
    .then(() => {
    console.log("Connected to MongoDB");
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/my-hotels", my_hotels_1.default);
app.use("/api/hotels", hotels_1.default);
app.use("/api/my-bookings", my_bookings_1.default);
app.get("/test", (req, res) => {
    res.send(path_1.default.join(__dirname, "../../frontend/index.html"));
});
app.get("/token", (req, res) => {
    const payload = { name: "narendra" };
    const secret = "narenn185";
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: "1h",
    });
    //res.status(200).json({ token: token });
    res.send(path_1.default.join(__dirname, "../../frontend/index.html"));
});
app.get("/checkToken", (req, res) => {
    var _a;
    const token = ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    console.log(token);
    const secret = "narenn185";
    try {
        const success = jsonwebtoken_1.default.verify(token, secret);
        res.status(200).json({ data: success });
    }
    catch (error) {
        res.status(401).json({ message: "invalid" });
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port} successfully`);
});
