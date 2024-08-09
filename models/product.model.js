const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: Date,
  reviewerName: String,
  reviewerEmail: String,
});

const dimensionsSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
});

const metaSchema = new mongoose.Schema({
  createdAt: Date,
  updatedAt: Date,
  barcode: String,
  qrCode: String,
});

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: dimensionsSchema,
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [reviewSchema],
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: metaSchema,
  images: [String],
  thumbnail: String,
});

const ProductModel = mongoose.model("products", productSchema);

module.exports = { ProductModel };
