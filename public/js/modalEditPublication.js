async function newModalEdit(id) {
    initTiny()
    initModalEdit()


    let publication = await fetch(`/api/publication/${id}`)
    publication = await publication.json()
    console.log(publication)


}

function initTiny() {
    tinymce.remove()
    tinymce.init({
        language: 'pt_BR',
        selector: "#edit",
        plugins: [
            'advlist autolink link image lists print hr searchreplace wordcout fullscreen insertdatetime media save table paste emoticons'
        ],
        height: "290"
    })
}

function initModalEdit() {
    const new_modal_content = document.querySelector('.new-modal-content')
    let new_modal_container = document.querySelector(`[new-modal-edit]`)
    new_modal_container.style.display = new_modal_container.style.display == 'flex' ? 'none' : 'flex'

    const new_modal_close = document.querySelector(`[close-edit]`)
    new_modal_close.onclick = () => {
        new_modal_container.style.animation = "fadeOutOpacity 0.5s linear"
        new_modal_content.style.animation = "fadeInOut 0.5s linear"
        setTimeout(() => {
            new_modal_container.style.display = 'none'
            new_modal_container.style.animation = "fadeInOpacity 0.5s linear"
            new_modal_content.style.animation = "fadeIn 0.5s linear"
        }, 400)
    }
}