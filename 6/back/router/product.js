// @ts-nocheck
const express = require("express");
const router = express.Router();
const { Products, validateProduct } = require("../models/productSchema");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const products = await Products.find();
    if (!products.length) {
      return res.json({ msg: "Empty", data: products, state: false });
    }
    res.json({ msg: "Success", data: products, state: true });
  } catch {
    res.json("something went wrong");
  }
});

router.get("/sort", async (req, res) => {
  try {
    let products = await Products.find({
      price: { $gte: 500 },
      category: { $in: ["laptop", "phone"] },
    })
      .limit()
      .sort({ title: 1 })
      .select({ title: 1, price: 1, url: 1, category: 1 });

    if (!products) {
      return res.json({ msg: "Empty", data: products, state: false });
    }

    res.json({ state: true, data: products, msg: "success" });
  } catch (err) {
    res.json("something went wrong");
  }
});

router.get("/category/:name", async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.name });
    if (!products.length) {
      return res.json({
        msg: "This category is not defined",
        data: products,
        state: false,
      });
    }
    res.json({ msg: "Success", data: products, state: true });
  } catch {
    res.json("something went wrong");
  }
});

// Search | query
router.get("/search", async (req, res) => {
  try {
    const products = await Products.find();

    const filterProducts = products.filter((item) =>
      item.title.toLowerCase().includes(req.query.title.toLowerCase())
    );

    if (!filterProducts.length) {
      return res.json({
        msg: "This product is not defined",
        data: filterProducts,
        state: false,
      });
    }
    res.json({ msg: "Success", data: filterProducts, state: true });
  } catch {
    res.json("something went wrong");
  }
});

// pagination
router.get("/seemore", async (req, res) => {
  try {
    let totalPage = await Products.countDocuments({});
    const products = await Products.find().limit(
      req.query.page * req.query.count
    );
    res.json({ msg: "Success", data: { products, totalPage }, state: true });
  } catch (err) {
    res.json("something went wrong");
  }
});

// pagination2 with buttons
router.get("/with-buttons", async (req, res) => {
  try {
    let pageSize = req.query.pageSize || 4;
    let pageNumber = req.query.pageNumber || 1;
    let total = await Products.countDocuments({});
    let btnCount = Math.ceil(total / pageSize);

    const products = await Products.find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    res.json({ msg: "Success", data: { products, btnCount }, state: true });
  } catch (err) {
    res.json("something went wrong");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateProduct(req.body);
    if (error) {
      return res.json({
        msg: error.details[0].message,
        product: {},
        state: false,
      });
    }
    const { title, price, category, url } = req.body;
    const newProduct = await Products.create({
      title,
      price,
      category,
      url,
    });
    const savedProduct = await newProduct.save();
    res.json({ msg: "Successfully saved", product: savedProduct, state: true });
  } catch {
    res.json("something went wrong");
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletePro = await Products.findByIdAndRemove(req.params.id);
    res.json({ msg: "Successfully deleted", data: deletePro, state: true });
  } catch {
    res.json("something went wrong");
  }
});

// Update products
router.put("/update/:id", async (req, res) => {
  try {
    const { title, price, category, url } = req.body;
    const updatePro = await Products.findByIdAndUpdate(req.params.id, {
      title,
      price,
      category,
      url,
    });
    res.json({ msg: "Successfully updated", data: updatePro, state: true });
  } catch (err) {
    res.json({ msg: "This product is not defined", data: {}, state: false });
  }
});

module.exports = router;
