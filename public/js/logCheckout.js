
async function logCheckout(id) {
    initModalLog()
   
    const new_modal_import = document.querySelector('[new-modal-import-log]')
    new_modal_import.innerHTML = ""
   
    let logs = await fetch(`/api/checkout/${id}`)
    logs = await logs.json() 
   
    logs.forEach(log=>{
        let td = "";
        let tr = "";

        td += `<td>${log.identification}</td>` 
        td += `<td>${log.value}</td>`
        td += `<td>${log.status}</td>`
        td += `<td>${new Date(log.createdAt).toLocaleDateString('pt-br')}</td>`

        tr = `<tr>${td}</tr>`
        
        new_modal_import.insertAdjacentHTML('beforeend', tr)
    })

}

function initModalLog() {
    let new_modal_container = document.querySelector(`[new-modal-log]`)
    new_modal_container.style.display = new_modal_container.style.display == 'flex' ? 'none' : 'flex'

    const new_modal_close = document.querySelector(`[close-log]`)
    new_modal_close.onclick = () => {   
        new_modal_container.style.animation = "fadeOutOpacity 0.5s linear"
        setTimeout(() => {
            new_modal_container.style.display = 'none'
            new_modal_container.style.animation = "fadeInOpacity 0.5s linear"
        }, 400)
    }
}




