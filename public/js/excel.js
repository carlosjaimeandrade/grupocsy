document.querySelector('[btn-export]').addEventListener('click', () => {

    TableToExcel.convert(document.querySelector("#table"), {
        name: "relatorio.xlsx",
        sheet: {
            name: "Sheet 1"
        }
    });

});