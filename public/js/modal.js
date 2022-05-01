function newModal(identification) {

    let new_modal_container = document.querySelector(`[new-modal-${identification}]`)
    new_modal_container.style.display = new_modal_container.style.display == 'flex' ? 'none' : 'flex'
    const new_modal_close = document.querySelector(`[close-${identification}]`)
    new_modal_close.onclick = () => {
        new_modal_container.style.display = 'none'
    }


}