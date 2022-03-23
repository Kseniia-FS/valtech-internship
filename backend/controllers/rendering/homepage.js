const { getAllProducts } = require("../../services");

const homePage = async(req, res) => {

    const products = await getAllProducts(1, 16);

    return res.render("index", {
        products,
    })
}

module.exports = homePage;