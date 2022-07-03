const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    min: 3,
  },
  urls: {
    type: Array,
    required: true,
  },
});

const Mobiles = mongoose.model("mobiles", mobileSchema);

module.exports = { Mobiles };
