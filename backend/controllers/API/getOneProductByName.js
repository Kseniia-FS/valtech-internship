const { getOneProductByName } = require("../../services")

const getOneProduct = async(req, res) => {
    const { search } = req.query;
    const product = await getOneProductByName(search);

    res.status(200).json({ data: product })
}

module.exports = getOneProduct;