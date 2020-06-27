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

        const { id, picture, name, email, phone, address, attended, trash } = user;
        return {
            id: id,
            picture: picture,
            name: name.first,
            email: email,
            phone: phone,
            city: address.city,
            state: address.state,
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

