function newModalEdit(id) {
    initModalEdit()
    importModal(id)

}

function initModalEdit() {
    let new_modal_container = document.querySelector(`[new-modal-edit]`)
    new_modal_container.style.display = new_modal_container.style.display == 'flex' ? 'none' : 'flex'

    const new_modal_close = document.querySelector(`[close-edit]`)
    new_modal_close.onclick = () => {
        new_modal_container.style.animation = "fadeOutOpacity 0.5s linear"
        setTimeout(() => {
            new_modal_container.style.display = 'none'
            new_modal_container.style.animation = "fadeInOpacity 0.5s linear"
        }, 400)
    }
}

async function importModal(id) {

    let inputs = QueryAll('#users #edit .login-input input');
    let select = Query('#users #edit .login-input select');

    fetch(`/api/user/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
                
            inputs[0].value = response.email;
            inputs[1].value = response.name;                        

            if(response.level == 1) {
                select.options[1].selected = true;
            } else {
                select.options[0].selected = true;
            }

        })
        .catch((error) => {
            alert(error.message);
        })
}

function Query(params) {
    return document.querySelector(params);
};

function QueryAll(params) {
    return document.querySelectorAll(params);
};