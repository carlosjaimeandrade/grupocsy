const open = document.querySelector('.menuHamburger i');

function toggleMobile(e) {
    const menu = document.querySelector('.menuItems');                  
    menu.classList.toggle('active');        
}

open.addEventListener('click', toggleMobile);