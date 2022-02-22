const shoppingCart = require("../views/partials/cart-item.hbs");

const cart = window.localStorage;
const storage = cart.getItem("cart");
const parsedStorage = JSON.parse(storage);


const cartTable = document.querySelector("#cart-table");


const markup = shoppingCart(parsedStorage);

cartTable.insertAdjacentHTML("beforeend", markup);