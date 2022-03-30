const { getAllProducts } = require("../../services");

const newArrivals = async(req, res) => {
    const { page, limit } = req.query;
    const products = await getAllProducts(page, limit);

    return res.render("newArrivals", {
        products
    })
}

module.exports = newArrivals;