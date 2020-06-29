const menu_mobile = document.getElementById('menu-mobile')
const menu_mobile_btn = document.getElementById('menu-mobile-btn')

// when click menu btn, show nav and hide searchbar
menu_mobile_btn.addEventListener('click', () => {
    menu_mobile.classList.toggle('menu-mobile-open')
})

//https://randomuser.me

let tabUsers = null;
let allUsers = [];

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#users');
    fetchUsers();
});

function render() {
    renderUserList(allUsers)
}

async function fetchUsers() {    
    const res = await fetch('http://localhost:3000/users'); 
    const json = await res.json();

    allUsers = json.map(user => {
        //console.log(user)

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
    //console.log(allUsers)
}

function renderUserList(parameter) {
    let usersHTML = '<table>';
    parameter.forEach(user => {
        const { id, picture, name, email, phone, city, state } = user;
        const userHTML = `
                <tr class="line" onclick="lineClick()" data-login="${user.id}"> 
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
                        <button class="all" title="Abrir detalhes" onclick="allClick()">
                            <ion-icon name="apps-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button class="attended" title="Mover para Atendidos" onclick="attendedClick()">
                            <ion-icon name="checkmark-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button class="trash" title="Mover para Lixeira" onclick="trashClick()">
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

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()
    const filteredUsers = allUsers.filter((user) => {
        return(
            user.name.toLowerCase().includes(searchString) ||
            user.lastName.toLowerCase().includes(searchString) ||
            user.email.toLowerCase().includes(searchString)
        )
    })
    renderUserList(filteredUsers)
})

searchBarMobile.addEventListener('keyup', (e) => {
    const searchStringMobile = e.target.value.toLowerCase()
    const filteredUsersMobile = allUsers.filter((user) => {
        return(
            user.name.toLowerCase().includes(searchStringMobile) ||
            user.lastName.toLowerCase().includes(searchStringMobile) ||
            user.email.toLowerCase().includes(searchStringMobile)
        )
    })
    renderUserList(filteredUsersMobile)
})


//onkeypress
function searchClick() {    
    event.stopPropagation()
    
    //fazer evento de pesquisa com a o texto digitado na barra

    alert("Pesquisando usuário!")
}

function lineClick() {
    event.stopPropagation() 

    let line = event.target //navegando até a tr
    let login = line.getAttribute('data-login') //pegando o id

    if (login === null) {
        line = event.target.parentNode
        login = line.getAttribute('data-login')
    } //tratando se o click foi na td

    let user = allUsers.find(user => user.id === login)
    if (user) 
    window.location.href = "http://127.0.0.1:5500/allProjects/challenge1/pages/content.html?id=" + login
}


function allClick() {
    event.stopPropagation()    

    let line = event.target.parentNode.parentNode.parentNode //navegando até a tr
    let login = line.getAttribute('data-login') //pegando o uuid
    let index = allUsers.findIndex(user => user.id === login) // busca o usuario por login no array
    if (index > -1) allUsers.splice(index, 1) // remove o usuario do array
    line.remove(line) // remove a linha do table

    //fazer com que a linha removida, vá para todos
}


function attendedClick() {
    event.stopPropagation()    

    let line = event.target.parentNode.parentNode.parentNode //navegando até a tr
    let login = line.getAttribute('data-login') //pegando o uuid
    let index = allUsers.findIndex(user => user.id === login) // busca o usuario por login no array
    if (index > -1) allUsers.splice(index, 1) // remove o usuario do array
    line.remove(line) // remove a linha do table
    
    //filter

    //fazer com que a linha removida, vá para atendidos
}

function trashClick() {
    event.stopPropagation()    

    let line = event.target.parentNode.parentNode.parentNode //navegando até a tr
    let login = line.getAttribute('data-login') //pegando o uuid
    let index = allUsers.findIndex(user => user.id === login) // busca o usuario por login no array
    if (index > -1) allUsers.splice(index, 1) // remove o usuario do array
    line.remove(line) // remove a linha do table

    //fazer com que a linha removida, vá para lixeira
}

