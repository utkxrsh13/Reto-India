const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [{
    productId: String,
    title: String,
    price: Number,
    quantity: Number,
    image1: String
  }]
});

module.exports = mongoose.model("Cart", CartSchema);