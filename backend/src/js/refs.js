export default function getRefs() {
    return {
        list: document.querySelector(".featured__list"),
        plusBtn: document.getElementById("plus"),
        minusBtn: document.getElementById("minus"),
        quantityInput: document.querySelector("#quantity"),
        productCard: document.querySelector(".product__card")
    }
}