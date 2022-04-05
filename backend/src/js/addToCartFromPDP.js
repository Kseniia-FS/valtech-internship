import Notiflix from 'notiflix';

const productPrice = document.querySelector("#changedPrice");
const productImage = document.querySelector("#pdpImage");
const productTitle = document.querySelector("#pdpTitle");
const button = document.querySelector("#addToCart");
const quantityInput = document.querySelector("#quantity");
const productIdElem = document.querySelector("#productID");

const cart = window.localStorage;
let orders = []; // Array of orders for local storage

button.addEventListener("click", addToCart);

function addToCart(e) {
    const totalProductSum = Number(productPrice.textContent) * quantityInput.textContent;
    const storage = cart.getItem("cart");

    if (storage) {
        const parsedStorage = JSON.parse(storage);
        orders = [...parsedStorage];
    }

    const productId = productIdElem.href.split('=')[1];
    const product = { // Collect items to normalize product for local storage
        productUrl: window.location.href,
        id: productId,
        imgUrl: productImage.src,
        title: productTitle.textContent,
        price: Number(productPrice.textContent),
        quantity: quantityInput.textContent,
        total: totalProductSum,
    };

    orders.push(product);
    cart.setItem("cart", JSON.stringify(orders));
    Notiflix.Notify.success('Product successfully added to cart');
}