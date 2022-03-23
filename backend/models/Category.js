const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const category = new Schema({

    title: String,

}, { versionKey: false, timestamps: true });

const Category = model("category", category);

module.exports = Category;