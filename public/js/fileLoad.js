function onLoadFile(event) {
    const elementInsert = document.querySelector("[log-arq] ")

    if (event.target.files.length > 0) {
        elementInsert.innerText = event.target.files.length + " arquivo carregado "
    } else {
        elementInsert.innerText = " "
    }
}