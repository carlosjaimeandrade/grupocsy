
window.onload = async() => {
    console.log('ola')
    const import_city = document.querySelector('[import-city]')
  
    const ufs = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
    ufs_json = await ufs.json();
    ufs_json.forEach(uf => {
        import_city.insertAdjacentHTML("beforeend", `<option value="${uf.sigla}">${uf.sigla}</option>`)
    })

    const uf_select = document.querySelector('[uf-select]')
    const city_select = document.querySelector('[city-select]')
    const city_select_import = document.querySelector('[city-select-import]')

    uf_select.oninput = async e => {
        if (e.target.value != "") {
            const uf = e.target.value;
            const citys = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`)
            citys_json = await citys.json();
            city_select_import.innerHTML = `<option value="">Cidade</option>`;
            citys_json.forEach(city => {
                city_select_import.insertAdjacentHTML("beforeend", `<option value="${city.nome}">${city.nome}</option>`)
            })
            city_select.classList.remove('display-none')
        } else {
            city_select.classList.add('display-none')
        }
    }
}