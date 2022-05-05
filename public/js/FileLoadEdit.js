function onLoadFileEdit(event) {
    const elementInsert = document.querySelector("[log-arq-edit] ")
    console.log('ola')
    if (event.target.files.length > 0) {
        elementInsert.innerText = event.target.files.length + " arquivo carregado "
    } else {
        elementInsert.innerText = " "
    }
}