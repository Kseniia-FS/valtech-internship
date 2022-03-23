const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const quantityInput = document.querySelector("#quantity");


plusBtn.addEventListener("click", increment);
minusBtn.addEventListener("click", decrement);


let counterValue = 1;


// let paramsString = document.location.search;
// let searchParams = new URLSearchParams(paramsString);

// function addTtoCart(e) {
//     if (e.target.type === "button") {
//         // console.log(e.currentTarget.children)
//         const productId = searchParams.get("productID");

//         const product = getOneProduct(productId);

//     }
// }

function increment() {
    counterValue += 1;
    quantityInput.textContent = counterValue;
    if (counterValue <= 0) {
        quantityInput.textContent = 1;
    }


}

function decrement() {
    counterValue -= 1;

    quantityInput.textContent = counterValue;

    if (counterValue <= 0) {
        quantityInput.textContent = 1;
    }

}