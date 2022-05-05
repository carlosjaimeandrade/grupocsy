function newModal() {

    initTinyNew()

    let new_modal_container = document.querySelector(`[new-modal]`)
    new_modal_container.style.display = new_modal_container.style.display == 'flex' ? 'none' : 'flex'

    const new_modal_close = document.querySelector(`[close-modal]`)
    new_modal_close.onclick = () => {
        new_modal_container.style.animation = "fadeOutOpacity 0.5s linear"
        setTimeout(() => {
            new_modal_container.style.display = 'none'
            new_modal_container.style.animation = "fadeInOpacity 0.5s linear"
        }, 400)

    }

}

function initTinyNew() {
    
    tinymce.init({
        language: 'pt_BR',
        selector: "#post",
        plugins: [
            'advlist autolink link image lists print hr searchreplace wordcout fullscreen insertdatetime media save table paste emoticons'
        ],
        height: "290"
    })
}
