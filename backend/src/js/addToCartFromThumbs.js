const list = document.querySelector(".featured__list");



const cart = window.localStorage;
let orders = [];



list.addEventListener("click", addProductToCart);

function addProductToCart(e) {

    const element = e.target.parentElement

    const storage = cart.getItem("cart");

    if (storage) {
        const parsedStorage = JSON.parse(storage);
        console.log(parsedStorage);

        orders = [...parsedStorage];

    }

    const imgUrl = element.children[0].children[0].src;
    const title = element.children[1].innerHTML;
    const price = element.children[2].innerText;
    const normalPrice = price.slice(1);
    const quantity = 1;
    const total = quantity * normalPrice;



    const product = {
        imgUrl,
        title,
        price: normalPrice,
        quantity,
        total,

    };


    orders.push(product);


    cart.setItem("cart", JSON.stringify(orders));

}