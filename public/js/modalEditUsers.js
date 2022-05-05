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
    let publication = await fetch(`/api/publication/${id}`)
    publication = await publication.json()


    const elements = `
    <div class="entry-content">
        <div class="entry-value entry-bd-1">
            <i class="fa-solid fa-file-signature"></i>
            <input required value="${publication.title}" type="text" name="title" placeholder="Título">
        </div>
        <div class="entry-value entry-bd-1"><i class="fa-solid fa-table-list"></i>
            <select name="category" id="">
            <option value="">Categoria</option>
            <option ${publication.category == "blog" ? "selected" : ""} value="blog">Blog</option>
            <option ${publication.category == "empreendimentos" ? "selected" : ""} value="empreendimentos">Empreendimentos</option>
            <option ${publication.category == "projetos-futuros" ? "selected" : ""} value="projetos-futuros">Projetos futuros</option>
        </select>
        </div>
        <div class="entry-value entry-bd-1 preview-image">
            <div>
                <i class="fa-solid fa-image"></i>
                <label class="upload-file-edit" for="image-edit">Atualizar... <span log-arq-edit></span></label>
                <input oninput="onLoadFileEdit(event)" class="display-none" id="image-edit" type="file" name="file">
            </div>
            <div>
                <a target="_blank" href="/upload/publication/${publication.id}/${publication.nameImage}"><i class="fa-solid fa-eye"></i></a>
            </div>
        </div>
    </div>
    <textarea id="edit" name="text">${publication.text}</textarea>`

    new_modal_import.innerHTML = elements

}

