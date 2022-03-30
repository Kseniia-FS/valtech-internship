import Notiflix from 'notiflix';
const compareTmp = require("../views/partials/favorite-item.hbs");


// Get products from local storage
const cart = window.localStorage;
const storage = cart.getItem("compare");
const parsedStorage = JSON.parse(storage);
let orders = [];

// Work with DOM
const compareTable = document.querySelector("#compare-table");

// Rendering products

if (!storage || storage === []) {
    const list = document.getElementById("compare-list");
    const title = document.getElementById("no-prod-title");
    list.innerHTML = '';
    list.appendChild(title.content);
} else {
    const markup = compareTmp(parsedStorage);
    compareTable.insertAdjacentHTML("beforeend", markup);
    const removeBtn = document.querySelector("#removeProductBtn");
    removeBtn.addEventListener("click", removeProduct);
    compareTable.addEventListener("click", addToCart);
    async function addToCart(e) {

        if (e.target.tagName.toLowerCase() === 'button') {
            const storage = cart.getItem("cart");

            if (storage) {
                const parsedStorage = JSON.parse(storage);
                orders = [...parsedStorage];
            }

            const productID = e.target.parentElement.getAttribute("data-name");
            await fetch(`http://localhost:5000/productID/${productID}`).then(res => res.json()).then(data => {
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
            cart.removeItem("compare");
            location.reload();
            return;
        }

        cart.setItem("compare", JSON.stringify(filteredProducts));
        location.reload();
    }
}