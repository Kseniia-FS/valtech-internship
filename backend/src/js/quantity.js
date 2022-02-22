import getRefs from "./refs";
const refs = getRefs();


refs.plusBtn.addEventListener("click", increment);
refs.minusBtn.addEventListener("click", decrement);
refs.productCard.addEventListener("click", addTtoCart);

let counterValue = 1;


let paramsString = document.location.search;
let searchParams = new URLSearchParams(paramsString);

function addTtoCart(e) {
    if (e.target.type === "button") {
        // console.log(e.currentTarget.children)
        const productId = searchParams.get("productID");

        const product = getOneProduct(productId);
        console.log(product);
    }
}

function increment() {
    counterValue += 1;
    refs.quantityInput.textContent = counterValue;
    if (counterValue <= 0) {
        refs.quantityInput.textContent = 1;
    }


}

function decrement() {
    counterValue -= 1;

    refs.quantityInput.textContent = counterValue;

    if (counterValue <= 0) {
        refs.quantityInput.textContent = 1;
    }

}