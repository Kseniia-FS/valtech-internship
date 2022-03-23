import Notiflix from 'notiflix';

const products = require("../views/partials/product-thumb-pag.hbs");
const productList = document.querySelector("#productList");
const searchInput = document.querySelector("#search");
const serachForm = document.querySelector("#search-form");

serachForm.addEventListener("submit", onSearch);



const url = window.location.href.slice(21)

if (url.includes("products")) {
    searchInput.classList.add("search-visible")
}

async function onSearch(e) {
    e.preventDefault();

    const searchQuery = searchInput.value;

    if (searchQuery.trim() === '') {
        Notiflix.Notify.warning('Please, enter correct query');
        return;
    }



    await fetch(`http://localhost:5000/product-search?search=${searchQuery}`, {
        headers: {
            'Content-Type': 'application/json',

        }
    }).then(res => res.json()).then(data => {

        const markup = products(data.data);
        productList.insertAdjacentHTML("afterbegin", markup);
        searchInput.value = "";

    })

}