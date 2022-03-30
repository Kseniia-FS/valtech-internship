const products = require("../views/partials/product-thumb-pag.hbs");
import BASE_URL from './../../cofig/url';

const cart = window.localStorage;

const priceList = document.querySelector("#priceList");
const ratingList = document.querySelector("#rating-list");
const productList = document.querySelector("#productList");
const loadMoreBtn = document.querySelector("#loadBtn");

priceList.addEventListener("click", filterByPrice);
ratingList.addEventListener("click", filterByRating);

function filterByRating(e) {
    const rating = e.target.value;
    const productsStorage = cart.getItem("productList");
    const parsedProducts = JSON.parse(productsStorage);

    if (!parsedProducts.length) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get("category");
        fetchProducts(category).then(res => res.json()).then(data => {
            const filteredProducts = data.data.filter(el => el.rating === Number(rating));
            productList.innerHTML = "";

            if (filteredProducts.length <= 16) {
                loadMoreBtn.classList.add("no-btn")
            }

            const markup = products(filteredProducts);
            productList.insertAdjacentHTML("afterbegin", markup);
        })
        return;
    }

    const filteredProducts = parsedProducts.filter(el => el.rating === Number(rating));
    productList.innerHTML = "";
    if (filteredProducts.length <= 16) {
        loadMoreBtn.classList.add("no-btn")
    }

    const markup = products(filteredProducts);
    productList.insertAdjacentHTML("afterbegin", markup);
}


function filterByPrice(e) {
    const allProductsBtn = e.target.textContent.trim();
    const category = window.location.search.slice(26);

    if (allProductsBtn.includes("All")) {
        const price = [0];
        const secondPrice = 1500;
        getProducts(category, price, secondPrice)

        return;
    }

    const prices = e.target.value.split("-");
    const price = prices.map((el) => el);
    const secondPrice = price[1];

    getProducts(category, price, secondPrice);
}

// Helper for rendering products after fetching
function getProducts(category, price, secondPrice) {
    fetchProducts(category).then(res => res.json()).then(data => {
        const productsList = data.data;
        const filteredProducts = productsList.filter((el) => {
            return el.price >= price[0] && el.price <= secondPrice
        })

        productList.innerHTML = "";
        if (filteredProducts.length <= 16) {
            loadMoreBtn.classList.add("no-btn")
        }

        cart.setItem("productList", JSON.stringify(filteredProducts));
        const markup = products(filteredProducts);
        productList.insertAdjacentHTML("afterbegin", markup);
    })
}

// Helper for getting products from API
async function fetchProducts(category) {
    return await fetch(`${BASE_URL}/products-list?page=1&limit=16&category=${category}`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
}