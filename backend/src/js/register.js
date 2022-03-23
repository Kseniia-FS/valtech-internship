import Notiflix from 'notiflix';

const storage = window.localStorage;
const formBtn = document.querySelector("#formBtn");
const loginBtn = document.querySelector("#loginBtn");
const modal = document.querySelector('[data-modal]');

const token = storage.getItem("token");

if (token) {
    loginBtn.textContent = "Logout";
} else {
    loginBtn.textContent = "Login";
}

formBtn.addEventListener("click", sendForm);
loginBtn.addEventListener("click", logout);

async function sendForm(e) {
    e.preventDefault();

    const name = document.querySelector("#name");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    if (!email.reportValidity()) {
        Notiflix.Notify.warning('Wrong email ');
        return;
    }



    const user = {
        name: name.value,
        password: password.value,
        email: email.value
    }


    await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {

        if (data.status === 401) {
            Notiflix.Notify.warning('Wrong email or password');
            return;
        }


        if (data.status) {
            Notiflix.Notify.warning(data.status[0].message);
            return;
        }
        Notiflix.Notify.success('You have successfully loged in');
        storage.setItem("token", JSON.stringify(data.data.token));
        storage.setItem("id", JSON.stringify(data.data.id));
        loginBtn.textContent = "Logout";
        location.reload();
    })

}

async function logout(e) {
    e.preventDefault();
    // console.log(e.currentTarget.textContent);
    if (e.currentTarget.textContent === "Logout") {

        modal.classList.add("is-hidden");

        const tokenFromStorage = storage.getItem("token");
        const token = JSON.parse(tokenFromStorage);


        await fetch("http://localhost:5000/logout", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },


        }).then(res => res.json()).then(data => {

            console.log(data, "777777777777")
            Notiflix.Notify.success('You have successfully loged out');
            storage.removeItem('token');
            storage.removeItem('id');
            loginBtn.textContent = "Login";
        })
    }
}