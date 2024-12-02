const express = require("express");
const router = express.Router();
const Product = require("../models/product"); // Import the Product model

// POST route to create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Assuming all product data is sent in the body
    await newProduct.save();
    res.status(201).json(newProduct); // Respond with the created product
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ message: "Error creating product", error: err.message });
  }
});

// GET route to fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Respond with the list of products
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});

// DELETE route to delete a product by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
});

module.exports = router; // Export the router
