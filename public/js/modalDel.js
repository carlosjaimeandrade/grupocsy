window.onload = () => {
    const modal_del_btn = document.querySelectorAll('[modal-del-btn]')
    const modal_delete_container = document.querySelector('.modal-delete-container')
    const btn_cancel = document.querySelector('.btn-cancel')
    const btn_del = document.querySelector('.btn-del')
    const modal = document.querySelector('.list-container').id

    btn_cancel.onclick = () => {
        modal_delete_container.style.display = "none"
    }

<<<<<<< HEAD
    modal_del_btn.forEach(btn => {        
=======
    modal_del_btn.forEach(btn => {
>>>>>>> b059fa22962865ab6904bd4935b31950bef00a34
        btn.onclick = event => {
            let id = event.target.id
            btn_del.onclick = () => {
                window.location.href = `${modal}/delete/${id}`
            }
            modal_delete_container.style.display = modal_delete_container.style.display == 'flex' ? "none" : 'flex'
        }
    })


}