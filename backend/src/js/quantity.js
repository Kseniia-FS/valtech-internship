const plusBtn = document.querySelector("#plus");
const minusBtn = document.querySelector("#minus");
const quantityInput = document.querySelector("#quantity");

plusBtn.addEventListener("click", increment);
minusBtn.addEventListener("click", decrement);

let counterValue = 1;

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