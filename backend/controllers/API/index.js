const registerOrLogin = require("./register");
const logout = require("./logout");
const addOrder = require("./addOrder");
const getProductsForPagination = require("./getProducts");
const getOneProduct = require("./getOneProductByName");
const getBonus = require("./getUserBonus");
const getOneProductById = require("./getOneProductById");

module.exports = { addOrder, getOneProduct, logout, registerOrLogin, getProductsForPagination, getBonus, getOneProductById }