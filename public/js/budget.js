function updateConvenient(event) {
    const new_convenients = document.querySelectorAll('[new-convenient]')
    const update = document.querySelectorAll('.budget-card')
    const total = new_convenients.length
    update[0].children[2].children[1].value = total
}

function updateDetail(event) {
    const new_details = document.querySelectorAll('[new-details]')
    const update = document.querySelectorAll('.budget-card')
    const total = new_details.length
    update[1].children[0].children[1].value = total
}

function newConvenient(event) {
    const qtd = event.target.value
    const imp = event.target.parentNode.parentNode
    const new_convenients = document.querySelectorAll('[new-convenient]')

    if (new_convenients) {
        new_convenients.forEach(convenient => {
            convenient.remove()
        })
    }

    if (qtd > 100) {
        event.target.value = ""
        alert('O maximo disponível é 100')
        return
    }

    if ((qtd < 1) && (qtd != "")) {
        event.target.value = ""
        alert('O valor não pode ser negativo')
        return
    }

    for (let i = 0; i < qtd; i++) {
        let element = `
            <div new-convenient class="entry-value entry-bd-2">
                <i class="fa-solid fa-calculator"></i>
                <input type="number" name="comodos" required placeholder="Metragem do comodo ${i+1} *">  
                <i onclick="event.target.parentNode.remove();updateConvenient(event)" class="fa-solid fa-circle-xmark"></i>           
            </div>`
        imp.insertAdjacentHTML('beforeend', element)
    }

}

function newDetails(event) {
    const qtd = event.target.value
    const imp = event.target.parentNode.parentNode
    const new_details = document.querySelectorAll('[new-details]')

    if (new_details) {
        new_details.forEach(detail => {
            detail.remove()
        })
    }

    if (qtd > 200) {
        event.target.value = ""
        alert('O maximo disponível é 200')
        return
    }

    if ((qtd < 1) && (qtd != "")) {
        event.target.value = ""
        alert('O valor não pode ser negativo')
        return
    }

    for (let i = 0; i < qtd; i++) {
        let element = `
            <div new-details class="entry-value entry-bd-2">
                <i class="fa-solid fa-file-signature"></i>
                <input type="text" name="detalhe" required placeholder="Informe o detalhe ${i+1} *">    
                <i onclick="event.target.parentNode.remove();updateDetail(event)" class="fa-solid fa-circle-xmark"></i>        
            </div>`
        imp.insertAdjacentHTML('beforeend', element)
    }
}

function simulation(){
    const new_convenients = document.querySelectorAll('[new-convenient]')
    const new_details = document.querySelectorAll('[new-details]')
    const requireds = document.querySelectorAll('[required]')
    let m2_total = 0;     
    let details_total = 0;
    let empty = 0

    requireds.forEach(req=>{
        if(req.value == ""){
            empty+=1
        }
    })

    if(empty>0){
        alert("Você precisa preencher todos os campos que contém *")
        return
    }

    if(new_details){
        new_details.forEach(detail=>{
            if(detail.children[1].value != ""){
                details_total += 1
            }
        })
    }

    if(new_convenients){
        new_convenients.forEach(convenient=>{
            if(convenient.children[1].value != ""){
                let m2 = parseInt(convenient.children[1].value)
                m2_total += m2
            }
        })
    }

simulationValue(m2_total, details_total)

}

function simulationValue(m2_total,details_total){
    const simulation_import = document.querySelector('.simulation-import')
    const valuePreview = m2_total * 1533.96
    

    let valueEnd = 0
    let percentualDetails = 0

    if((m2_total >= 0) && (m2_total <=45)){
        valueEnd = valuePreview - (30 * valuePreview)/100
    }

    if((m2_total > 45) && (m2_total <=65)){
        valueEnd = valuePreview + (45 * valuePreview)/100
    }

    if((m2_total > 65) && (m2_total <=110)){
        valueEnd = valuePreview + 3800
    }

    if(m2_total > 110) {
        valueEnd = valuePreview + (40 * valuePreview)/100
    }   

    percentualDetails =  5 * valueEnd/100
    
    if(details_total>0){
        valueEnd = valueEnd + (percentualDetails * details_total)
    }

    simulation_import.innerHTML = `<span>O valor da sua simulação é ${valueEnd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} <br> <a href="/cliente/orcamento"><ion-icon name="close-circle-outline"></ion-icon></a></span>` 
    
    sendEmail(m2_total,details_total,valueEnd)

}

async function sendEmail(m2_total,details_total,valueEnd){
    const budget_card = document.querySelector('.budget-card')
    const imovel = budget_card.children[0].children[1].value
    const ampli = budget_card.children[1].children[1].value
    const comodos = budget_card.children[2].children[1].value
    const details = document.querySelectorAll('[new-details]')
    let detalhes = "";
    details.forEach(detail=>{
        if( detail.children[1].value != ""){
            detalhes += `${detail.children[1].value } - `
        }
    })

    const text = `Olá **
    Segue dados da sua simulação *
    Imovel: ${imovel} *
    Ampliação: ${ampli} *
    Cômodos: ${comodos} *
    Total de m²: ${m2_total}*
    Total de detalhes: ${details_total} *
    Detalhes preenchidos: ${detalhes}**
    Valor final: ${valueEnd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} **
    Qualquer dúvida clique em responder a todos e logo te retornaremos
    `   
    await fetch(`/api/email/${text}`)

}