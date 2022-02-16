const Category = require("../models/Category");

const getAllCategories = async() => {

    const categories = await Category.find().lean();

    return categories;
}

module.exports = getAllCategories;