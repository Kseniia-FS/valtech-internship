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
    favoriteTable.innerHTML = `<h2 style="text-align: center; margin-bottom: 200px; font-size: 42px; color: var(--accent-color); font-weight: bold;">Ooops, you didn't add any product!</h2>`;
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