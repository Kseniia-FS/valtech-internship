import Notiflix from 'notiflix';
const storage = window.localStorage;
const ckeckoutBtn = document.querySelector("#ckeckoutBtn");

ckeckoutBtn.addEventListener("click", sendOrderToDB);

async function sendOrderToDB(e) {

    const preOrder = JSON.parse(storage.getItem("cart"));
    const userID = JSON.parse(storage.getItem("id"));

    if (!userID) {
        e.preventDefault();
        Notiflix.Notify.warning('Please, login');
        return;
    }
    const productsArray = preOrder.map((el) => {
        const id = el.id;
        const quantity = el.quantity;
        return [{ id, quantity }]
    });
    const totalSum = preOrder.reduce((acc, el) => { return acc += el.total }, 0)
    const newOrder = {
        completed: true,
        products: productsArray,
        totalSum,
        id: userID
    }

    await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrder)
    }).then(res => res.json()).then(_ => {
        Notiflix.Notify.success('Order successfully sent');
        storage.removeItem('cart');
    })
}