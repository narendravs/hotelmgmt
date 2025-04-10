"use strict";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "dcd41ekwu",
    api_key: "947198711632983",
    api_secret: "C7ltooqxJYjmuQFB0kYGJVjTi3c",
});
module.exports = cloudinary;
