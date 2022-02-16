const express = require("express");

const homePageController = require('../controllers/homepage')

const router = express.Router();


//GET /homepage
router.get("/homepage", homePageController);



module.exports = router;