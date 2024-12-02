const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: function () {
      return this.category !== "Pizza"; // Price required for non-pizza categories
    },
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // Image URL of the product
    validate: {
      validator: function (v) {
        // Allow URLs with query parameters or fragments (e.g., ?w=300&h=300)
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(v);
      },
      message: (props) => `${props.value} is not a valid image URL!`,
    },
  },
  
  description: {
    type: String,
    required: true,
  },
  smallPrice: {
    type: Number,
    required: function () {
      return this.category === "Pizza"; // Only for Pizza
    },
  },
  mediumPrice: {
    type: Number,
    required: function () {
      return this.category === "Pizza"; // Only for Pizza
    },
  },
  largePrice: {
    type: Number,
    required: function () {
      return this.category === "Pizza"; // Only for Pizza
    },
  },
});

// Custom validation to ensure at least one pizza size price is provided
productSchema.pre("validate", function (next) {
  if (this.category === "Pizza") {
    if (!this.smallPrice && !this.mediumPrice && !this.largePrice) {
      next(new Error("At least one pizza size price (small, medium, large) must be provided"));
    } else {
      next();
    }
  } else {
    next();
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
