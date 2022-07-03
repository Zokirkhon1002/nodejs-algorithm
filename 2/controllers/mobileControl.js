const { Mobiles } = require("../models/mobileSchema");

// Method: GET
// Desc:   Get all mobiles
const getAllMobiles = async (req, res) => {
  try {
    let data = await Mobiles.find();

    res.status(200).json({
      msg: "success",
      data,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: POST
// Desc:   Add new mobile phone
const addNewMobile = async (req, res) => {
  try {
    const { title, category, price, urls } = req.body;

    const newMobile = await Mobiles.create({
      title,
      category,
      price,
      urls,
    });

    const savedMobile = await newMobile.save();

    res.status(201).json({
      msg: "added successfully",
      added: savedMobile,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: GET
// Desc:   Get a mobile by id
const getMobileById = async (req, res) => {
  try {
    const { id } = req.params;

    const mobile = await Mobiles.findById(id);

    if (!mobile) {
      return res.status(404).json({
        msg: "Not Found",
      });
    }

    return res.status(200).json({
      msg: "success",
      mobile,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: DELETE
// Desc:   Removing a mobile by id
const removeMobileById = async (req, res) => {
  try {
    const { id } = req.params;

    let removedMobile = await Mobiles.findByIdAndRemove(id);

    if (!removedMobile) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }

    return res.status(200).json({
      msg: "deleted successfully",
      removed: removedMobile,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: PUT
// Desc:   Updating a mobile by id
const updateMobileById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, price, urls } = req.body;

    const updatedMobile = await Mobiles.findByIdAndUpdate(id, {
      title,
      category,
      price,
      urls,
    });

    if (!updatedMobile) {
      return res.status(404).json({
        msg: "Not Found!",
      });
    }

    return res.status(200).json({
      msg: "updated successfully",
      updatedMobile,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getAllMobiles,
  addNewMobile,
  getMobileById,
  removeMobileById,
  updateMobileById,
};
