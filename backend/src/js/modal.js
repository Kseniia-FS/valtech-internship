import Notiflix from 'notiflix';


(() => {
    const refs = {
        openModalBtn: document.querySelector('[data-modal-open]'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
    };

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
    }
})();

const storage = window.localStorage;
const bonusBtn = document.querySelector("#userBonus");

bonusBtn.addEventListener("click", getBonus);

async function getBonus(e) {
    const tokenFromStorage = storage.getItem("token");
    const token = JSON.parse(tokenFromStorage);

    if (!token) {
        Notiflix.Notify.warning('Please, sign in first!');
        return;
    }

    await fetch("http://localhost:5000/bonus", {

        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).then(data => {
        console.log(data)
        if (data.status === 404) {
            Notiflix.Notify.warning("Sorry, you don't have bonus yet!");
            return;
        }
        Notiflix.Notify.success(`You bonus is ${data.data.bonus}`);
        return;

    })
}