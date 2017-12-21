'use strict';
const nodemailer = require('nodemailer');
const config = require('../../config/app_config');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.mailConfig.user,
        pass: config.mailConfig.pass
    }
});



// send mail with defined transport object
function sendMail(mail_to,mail_subject,mail_text,mail_content){

    var mailOptions = {
        from: config.mailConfig.sender_address, // sender address
        to: mail_to, // list of receivers
        subject: mail_subject, // Subject line
        html: 'Welcome To Ionixx -LMS' +
        '<p>Click <a href="http://localhost:4200/#/resetPassword">here</a> to reset your password</p>' // html body
    };
    console.log("mail test",config.mailConfig);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return false;
        }

        console.log('Message %s sent: %s', info.messageId, info.response);

        info.send(info.message);
    });
}
module.exports =  {
    sendMail
};



