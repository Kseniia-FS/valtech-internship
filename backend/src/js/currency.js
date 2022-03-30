import API_KEY from './../../cofig/API_KEY';

const storage = window.localStorage;
const currencyFromStorage = storage.getItem("currency");
const selectedList = document.querySelector("#currency");
selectedList.addEventListener("change", onSelectCurrency);

if (storage.getItem("currency")) {
    const productID = "#currencySymbol";
    const prodValue = JSON.parse(currencyFromStorage);
    const option = document.getElementById(prodValue);
    option.setAttribute("selected", true);
    setLocalStorage(productID, prodValue)
}

async function onSelectCurrency(e) {
    const selectedCurrency = e.target.value;

    if (selectedCurrency !== "currency") {
        storage.setItem("currency", JSON.stringify(selectedCurrency));
        const prodID = "#currencySymbol";
        setLocalStorage(prodID, selectedCurrency);

        await fetch(`http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,UAH,EUR,AED,GBP,CZK`).then(res => res.json()).then(data => {
            const rates = data.rates;
            const priceList = document.querySelectorAll("#changedPrice");
            Array.from(priceList).map(el => {
                const firstPrice = el.getAttribute("data-value");
                el.innerText = Math.floor(Number(firstPrice) * rates[selectedCurrency]);
            })
        })
    }
}

function setLocalStorage(productId, value) {
    const list = document.querySelectorAll(productId);
    Array.from(list).map(el => el.innerText = value);
}