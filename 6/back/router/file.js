// @ts-nocheck
const express = require("express");
const router = express.Router();
const { Files, validateFile } = require("../models/fileSchema");
const fs = require("fs");
const cloudinary = require("../cloudinary");
const upload = require("../multer");

router.get("/", async (req, res) => {
  try {
    const products = await Files.find();
    if (!products.length) {
      return res.json({ msg: "Empty", data: products, state: false });
    }
    res.json({ msg: "Success", data: products, state: true });
  } catch {
    res.json("something went wrong");
  }
});

router.post("/", upload.array("image"), async (req, res) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "photos");
    const urls = [];
    if (req.files) {
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }
    const { error } = validateFile(req.body);
    if (error) {
      return res.json({
        msg: error.details[0].message,
        product: {},
        state: false,
      });
    }
    const { title } = req.body;
    const newProduct = await Files.create({
      title,
      urls,
    });
    const savedProduct = await newProduct.save();
    res.json({ msg: "Successfully saved", product: savedProduct, state: true });
  } catch {
    res.json("something went wrong");
  }
});

module.exports = router;
