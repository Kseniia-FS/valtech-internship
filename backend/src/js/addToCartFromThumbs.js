import getRefs from "./refs";

const refs = getRefs();



const cart = window.localStorage;
let orders = [];



refs.list.addEventListener("click", addProductToCart);

function addProductToCart(e) {
    const products = e.currentTarget;

    const storage = cart.getItem("cart");

    if (storage) {
        const parsedStorage = JSON.parse(storage);

        orders = [...parsedStorage];

    }

    const imgUrl = products.children[0].href;
    const title = products.children[1].innerHTML;
    const price = products.children[2].innerText;

    const product = {
        imgUrl,
        title,
        price,
        quantity: 1
    };

    orders.push(product);

    cart.setItem("cart", JSON.stringify(orders));

}