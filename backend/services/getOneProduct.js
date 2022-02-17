const Product = require("../models/Product");

const getOneProduct = async(id) => {
    console.log(id);
    const product = await Product.findById(id).lean();
    console.log(product);
    return product;
}

module.exports = getOneProduct;