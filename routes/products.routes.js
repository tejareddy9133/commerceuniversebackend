const express = require("express");
const { UserModel } = require("../models/user.model");
const ProductRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { Authmiddleware } = require("../middleware/Auth");
const { ProductModel } = require("../models/product.model");

//get request
ProductRoutes.get("/", async (req, res) => {
  try {
    const { query, limit, page, category, sort, sortOrder } = req.query;

    // Build the search criteria
    let searchCriteria = {};
    if (query) {
      searchCriteria.title = { $regex: query, $options: "i" }; // Case-insensitive search on the title field
    }
    if (category) {
      searchCriteria.category = category;
    }

    // Pagination settings
    const pageLimit = parseInt(limit) || 10;
    const pageIndex = parseInt(page) || 1;
    const skip = (pageIndex - 1) * pageLimit;

    // Sorting settings
    let sortCriteria = {};
    if (sort) {
      const order = sortOrder === "desc" ? -1 : 1; // Default is ascending order
      sortCriteria[sort] = order;
    }

    // Fetch products based on search criteria, limit, pagination, and sorting
    const products = await ProductModel.find(searchCriteria)
      .limit(pageLimit)
      .skip(skip)
      .sort(sortCriteria);

    const totalProducts = await ProductModel.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalProducts / pageLimit);

    res.status(200).json({
      msg: "Data fetched successfully",
      data: {
        products,
        totalProducts,
        totalPages,
        currentPage: pageIndex,
      },
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//post
ProductRoutes.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const pd = await ProductModel(data);
    pd.save();
    res.status(200).json({ msg: "inserted new product sucessfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//edit
ProductRoutes.patch("/edit/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const items = await ProductModel.find();
    const item = await ProductModel.findByIdAndUpdate(_id, req.body);
    res.status(200).json({ msg: "edited sucessfully", item, items });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

//singleproduct
ProductRoutes.get("/single/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    if (_id) {
      const S_product = await ProductModel.findOne({ _id });
      res.status(200).json({ data: S_product });
    } else {
      res.status(400).json({ mag: "No id" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

ProductRoutes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const S_product = await ProductModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "producted deleted sucessfully" });
    } else {
      res.status(400).json({ mag: "No id" });
    }
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});
module.exports = { ProductRoutes };
