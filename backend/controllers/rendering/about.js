const { getAllProducts } = require("../../services");

const about = async(req, res) => {

    const { page, limit } = req.query;

    const products = await getAllProducts(page, limit);
    return res.render("about", {
        products
    })
}

module.exports = about;