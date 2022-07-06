const { Products, validateProduct } = require("../models/productsSchema");

// Method: GET
// Desc:   Get all Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();

    if (!products.length) {
      return res.status(404).json({
        state: false,
        msg: "Not Found",
        data: products,
      });
    }

    res.status(200).json({
      state: false,
      msg: "successfully found",
      data: products,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: GET
// Desc:   Get a product by Category
const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Products.find({ category });

    if (!products.length) {
      return res.status(404).json({
        state: false,
        msg: "Not Found",
        data: products,
      });
    }

    res.status(200).json({
      state: true,
      msg: "successfully found!",
      data: products,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: GET
// Desc:   Get a product by Search {query string}
const getProductBySearch = async (req, res) => {
  try {
    const products = await Products.find();
    const { title: j } = req.query;

    if (!products.length) {
      return res.status(404).json({
        state: false,
        msg: "Not Found",
        data: products,
      });
    }
    const filteredProducts = products.filter(({ title: i }) =>
      i.toLowerCase().includes(j.toLowerCase())
    );

    if (!filteredProducts.length) {
      return res.status(404).json({
        state: false,
        msg: "Not Found!",
        data: filteredProducts,
      });
    }

    res.status(200).json({
      state: true,
      msg: "successfully found!",
      data: filteredProducts,
    });
  } catch (err) {
    res.send(err);
  }
};

// Method: POST
// Desc:   create a new product
const addNewProduct = async (req, res) => {
  try {
    const { body } = req;
    const { error } = validateProduct(body);

    if (error) {
      return res.status(401).json(error.details[0].message);
    }
    const { title, price, category } = body;

    const newProduct = await Products.create({
      title,
      price,
      category,
    });

    if (!newProduct) {
      return res.status(401).json({
        state: false,
        msg: "can not added",
        data: newProduct,
      });
    }

    const savedProduct = await newProduct.save();

    if (!newProduct) {
      return res.status(401).json({
        state: false,
        msg: "can not saved",
        data: savedProduct,
      });
    }

    res.json({
      state: true,
      msg: "successfully created",
      data: savedProduct,
    });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  getAllProducts,
  addNewProduct,
  getProductByCategory,
  getProductBySearch,
};
