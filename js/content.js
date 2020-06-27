//https://www.sitepoint.com/get-url-parameters-with-javascript/

async function fetchDetails() { 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id')   
    const res = await fetch('http://localhost:3000/users/' + id);
    const json = await res.json()
    return json
    //renderDetail(json)
}

/* -------------------- */

let tabUsers = null;

window.addEventListener('load', async () => {
    
    tabUsers = document.querySelector('#details')
    const user = await fetchDetails()
    renderDetail(user)

    const { picture, name:{first, last}, email, birth, phone, address:{street:{name, number, district}}, pass} = user;

    
    let variableDetail = document.getElementById('variable_detail')
    let frase = document.getElementById('frase')

    frase.innerText = 'Olá, meu nome é'
    variableDetail.innerText = first + ' ' + last

    //spread operation
    let arr = [...document.querySelectorAll(".content_button")]
    arr.forEach(e => e.addEventListener('mouseover', () => {
        event.stopPropagation()

        if (event.target.id === 'btn_name') {
            frase.innerText = 'Olá, meu nome é'
            variableDetail.innerText = first + ' ' + last
        }
        if (event.target.id === 'btn_email') {
            frase.innerText = 'O meu e-mail é'
            variableDetail.innerText = email
        }
        if (event.target.id === 'btn_birth') {
            frase.innerText = 'O meu nascimento foi dia'
            variableDetail.innerText = birth
        }
        if (event.target.id === 'btn_address') {
            frase.innerText = 'O meu endereço é'
            variableDetail.innerText = name + ', ' + number + ' - ' + district
        }
        if (event.target.id === 'btn_phone') {
            frase.innerText = 'O meu telefone é'
            variableDetail.innerText = phone
        }
        if (event.target.id === 'btn_pass') {
            frase.innerText = 'O minha senha é'
            variableDetail.innerText = pass
        }
        
    }))
});

function backIndexClick(){
    event.stopPropagation()
    window.location.href = "http://127.0.0.1:5500/allProjects/challenge1/pages/index.html"
}

function renderDetail(user) {
    let frase = '';
    let variableDetail = '';
    let detailsHTML = '<div>';

    const { picture, name:{first, last}, email, birth, phone, address:{street:{name, number, district}}, pass} = user;

    const userHTML = `
        <div class="content-photo-space">
            <img src="${picture}" id="content_photo">
        </div>
    
        <div class="content_name_space">
            <h2 id="frase">${frase}</h2>
            <h3 id="variable_detail">${variableDetail}</h3>
        </div>

        <div class="content-buttons-space">
            <button class="content_button">
                <ion-icon name="person-outline" class="content-buttons-img" id="btn_name"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="mail-outline" class="content-buttons-img" id="btn_email"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="calendar-outline" class="content-buttons-img" id="btn_birth"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="location-outline" class="content-buttons-img" id="btn_address"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="call-outline" class="content-buttons-img" id="btn_phone"></ion-icon>
            </button>
            <button class="content_button">
                <ion-icon name="key-outline" class="content-buttons-img" id="btn_pass"></ion-icon>
            </button>
        </div>
    `;
    detailsHTML += userHTML;
    tabUsers.innerHTML = detailsHTML;
}