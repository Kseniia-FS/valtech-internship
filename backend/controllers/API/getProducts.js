const { getAllProducts, getProductsByCategory } = require("../../services");

const getProductsForPagination = async(req, res) => {
    const { category, page, limit } = req.query;
    let products;

    if (category === "all") {
        products = await getAllProducts(page, limit);
    } else {
        products = await getProductsByCategory(category);
    }

    return res.json({
        data: products
    })
}

module.exports = getProductsForPagination;