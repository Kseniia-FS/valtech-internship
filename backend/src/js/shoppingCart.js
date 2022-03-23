const shoppingCart = require("../views/partials/cart-item.hbs");


// Get products from local storage
const cart = window.localStorage;
const storage = cart.getItem("cart");
const parsedStorage = JSON.parse(storage);

// Work with DOM
const cartTable = document.querySelector("#cart-table");
const total = document.querySelector("#total");
const chekoutBtn = document.querySelector("#checkoutBtn");




// Rendering products

if (!storage) {
    cartTable.innerHTML = `<h2 style="text-align: center; margin-bottom: 200px; font-size: 42px; color: var(--accent-color); font-weight: bold;">Ooops, you didn't add any product!</h2>`;
}
const markup = shoppingCart(parsedStorage);
cartTable.insertAdjacentHTML("beforeend", markup);


// DOM elems after rendering products
const itemSum = document.querySelectorAll("#itemSum");



// Render total sum of all products
getTotalSum();


// Add listener for increment or decrement quantity of products
cartTable.addEventListener("click", changeQuantityAndTotalSum);


function changeQuantityAndTotalSum(e) {

    if (e.target.id === "plus") {
        const parent = e.target.parentElement.parentElement;
        const refs = getRefs(parent);


        const quantityInput = refs.quantityInputElement.textContent;
        const productId = refs.productUrl.href.split("=")[1];
        const price = Number(refs.priceElement.textContent.slice(1));
        const quantity = increment(refs.quantityInputElement, quantityInput, productId);


        refs.plusBtn.addEventListener("click", increment);


        let totalSum;
        totalSum = quantity * price;

        refs.totalSumOfProductElement.innerHTML = `$${totalSum}`;
        getTotalSum();
        setLocalStorage(productId, quantity, totalSum)

        refs.plusBtn.removeEventListener("click", increment);

    }

    if (e.target.id === "minus") {
        const parent = e.target.parentElement.parentElement;
        const refs = getRefs(parent);

        const price = Number(refs.priceElement.textContent.slice(1));
        const productId = refs.productUrl.href.split("=")[1];
        const quantityInput = refs.quantityInputElement.textContent;
        const quantity = decrement(refs.quantityInputElement, quantityInput, productId);


        refs.minusBtn.addEventListener("click", decrement);


        let totalSum;
        totalSum = quantity * price;

        refs.totalSumOfProductElement.innerHTML = `$${totalSum}`;
        getTotalSum();
        setLocalStorage(productId, quantity, totalSum);
        refs.minusBtn.removeEventListener("click", increment);

    }

    if (e.target.id === "removeProductSvg") {
        const parent = e.target.parentElement.parentElement.parentElement;
        const refs = getRefs(parent);
        const productId = refs.productUrl.href.split("=")[1];
        console.log(productId);
        removeProductFromCart(productId);
    }

    if (e.target.id === "removeProduct") {
        const parent = e.target.parentElement.parentElement.parentElement.parentElement;
        const refs = getRefs(parent);
        const productId = refs.productUrl.href.split("=")[1];
        console.log(productId);
        removeProductFromCart(productId);
    }

}


// Helpers
function getRefs(parent) {
    return {
        minusBtn: parent.querySelector("#minus"),
        plusBtn: parent.querySelector("#plus"),
        priceElement: parent.querySelector("#productPrice"),
        productUrl: parent.querySelector("#productId"),
        totalSumOfProductElement: parent.querySelector("#itemSum"),
        quantityInputElement: parent.querySelector("#quantity"),
    }


}

function getTotalSum() {
    let totalSumOfAllProducts = 0;

    for (let i = 0; i < itemSum.length; i += 1) {
        const totalSumOfOneProduct = itemSum[i].textContent.slice(1);
        totalSumOfAllProducts += Number(totalSumOfOneProduct);

    }

    total.innerHTML = `$${totalSumOfAllProducts}`;
}

function setLocalStorage(productId, quantity, totalSum) {
    parsedStorage.map(el => {
        if (el.id === productId) {
            el.quantity = quantity;
            el.total = totalSum;
        }
    })


    cart.setItem("cart", JSON.stringify(parsedStorage));
}

function removeProductFromCart(productId) {

    const filteredProducts = parsedStorage.filter(el => {
        console.log("remove")
        return el.id !== productId;
    });

    if (filteredProducts.length === 0) {
        cart.removeItem("cart");
        location.reload();
        return;
    }

    cart.setItem("cart", JSON.stringify(filteredProducts));
    location.reload();
}

function increment(quantityInputElement, quantityInput, productId) {
    let counterValue = Number(quantityInput);
    counterValue += 1;
    quantityInputElement.textContent = counterValue;

    if (counterValue <= 0) {
        removeProductFromCart(productId);
    }

    return counterValue;

}


function decrement(quantityInputElement, quantityInput, productId) {
    let counterValue = Number(quantityInput);
    counterValue -= 1;
    quantityInputElement.textContent = counterValue;
    if (counterValue <= 0) {
        removeProductFromCart(productId);
    }

    return counterValue;

}