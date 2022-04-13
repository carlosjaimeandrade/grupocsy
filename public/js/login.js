const view_password = document.querySelector('[view-password]')
view_password.onclick = e => {
    if (view_password.classList[1] == "fa-eye") {
        view_password.classList.remove('fa-eye')
        view_password.classList.add('fa-eye-slash')
    } else {
        view_password.classList.remove('fa-eye-slash')
        view_password.classList.add('fa-eye')
    }

    e.target.parentNode.children[1].type = e.target.parentNode.children[1].type == "password" ? "text" : "password"
}