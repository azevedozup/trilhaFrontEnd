const menu_mobile = document.getElementById('menu-mobile')
const menu_mobile_btn = document.getElementById('menu-mobile-btn')

// when click menu btn, show nav and hide searchbar
menu_mobile_btn.addEventListener('click', () => {
    menu_mobile.classList.toggle('menu-mobile-open')
})