const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddcjlsnvg",
  api_key: "865353848935418",
  api_secret: "bDtIoavqKU93ZeIFPWsaaQ_QkSQ",
});

function uploadToCloudinary(filePath) {
  // e.g. "/public/18979813-12312.jpeg"
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}
exports.uploadToCloudinary = uploadToCloudinary;
