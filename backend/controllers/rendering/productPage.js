const { getOneProduct, getAllProducts } = require("../../services");

const productPage = async(req, res) => {
    const { productID } = req.query;
    const product = await getOneProduct(productID);
    const products = await getAllProducts(2, 4);

    return res.render("productPage", {
        product,
        products
    })
}

module.exports = productPage;