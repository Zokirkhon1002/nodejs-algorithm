// @ts-nocheck
require("dotenv/config");


let [key, secret, cloudName] = [
  process.env.API_KEY,
  process.env.API_SECRET,
  process.env.CLOUD_NAME,
];

const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: cloudName,
  api_key: key,
  api_secret: secret,
});

exports.uploads = (file, folder) => {
  return new Promise (resolve => {
    cloudinary.uploader.upload(file,(result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      folder: folder,
      quality: "70:qmax_70"
    })
  })
}