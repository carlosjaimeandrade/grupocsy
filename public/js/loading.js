function loading(event) {
    let empty = 0;
    const required = document.querySelectorAll('[required]')
    required.forEach(r => {
        if (r.type == "email") {
            if (validateEmail(r.value) == false) {
                empty++
            }
        }
        if (r.value == "") {
            empty++
        }
    })
    if (empty == 0) {
        if (event.target.tagName == 'BUTTON') {
            event.target.innerHTML = `<img class="loading" src="/img/loading.gif" >`
        }
        if (event.target.tagName == 'I') {
            event.target.parentNode.innerHTML = `<img class="loading" src="/img/loading.gif" >`
        }

    }

}

function loadingUpdate(event) {

    if (event.target.tagName == 'BUTTON') {
        event.target.innerHTML = `<img class="loading" src="/img/loading.gif" >`
    }
    if (event.target.tagName == 'I') {
        event.target.parentNode.innerHTML = `<img class="loading" src="/img/loading.gif" >`
    }


}


function validateEmail(email) {
    var re = /\S+@\S/;
    return re.test(email);
}