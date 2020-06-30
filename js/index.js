let tabUsers = null
let allUsers = []
let param = ''

const menu_mobile = document.getElementById('menu-mobile')
const menu_mobile_btn = document.getElementById('menu-mobile-btn')
menu_mobile_btn.addEventListener('click', () => {
    menu_mobile.classList.toggle('menu-mobile-open')
})

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#users')
    fetchDatabase(param)
});

async function fetchDatabase(param) {
    console.log(param)
    const res = await fetch('http://localhost:3000/users?' + param)
    const json = await res.json()
    mapUsers(json)
}

function mapUsers(json) {    
    allUsers = json.map(user => {
        const { id, picture, name:{first, last}, email, phone, address, all, attended, trash } = user;
        return {
            id: id,
            picture: picture,
            name: first,
            lastName: last,
            email: email,
            phone: phone,
            city: address.city,
            state: address.state,
            all: all,
            attended : attended,
            trash : trash,
        }
    });
    render()
}

function render() {
    renderUserList(allUsers)
}

function renderUserList(parameter) {
    let usersHTML = '<table>';
    parameter.forEach(user => {
        const { id, picture, name, email, phone, city, state } = user;
        const userHTML = `
                <tr class="line" onclick="lineClick(${user.id})"> 
                    <td class="td-photo">
                            <img src="${user.picture}" alt="${user.name}" class="td-photo-content" title="Foto do usuário">
                    </td>
                    <td class="td-name">
                        ${user.name}
                    </td>
                    <td class="td-email">${user.email}</td>
                    <td class="td-phone">${user.phone}</td>
                    <td class="td-city">${user.city} - ${user.state}</td>
                    <td class="td-buttons">
                        <button class="mark-button" title="Abrir detalhes" onclick="markClick(${user.id}, whatButton='all')" data-button="all">
                            <ion-icon name="apps-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button class="mark-button" title="Mover para Atendidos" onclick="markClick(${user.id}, whatButton='attended')" data-button="attended">
                            <ion-icon name="checkmark-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button class="mark-button" title="Mover para Lixeira" onclick="markClick(${user.id}, whatButton='trash')" data-button="trash">
                            <ion-icon name="trash-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                    </td>
                </tr>
        `;
        usersHTML += userHTML;
    })

    tabUsers.innerHTML = usersHTML;
}


// SEARCHING SPECIFIC USER BY NAME OR EMAIL
const searchBar = document.getElementById('searchBarInput')
const searchBarMobile = document.getElementById('searchBarInputMobile')


searchBar.addEventListener('keyup', search)
searchBarMobile.addEventListener('keyup', search)

function search(e) {
    const searchString = e.target.value.toLowerCase()
    const filteredUsers = allUsers.filter((user) => {
        return(
            user.name.toLowerCase().includes(searchString) ||
            user.lastName.toLowerCase().includes(searchString) ||
            user.email.toLowerCase().includes(searchString)
        )
    })
    renderUserList(filteredUsers)
}

function lineClick(id) {
    let user = allUsers.find(user => user.id === id)
    if (user) 
    window.location.href = "http://127.0.0.1:5500/allProjects/challenge1/pages/content.html?id=" + id
}

async function markClick(id, whatButton) {
    event.stopPropagation() 

    const res = await fetch('http://localhost:3000/users/' + id);
    const user = await res.json()
    let variable = whatButton

    userMontage(id, user, variable)
}

async function userMontage(id, user, variable){
    let {picture, gender, name:{first, last}, birth, address:{street:{name, number, district}, city, state, country}, phone, email, pass, all, attended, trash} = user;

    if (variable === 'all') {
        if (all === 'true'){
            all = 'false'
        }
        else if (all === 'false'){
            all = 'true'
        }
    }
    else if (variable === 'attended') {
        if (attended === 'true'){
            attended = 'false'
        }
        else if (attended === 'false'){
            attended = 'true'
        }
    }
    else if (variable === 'trash') {
        if (trash === 'true'){
            trash = 'false'
        }
        else if (trash === 'false'){
            trash = 'true'
        }
    }
    
    const putMethod = await {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify({
            "id": id,
            "picture": picture,
            "gender": gender,
            "name": {
              "first": first,
              "last": last
            },
            "birth": birth,
            "address": {
              "street": {
                "name": name,
                "number": number,
                "district": district
              },
              "city": city,
              "state": state,
              "country": country
            },
            "phone": phone,
            "email": email,
            "pass": pass,
            "all": all,
            "attended": attended,
            "trash": trash
        }) 
    }

    await putRequest(putMethod, id)
}

async function putRequest(putMethod, id) {
    
    await fetch('http://localhost:3000/users/' + id, putMethod)
        .then(response => response.json())
        .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it

}

function sideBarClick(){    
    let menu = event.target.parentNode.parentNode.getAttribute('data-menu')
    let param = menu + '=true'
    fetchDatabase(param)
}