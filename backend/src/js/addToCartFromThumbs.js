import Notiflix from 'notiflix';
const products = require("../views/partials/product-thumb-pag.hbs");


const productList = document.querySelector("#productList");
const list = document.querySelector(".featured__list");
const loadMoreBtn = document.querySelector("#loadBtn");


const cart = window.localStorage;
let orders = [];


list.addEventListener("click", addProductToCart);

if (loadMoreBtn) {

    loadMoreBtn.addEventListener("click", loadMore);
}

function addProductToCart(e) {

    if (e.target.tagName.toLowerCase() === 'button') {
        const element = e.target.parentElement

        // Check if local storage is empty
        const storage = cart.getItem("cart");

        if (storage) {
            const parsedStorage = JSON.parse(storage);

            orders = [...parsedStorage];

        }


        // Set new object for adding to cart
        const imgUrl = element.children[0].children[0].src;
        const productUrl = element.children[0].href;
        const productId = element.children[0].href.split('=')[1];
        const title = element.children[1].innerHTML;
        const price = element.children[2].innerText;
        const normalPrice = price.slice(1);
        const quantity = 1;
        const total = quantity * normalPrice;



        const product = {
            productUrl,
            id: productId,
            imgUrl,
            title,
            price: normalPrice,
            quantity,
            total,

        };



        orders.push(product);

        // Writing added products to local storage
        cart.setItem("cart", JSON.stringify(orders));
        Notiflix.Notify.success('Product successfully added to cart');

    }


}

// Listener for loading more products
async function loadMore(e) {
    const page = Number(window.location.search.slice(6)[0]);
    const category = window.location.search.slice(26);


    await fetch(`http://localhost:5000/products-list?page=${page+1}&limit=16&category=${category}`, {
        headers: {
            'Content-Type': 'application/json',

        }
    }).then(res => res.json()).then(data => {

        const markup = products(data.data);
        productList.insertAdjacentHTML("beforeend", markup);


    })
}