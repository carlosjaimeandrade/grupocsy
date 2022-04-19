function ResetCampos() { for (var o = document.getElementsByTagName("input"), e = 0; e < o.length; e++) "text" == o[e].type && (o[e].style.backgroundColor = "", o[e].style.borderColor = "") }

function coresMask(o) {
    var e = o.value,
        r = e.length,
        t = o.maxLength;
    0 == r ? (o.style.borderColor = "", o.style.backgroundColor = "") : r < t ? (o.style.borderColor = corIncompleta, o.style.backgroundColor = corIncompleta) : (o.style.borderColor = corCompleta, o.style.backgroundColor = corCompleta)
}

function mascara(o, e, r, t) {
    var l = e.selectionStart,
        a = e.value;
    a = a.replace(/\D/g, "");
    var s = a.length,
        c = o.length;
    window.event ? id = r.keyCode : r.which && (id = r.which), cursorfixo = !1, l < s && (cursorfixo = !0);
    var n = !1;
    if ((16 == id || 19 == id || id >= 33 && id <= 40) && (n = !0), ii = 0, mm = 0, !n) {
        if (8 != id)
            for (e.value = "", j = 0, i = 0; i < c && ("#" == o.substr(i, 1) ? (e.value += a.substr(j, 1), j++) : "#" != o.substr(i, 1) && (e.value += o.substr(i, 1)), 8 == id || cursorfixo || l++, j != s + 1); i++);
        t && coresMask(e)
    }
    cursorfixo && !n && l--, e.setSelectionRange(l, l)
}
var corCompleta = "#99ff8f",
    corIncompleta = "#eff70b";


window.onload = async() => {
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