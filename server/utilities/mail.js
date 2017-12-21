'use strict';
const nodemailer = require('nodemailer');
const MailConfig = require('../config/app_config');
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: MailConfig.mailConfig.user,
        pass: MailConfig.mailConfig.pass
    }
});



// send mail with defined transport object
function sendMail(mail_to,mail_subject,mail_text,mail_content){

    var mailOptions = {
        from: MailConfig.mailConfig.sender_address, // sender address
        to: [mail_to], // list of receivers
        subject: 'Reg - Ionixx '+mail_subject, // Subject line
        html: mail_text+"<br><br>"+[mail_content]+"<br><br>"+

            "Thank You" // html body// html body
    };
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



// //review completion mail
// exports.send_mail = function(mail_to, details){
//     var smtp = nodemailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         auth: {
//             user: "vinithkumar487@gmail.com",
//             pass: "candycrush1"
//         }
//     });
//     var mailOptions={
//         to : mail_to,
//         subject : cons.subject1,
//         html : cons.text+details
//     };
//     customlog.info("Mail options: "+mailOptions);
//     smtp.sendMail(mailOptions, function(err, response){
//         if(err){
//             customlog.error("Db Error: "+err);
//         }
//         else{
//             customlog.info("Mail sent"+response);
//             response.send(response.message);
//         }
//     });
// };