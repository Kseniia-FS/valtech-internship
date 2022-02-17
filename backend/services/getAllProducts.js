const Product = require("../models/Product");


const getAllProducts = async(pageNumber, onPerPage) => {
    const page = pageNumber > 0 ? ((pageNumber - 1) * onPerPage) : 0

    const products = await Product.find({}).skip(page).limit(onPerPage).lean();

    return products;
}

module.exports = getAllProducts;