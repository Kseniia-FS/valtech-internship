const { getAllProducts } = require("../services");

const productListPage = async(req, res) => {

    const products = await getAllProducts(1, 16);

    return res.render("productListPage", {
        products
    })
}

module.exports = productListPage;