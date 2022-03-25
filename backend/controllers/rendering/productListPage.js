const { getAllProducts, getProductsByCategory } = require("../../services");

const productListPage = async(req, res) => {
    const { category, page, limit } = req.query;
    let products;

    if (category === "all") {
        products = await getAllProducts(page, limit, );
    } else {
        products = await getProductsByCategory(category);
    }

    return res.render("productListPage", {
        products
    })
}

module.exports = productListPage;