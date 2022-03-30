import Notiflix from 'notiflix';
const favoriteTmp = require("../views/partials/favorite-item.hbs");


// Get products from local storage
const cart = window.localStorage;
const storage = cart.getItem("favorite");
const parsedStorage = JSON.parse(storage);
let orders = [];

// Work with DOM
const favoriteTable = document.querySelector("#favorite-table");

// Rendering products

if (!storage || storage === []) {
    const list = document.getElementById("favorite-list");
    const title = document.getElementById("no-prod-title");
    list.innerHTML = '';
    list.appendChild(title.content);
} else {
    const markup = favoriteTmp(parsedStorage);
    favoriteTable.insertAdjacentHTML("beforeend", markup);
    const removeBtn = document.querySelector("#removeProductBtn");
    const addToCartBtn = document.querySelector("#addBtn");
    removeBtn.addEventListener("click", removeProduct);
    addToCartBtn.addEventListener("click", addToCart);

    async function addToCart(e) {
        const productID = e.target.parentElement.getAttribute("data-name");
        await fetch(`http://localhost:5000/productID/${productID}`).then(res => res.json()).then(data => {
            const storage = cart.getItem("cart");

            if (storage) {
                const parsedStorage = JSON.parse(storage);
                orders = [...parsedStorage];
            }

            const { image, title, price } = data.data;
            const quantity = 1;
            const product = {
                productUrl: `http://localhost:5000/product/${productID}`,
                id: productID,
                imgUrl: image,
                title,
                price,
                quantity,
                total: quantity * price,

            };

            orders.push(product);
            cart.setItem("cart", JSON.stringify(orders));
            Notiflix.Notify.success('Product successfully added to cart');
        })
    }

    function removeProduct(e) {
        const productId = e.currentTarget.getAttribute('data-name');
        removeProductFromCart(String(productId));
    }

    function removeProductFromCart(productId) {
        const filteredProducts = parsedStorage.filter(el => {
            return el._id !== productId;
        });

        if (filteredProducts.length === 0) {
            cart.removeItem("favorite");
            location.reload();
            return;
        }

        cart.setItem("favorite", JSON.stringify(filteredProducts));
        location.reload();
    }
}