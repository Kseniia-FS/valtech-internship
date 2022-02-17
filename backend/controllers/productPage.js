const { getOneProduct } = require("../services");

const productPage = async(req, res) => {

    const { productID } = req.params;
    console.log(productID);

    const product = await getOneProduct(productID);


    return res.render("productPage", {
        product
    })
}

module.exports = productPage;