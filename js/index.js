let tabUsers = null
let allUsers = []
let param = ''
const inButtons = {all:false, attended:false, trash:false}

const menu_mobile = document.getElementById('menu-mobile')
const menu_mobile_btn = document.getElementById('menu-mobile-btn')
menu_mobile_btn.addEventListener('click', () => {
    menu_mobile.classList.toggle('menu-mobile-open')
})

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#users')
    fetchDatabase(param).then(parameter => renderUserList(parameter))
    console.log('RELOAD')
});

async function fetchDatabase(param) {
    const res = await fetch('http://localhost:3000/users?' + param)
    return allUsers = await res.json()
}

function renderUserList(parameter) {
    let usersHTML = '<table>';
    parameter.forEach(user => {
        const { id, picture, name:{first, last}, email, phone, address:{street:{name, number, district}, city, state, country} } = user;
        const userHTML = `
                <tr class="line" onclick="lineClick(${user.id})"> 
                    <td class="td-photo">
                            <img src="${user.picture}" alt="${first}" class="td-photo-content" title="Foto do usuário">
                    </td>
                    <td class="td-name">
                        ${first}
                    </td>
                    <td class="td-email">${user.email}</td>
                    <td class="td-phone">${user.phone}</td>
                    <td class="td-city">${city} - ${state}</td>
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
    let user = allUsers.filter((user) => {
        return(
            user.name.first.toLowerCase().includes(searchString) ||
            user.name.last.toLowerCase().includes(searchString) ||
            user.email.toLowerCase().includes(searchString)
        )
    })
    renderUserList(user)
}

function lineClick(id) {
    let user = allUsers.find(user => user.id === id)
    if (user) 
    window.location.href = "http://127.0.0.1:5500/allProjects/challenge1/pages/content.html?id=" + id
}

async function markClick(id, whatButton) {
    event.stopPropagation() 
    event.preventDefault()
    
    const res = await fetch('http://localhost:3000/users/' + id);
    const user = await res.json()
    let variable = whatButton

    userMontage(id, user, variable)
}

function userMontage(id, user, variable){
    
    buttonMarkClick(variable)

    const putMethod = {
        method: 'PUT', // Method itself
        headers: {
         'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
        },
        body: JSON.stringify({
            ...user,...inButtons
        }) 
    }

    putRequest(putMethod, id)
}

function buttonMarkClick(variable){
    
    if (variable === 'all') {
        return inButtons.all = true
    }
    else if (variable === 'attended') {
        return inButtons.attended = true
    }
    else if (variable === 'trash') {
        return inButtons.trash = true
    }
}

async function putRequest(putMethod, id) {  
    const response = fetch('http://localhost:3000/users/' + id, putMethod)
}

async function sideBarClick(){    
    let menu = event.target.parentNode.parentNode.getAttribute('data-menu')
    let param = menu + '=true'
    await fetchDatabase(param)
    await renderUserList(allUsers)
}