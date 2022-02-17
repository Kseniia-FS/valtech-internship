const express = require("express");

const { homePage, productsListPage, productPage } = require('../controllers')

const router = express.Router();


//GET /homepage
router.get("/homepage", homePage);

//GET Product List Page
router.get("/products", productsListPage);

// GET one product
router.get("/product/:productID", productPage)



module.exports = router;