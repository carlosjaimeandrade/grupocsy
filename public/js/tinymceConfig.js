tinymce.init({
    language: 'pt_BR',
    selector: "#post",
    plugins: [
        'advlist autolink link image lists print hr searchreplace wordcout fullscreen insertdatetime media save table paste emoticons'
    ],
    height: "290"
})

function newPost() {
    let new_post_container = document.querySelector('[new-post]')
    new_post_container.style.display = new_post_container.style.display == 'flex' ? 'none' : 'flex'
}


const new_post_close = document.querySelector('[close]')
let new_post_container = document.querySelector('[new-post]')
new_post_close.onclick = () => {
    new_post_container.style.display = 'none'
}