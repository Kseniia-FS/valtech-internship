const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const product = new Schema({
    title: String,
    price: Number,
    descr: String,
    rating: Number,
    brand: String,
    category: String,
    collectionOf: String,
    image: String,
    images: Array
}, { versionKey: false, timestamps: true });

const Product = model("product", product);

module.exports = Product;