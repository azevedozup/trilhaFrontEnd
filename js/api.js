//https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo

let tabUsers = null;
let allUsers = [];

window.addEventListener('load', () => {
    tabUsers = document.querySelector('#users');
    fetchUsers();
});

function render() {
    renderUserList()
}

async function fetchUsers() {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
    const json = await res.json();
    allUsers = json.results.map(user => {
        const { picture, name, email, phone, location } = user;
        return {
            picture: picture.medium,
            name: name.first,
            email: email,
            phone: phone,
            city: location.city,
            state: location.state
        }
    });
    render()
    console.log(allUsers)
}

function renderUserList() {
    let usersHTML = '<table>';
    allUsers.forEach(user => {
        const { picture, name, email, phone, city, state } = user;
        const userHTML = `
                <tr>
                    <td class="td-photo">
                        <img src="${user.picture}" alt="${user.name}" class="td-photo-content" title="Foto do usuário">
                    </td>
                    <td class="td-name">${user.name}</td>
                    <td class="td-email">${user.email}</td>
                    <td class="td-phone">${user.phone}</td>
                    <td class="td-city">${user.city} - ${user.state}</td>
                    <td class="td-buttons">
                        <button title="Mover para atendidos">
                            <ion-icon name="apps-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button title="Mover para atendidos">
                            <ion-icon name="checkmark-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                        <button title="Mover para atendidos">
                            <ion-icon name="trash-outline" class="td-buttons-btn"></ion-icon>
                        </button>
                    </td>
                </tr>

                <tr class="tr-mobile">
                    <td>
                        <img src="${user.picture}" alt="${user.name}" class="content-photo-mobile" title="Foto do usuário">
                    </td>
                    <td title="Nome do Usuário" class="username">${user.name}</td>
                    <td>
                        <button title="Mover para atendidos">
                            <ion-icon name="apps-outline"></ion-icon>
                        </button>
                        <button title="Mover para atendidos">
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </button>
                        <button title="Mover para atendidos">
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </td>
                </tr>
        `;
        usersHTML += userHTML;
    })

    tabUsers.innerHTML = usersHTML;
}



