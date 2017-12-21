var cron = require('node-cron');
var reminderFunctions = require('./facade/reminder_facade');

var cronjobs={
Expiry: function(){
    cron.schedule('00 00 * * *',function(){
        reminderFunctions.send_remainder_leaveMail();
        reminderFunctions.send_remainder_permissionMail();
        reminderFunctions.send_remainder_compoffMail();
        console.log('running a task every minute');
    });
}
}

module.exports=cronjobs;