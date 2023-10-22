const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        default: ""
    },

  }
);

module.exports = mongoose.model("Reviews", reviewsSchema);