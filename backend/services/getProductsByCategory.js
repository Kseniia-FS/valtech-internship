const Product = require("../models/Product");


const getProductsByCategory = async(categoryName) => {


    const products = await Product.find({ category: categoryName }).lean();


    return products;
}

module.exports = getProductsByCategory;