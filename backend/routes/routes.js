const express = require("express");

const { homePage, productsListPage } = require('../controllers')

const router = express.Router();


//GET /homepage
router.get("/homepage", homePage);

//GET Product List Page
router.get("/products", productsListPage)



module.exports = router;