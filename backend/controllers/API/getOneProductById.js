const { getOneProduct } = require("../../services");

const getOneProductById = async(req, res) => {
    const { productID } = req.params

    console.log(productID)
    const product = await getOneProduct(productID);

    res.status(200).json({ data: product })
}

module.exports = getOneProductById;