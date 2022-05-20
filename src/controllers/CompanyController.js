const transporter = require('../help/transporter');


module.exports = {
    ShowCompany: (req, res) => {
        res.render('pages/companies', {
            message: req.flash('message'),
            type: req.flash('type'),
        });
    },


    info: (req, res) => {
        let contato_info = "";
        for (var key in req.body) {
            contato_info += `${key} : ${req.body[key]} <br><br>`
        }
        console.log(contato_info)
        const mailOptions = {
            from: process.env.FROM,
            to: process.env.TO,
            subject: 'NOVO CONTATO - Socialy',
            html: "Ola, o cliente abaixo deseja conversar com um especialista <br> <br>" + contato_info
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


}