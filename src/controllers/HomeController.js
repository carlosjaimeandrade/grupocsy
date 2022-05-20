const transporter = require('../help/transporter');

const home = (req, res) => {
    res.render('pages/home',{
        message: req.flash('message'),
        type: req.flash('type')
    })
}

const info = (req, res) => {
    let contato_info = "";
    for (var key in req.body) {
        contato_info += `${key} : ${req.body[key]} <br><br>`
    }
    console.log(contato_info)
    const mailOptions = {
        from: process.env.FROM,
        to:  process.env.TO,
        subject: 'NOVO CONTATO - RECEBER INFORMAÇÕES',
        html: "Ola, o cliente abaixo deseja receber atualização sobre novos empreendimento da soldiers <br> <br>" + contato_info
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            req.flash('message', 'Ocorreu um erro no envio, por favor entre em contato com o administrador do sistema');
            req.flash('type', 'danger');
            res.redirect('/')
        } else {
            req.flash('message', 'Sua solicitação foi enviada com sucesso, logo entraremos em contato');
            req.flash('type', 'success');
            res.redirect('/')
        }
    });
}

module.exports = {
    home,
    info
}