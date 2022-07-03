const mongoose = require("mongoose");

let proSchema = new mongoose.Schema({
  name: {
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

let Laptops = mongoose.model("laptops", proSchema);

module.exports = { Laptops };
