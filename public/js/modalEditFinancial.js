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
    const new_modal_import = document.querySelector('[new-modal-import]')
      let debts = await fetch(`/api/debts/${id}`)
      debts = await debts.json() 

    
    const elements = `
    <div class="new-modal-main">
        <div class="entry-content">
            <input name="id" type="hidden" value="${debts[0]['financials.id']}">
            <div class="entry-value entry-bd-2">
                <i class="fa-solid fa-file-signature"></i>
                <input required type="text" value="${debts[0]['financials.charge']}" name="charge" placeholder="nome da cobraça">
            </div>
            <div class="entry-value entry-bd-2">
                <i class="fa-solid fa-file-signature"></i>
                <input required type="text" value="${debts[0]['financials.description']}" name="description" placeholder="Descrição da cobraça">
            </div>
            <div class="entry-value entry-bd-2">
                <i class="fa-solid fa-calendar"></i>
                <input required type="date" value="${debts[0]['financials.dueDate']}" name="dueDate" placeholder="Data da cobrança">
            </div>
            <div class="entry-value entry-bd-2">
                <i class="fa-solid fa-sack-dollar"></i>
                <input required type="text" name="value" value="${debts[0]['financials.value']}" placeholder="Valor da cobraça" onKeyUp="mascaraMoeda(this, event)">
            </div>
        </div>
    </div>`

    new_modal_import.innerHTML = elements

}

