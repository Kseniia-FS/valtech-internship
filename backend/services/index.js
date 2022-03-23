const getAllProducts = require("./getAllProducts");
const getAllCategories = require("./getAllCategories");
const getOneProduct = require("./getOneProduct");
const getProductsByCategory = require("./getProductsByCategory");
const createNewOrder = require("./createOrder");
const getOneProductByName = require("./getOneProductByName");
const getUserBonus = require("./getUserBonus");
const updateUserBonus = require("./updateUserBonus");

module.exports = {
    getAllProducts,
    getAllCategories,
    getOneProduct,
    getProductsByCategory,
    createNewOrder,
    getOneProductByName,
    getUserBonus,
    updateUserBonus
}