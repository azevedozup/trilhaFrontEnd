//https://www.sitepoint.com/get-url-parameters-with-javascript/

async function fetchDetails() { 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')   
    const res = await fetch('http://localhost:3000/users/' + id);
    const json = await res.json()
    return json
}

/* -------------------- */

let tabUsers = null;

window.addEventListener('load', async () => {
    
    tabUsers = document.querySelector('#details')
    const user = await fetchDetails()
    renderDetail(user)

    const { picture, name:{first, last}, email, birth, phone, address:{street:{name, number, district}}, pass} = user;

    //spread operation
    let arr = [...document.querySelectorAll(".content_button")]

    let button = document.getElementById('btn_name')
    button.classList.add("content_button_color")

    arr.forEach(e => {        
        e.querySelector(".content-buttons-img").addEventListener('mouseover', setDivName)
    })
});

function setDivName (event) {
    const lastButton = document.querySelector('.content_button_color')
    const btnName = document.getElementById('btn_name')
    const frase = document.getElementById('frase')
    const variableDetail = document.getElementById('variable_detail')
    frase.innerText = event.target.getAttribute('data-frase')
    variableDetail.innerText = event.target.getAttribute('data-variable')
    btnName.classList.remove("content_button_color")
    lastButton.classList.remove("content_button_color")
    event.target.classList.add("content_button_color")
}

function backIndexClick(){
    window.location.href = "http://127.0.0.1:5500/allProjects/challenge1/pages/index.html"
}

function renderDetail(user) {
    const { picture, name:{first, last}, email, birth, phone, address:{street:{name, number, district}}, pass} = user;

    const frase = 'Olá, meu nome é';
    const variableDetail = first + ' ' + last;
    let detailsHTML = '<div>';

    const userHTML = `
        <div class="content-photo-space">
            <img src="${picture}" id="content_photo">
        </div>
    
        <div class="content_name_space">
            <h2 id="frase">${frase}</h2>
            <h3 id="variable_detail">${variableDetail}</h3>
        </div>

        <div class="content-buttons-space">
            <button class="content_button content_button_color">
                <ion-icon name="person-outline" class="content-buttons-img" data-frase="Olá, meu nome é" data-variable="${first + ' ' + last}" id="btn_name"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="mail-outline" class="content-buttons-img" data-frase="O meu e-mail é" data-variable="${first + ' ' + last}" id="btn_email"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="calendar-outline" class="content-buttons-img" data-frase="O meu nascimento foi dia" data-variable="${first + ' ' + last}" id="btn_birth"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="location-outline" class="content-buttons-img" data-frase="O meu endereço é" data-variable="${first + ' ' + last}" id="btn_address"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="call-outline" class="content-buttons-img" data-frase="O meu telefone é" data-variable="${first + ' ' + last}" id="btn_phone"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="key-outline" class="content-buttons-img" data-frase="A minha senha é" data-variable="${first + ' ' + last}" id="btn_pass"></ion-icon>
            </button>
        </div>
    `;
    detailsHTML += userHTML;
    tabUsers.innerHTML = detailsHTML;
}