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
const multer_1 = __importDefault(require("multer"));
const hotels_1 = __importDefault(require("../models/hotels"));
const auth_1 = __importDefault(require("../middleware/auth"));
const cloudinary = require("cloudinary").v2;
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
    },
});
// Endpoint to handle file upload
router.post("/upload", upload.single("file"), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }
        res.status(200).json({ message: "File uploaded successfully", file });
    }
    catch (error) {
        res.status(500).json({ message: "Error uploading file" });
    }
});
router.post("/", 
//need to check the name of the facility
upload.array("imageFiles"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const imageFile = req.files;
        const imageFiles = imageFile.toString().split(",");
        const newHotel = req.body;
        // console.log(newHotel);
        const facilities = req.body.facilities.toString().split(",");
        newHotel.facilities = facilities;
        // const imageUrls = await uploadImages(imageFiles);
        // newHotel.imageUrls = imageUrls;
        // newHotel.lastUpdated = new Date();
        //newHotel.userId = req.userId;
        //console.log(newHotel);
        // const hotel = new Hotel(newHotel);
        // await hotel.save();
        //res.status(201).send(hotel);
        res.status(200).json({ message: "Something went good" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}));
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hotels = yield hotels_1.default.find({ userId: req.userId });
        res.json(hotels);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.get("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.toString();
    try {
        const hotel = yield hotels_1.default.findOne({
            _id: id,
            userId: req.userId,
        });
        res.json(hotel);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching hotels" });
    }
}));
router.put("/:hotelId", auth_1.default, upload.array("imageFiles"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = yield hotels_1.default.findOneAndUpdate({
            _id: req.params.hotelId,
            userId: req.userId,
        }, updatedHotel, { new: true });
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        const files = req.files;
        const updatedImageUrls = yield uploadImages(files);
        //need to check the updated urls are storing or not
        // hotel.imageUrls = [
        //   ...updatedImageUrls,
        //   ...(updatedHotel.imageUrls || []),
        // ];
        yield hotel.save();
        res.status(201).json(hotel);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Hotel not found" });
    }
}));
function uploadImages(imageFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        cloudinary.config({
            cloud_name: "dcd41ekwu",
            api_key: "947198711632983",
            api_secret: "C7ltooqxJYjmuQFB0kYGJVjTi3c",
        });
        const uploadPromises = imageFiles.map((image) => __awaiter(this, void 0, void 0, function* () {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = yield cloudinary.uploader.upload(dataURI);
            return res.url;
        }));
        const imageUrls = yield Promise.all(uploadPromises);
        console.log(imageUrls);
        return imageUrls;
    });
}
exports.default = router;
