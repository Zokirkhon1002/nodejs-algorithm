import { Products, validateProduct } from "../modules/productSchema.js";

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
      state: true,
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
        msg: "Not Found!",
        data: products,
      });
    }
    const filteredProducts = products.filter(
      ({ title: i, category: c }) =>
        i.toLowerCase().includes(j.toLowerCase()) ||
        c.toLowerCase().includes(j.toLowerCase())
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
      return res.status(401).json({
        state: false,
        msg: error.details[0].message,
        data: [],
      });
    }
    const { title, price, url, category } = body;

    const newProduct = await Products.create({
      title,
      price,
      url,
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

    if (!savedProduct) {
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
// Method: DELETE
// Desc:   Removing a laptop by id
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;

    let removedProduct = await Products.findByIdAndRemove(id);

    if (!removedProduct) {
      return res.status(404).json({
        state: false,
        msg: "Not Found!",
        data: [],
      });
    }

    return res.status(200).json({
      state: true,
      msg: "deleted successfully",
      data: removedProduct,
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
    const { title, price, category, url } = req.body;

    const updatedProduct = await Products.findByIdAndUpdate(id, {
      title,
      category,
      price,
      url,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        state: false,
        msg: "Not Found!",
        data: [],
      });
    }

    return res.status(200).json({
      state: true,
      msg: "updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    res.send(err);
  }
};
export {
  getAllProducts,
  getProductByCategory,
  getProductBySearch,
  addNewProduct,
  deleteProductById,
  updateLaptopById,
};
