const links = document.querySelectorAll('ul li');
const pageID = document.querySelector('main').id;        

for(let link of links) {

    link.classList.remove('active');

    if(link.dataset.active == pageID) {
        link.classList.add('active');
    }

}

const userAction =  document.querySelector('.user-name');

function toggleMobile(div) {
    const menu = document.querySelector(div);                  
    menu.classList.toggle('active');        
}

userAction.addEventListener('mouseenter', () => toggleMobile('.user-name .user-actions'));
userAction.addEventListener('mouseleave', () => toggleMobile('.user-name .user-actions'));