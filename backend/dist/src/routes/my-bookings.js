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
const auth_1 = __importDefault(require("../middleware/auth"));
const hotels_1 = __importDefault(require("../models/hotels"));
const router = express_1.default.Router();
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotels_1.default.find({
            booking: { $elemMatch: { userId: req.userId } },
        });
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((bookings) => bookings.userId === req.userId);
            const hotelWithUserBookings = Object.assign(Object.assign({}, hotel.toObject()), { bookings: userBookings });
            return hotelWithUserBookings;
        });
        res.status(200).send(results);
    }
    catch (error) {
        res.status(500).json({ message: "Unable to fetch bookings" });
    }
}));
exports.default = router;
