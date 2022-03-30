const Product = require("../models/Product");

const getOneProduct = async(id) => {
    const product = await Product.findById(id).lean();

    return product;
}

module.exports = getOneProduct;