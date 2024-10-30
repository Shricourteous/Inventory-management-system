import mongoose from "mongoose";

export const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    brand: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductSale", productSchema);
