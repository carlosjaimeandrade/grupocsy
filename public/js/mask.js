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


String.prototype.reverse = function() {
    return this.split('').reverse().join('');
};

function mascaraMoeda(campo, evento) {
    var tecla = (!evento) ? window.event.keyCode : evento.which;
    var valor = campo.value.replace(/[^\d]+/gi, '').reverse();
    var resultado = "";
    var mascara = "##.###.###,##".reverse();
    for (var x = 0, y = 0; x < mascara.length && y < valor.length;) {
        if (mascara.charAt(x) != '#') {
            resultado += mascara.charAt(x);
            x++;
        } else {
            resultado += valor.charAt(y);
            y++;
            x++;
        }
    }
    campo.value = resultado.reverse();
}