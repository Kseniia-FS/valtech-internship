const express = require("express");

const tokenValidation = require("../middlewares/tokenValidation");
const authValidation = require("../middlewares/authValidation");
const { addOrder, getOneProduct, logout, registerOrLogin, getProductsForPagination, getBonus, getOneProductById } = require('../controllers/API');
const { homePage, productsListPage, productPage, shoppingCart, checkout, completed, compare, newArrivals, about, map, favorite } = require('../controllers/rendering');




const router = express.Router();


//API***********************************************************************************************************

// GET Checkout
router.get("/checkout", checkout)

// GET Completed order
router.get("/completed", completed)

// POST register or login user
router.post("/register", authValidation, registerOrLogin)

//GET logout user
router.get("/logout", tokenValidation, logout)

// POST create new user order
router.post("/order", addOrder)

//GET Products pagination
router.get("/products-list", getProductsForPagination);

// GET Find product by name
router.get("/product-search", getOneProduct)

// GET User bonus
router.get("/bonus", tokenValidation, getBonus);

// GET one product by id
router.get("/productID/:productID", getOneProductById)

//RENDERING*************************************************************************************************

//GET /homepage
router.get("/homepage", homePage);

//GET Product List Page
router.get("/products", productsListPage);

// GET Product Details Page
router.get("/product", productPage);

//GET Shopping Cart
router.get("/cart", shoppingCart);

// GET New Arrivals
router.get("/new-arrivals", newArrivals);

// GET Anout Us
router.get("/about", about);

//GET Our Shops
router.get("/shops", map);

// GET Favorite products
router.get("/favorite", favorite);

// GET Compare products
router.get("/compare", compare);





module.exports = router;