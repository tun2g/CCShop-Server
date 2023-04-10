const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "doisii14ts",
  api_key: "624655822659164",
  api_secret: "y__qjC6mBj8tbiXQbkD2-W-kVqM"
});

module.exports = cloudinary;