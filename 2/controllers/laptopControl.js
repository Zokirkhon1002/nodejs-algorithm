const { Laptops } = require("../models/laptopSchema");

// Method: GET
// Desc:   Get all Laptops
const getAllLaptops = async (req, res) => {
  try {
    let data = await Laptops.find();

    res.status(200).json({
      msg: "success",
      data,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: POST
// Desc:   Add new laptop
const addNewLaptop = async (req, res) => {
  try {
    const { name, category, price, urls } = req.body;

    const newLaptop = await Laptops.create({
      name,
      category,
      price,
      urls,
    });

    const savedLaptop = await newLaptop.save();

    res.status(201).json({
      msg: "added successfully",
      added: savedLaptop,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: GET
// Desc:   Get a laptop by id
const getLaptopById = async (req, res) => {
  try {
    const { id } = req.params;

    const laptop = await Laptops.findById(id);

    if (!laptop) {
      return res.status(404).json({
        msg: "Not Found",
      });
    }

    return res.status(200).json({
      msg: "success",
      laptop,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: DELETE
// Desc:   Removing a laptop by id
const removeLaptopById = async (req, res) => {
  try {
    const { id } = req.params;

    let removedLaptop = await Laptops.findByIdAndRemove(id);

    if (!removedLaptop) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }

    return res.status(200).json({
      msg: "deleted successfully",
      removed: removedLaptop,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: PUT
// Desc:   Updating a laptop by id
const updateLaptopById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category, urls } = req.body;

    const updatedLaptop = await Laptops.findByIdAndUpdate(id, {
      name,
      category,
      price,
      urls,
    });

    if (!updatedLaptop) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }

    return res.status(200).json({
      msg: "updated successfully",
      updatedLaptop,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getAllLaptops,
  addNewLaptop,
  getLaptopById,
  removeLaptopById,
  updateLaptopById,
};
