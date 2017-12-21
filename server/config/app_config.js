var time = require('moment-timezone');
var nodemailer = require('nodemailer');

var now = time();

const port = process.env.port ||  10090;
const dbConfig = {
       connectionLimit:50,
       host:'localhost',
       user:'root',
       password:'root',
       database:'hrms'
};

const mailConfig ={
    sender_address:'"Vikram " <@ionixxtech.com>',
    user:'vikram.ravichandran@ionixxtech.com',
    pass:'vickytheking'
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'tbagavathiraja@gmail.com', // Your email id
    pass: 'tbagavathi0511' // Your password
  }
});
/*

var mailOptions = {
  from: 'example@gmail.com>', // sender address
  to: 'receiver@destination.com', // list of receivers
  subject: 'Email Example', // Subject line
  text: text //, // plaintext body
  // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});

*/


var config = {
       port:port,
       dbConfig:dbConfig,
       CURRENT_TIME : now.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss'),
       mailConfig:mailConfig
}


module.exports = config;

