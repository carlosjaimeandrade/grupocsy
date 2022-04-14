function toggleMobile(div) {
    const menu = document.querySelector(div);                  
    menu.classList.toggle('active');        
}

const open = document.querySelector('.menuHamburger i');
const showEmpresas = document.querySelector('.menuListItem');

open.addEventListener('click', () => toggleMobile('.menuItems'));

showEmpresas.addEventListener('click', (e) => e.preventDefault());
showEmpresas.addEventListener('mouseenter', () => toggleMobile('.menuListItem .list'));
showEmpresas.addEventListener('mouseleave', () => toggleMobile('.menuListItem .list'));


