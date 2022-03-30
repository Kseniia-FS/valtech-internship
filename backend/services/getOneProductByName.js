const Product = require("../models/Product");

const getOneProductByName = async(value) => {
    const correctValue = value[0].toUpperCase() + value.slice(1);
    const product = await Product.find({ "title": { $regex: correctValue } });

    return product;
}

module.exports = getOneProductByName;