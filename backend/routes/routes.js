const express = require("express");

const { homePage, productsListPage, productPage, shoppingCart, checkout, completed } = require('../controllers')

const router = express.Router();


//GET /homepage
router.get("/homepage", homePage);

//GET Product List Page
router.get("/products", productsListPage);

// GET Product Details Page
router.get("/product", productPage);

//GET Shopping Cart
router.get("/cart", shoppingCart);

// GET Checkout
router.get("/checkout", checkout)

// GET Completed order
router.get("/completed", completed)



module.exports = router;