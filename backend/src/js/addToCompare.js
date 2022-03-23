import Notiflix from 'notiflix';
const cart = window.localStorage;
let orders = [];

const list = document.querySelector(".featured__list");

list.addEventListener("click", addToCompare);

async function addToCompare(e) {

    const storage = cart.getItem("compare");
    if (storage) {
        const parsedStorage = JSON.parse(storage);

        orders = [...parsedStorage];

    }

    if (e.target.getAttribute('data-name') === "compare") {

        const element = e.target.parentElement.parentElement;

        const productId = element.children[0].href.split('=')[1];


        await fetch(`http://localhost:5000/productID/${productId}`).then(res => res.json()).then(data => {



            const product = data.data;

            orders.push(product);


            cart.setItem("compare", JSON.stringify(orders));
            Notiflix.Notify.success('Product successfully added to compare list');

        })
    }
}