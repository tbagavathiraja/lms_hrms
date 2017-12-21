var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');



var dao = {

    getcalendarbranch: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT location_name,location_id FROM location";

            connection.query(sql, [], function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },


    insertDays: function (data,callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "INSERT INTO calendar (`location_id`,`monday`,`tuesday`,`wednesday`,`thursday`,`friday`,`saturday`,`sunday`,`created_timestamp`) VALUES (?,?,?,?,?,?,?,?,?)";
            var monday=0;
            if(data.isWorking[0]==true){
                monday=1;
            }
            var tuesday=0;
            if(data.isWorking[1] == true){
                tuesday=1;
            }
            var wednesday=0;
            if(data.isWorking[2]==true){
                wednesday=1;
            }
            var thursday=0;
            if(data.isWorking[3]==true){
                thursday=1;
            }
            var friday=0;
            if(data.isWorking[4]==true){
                friday=1;
            }
            var saturday=0;
            if(data.isWorking[5]==true){
                saturday=1;
            }
            var sunday=0;
            if(data.isWorking[6]==true){
                sunday=1;
            }
            connection.query(sql, [data.location_id,monday, tuesday,wednesday,thursday,friday,saturday,sunday,utilityMethods.current_datetime()], function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
    updateDays: function (data,callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE calendar SET `monday` = ?,`tuesday` = ?,`wednesday` = ?,`thursday` = ?,`friday` = ?,`saturday` = ?,`sunday` = ?,`last_updated_timestamp`= ? WHERE location_id = ?";
            var monday=0;
            if(data.isWorking[0]==true){
                monday=1;
            }
            var tuesday=0;
            if(data.isWorking[1] == true){
                tuesday=1;
            }
            var wednesday=0;
            if(data.isWorking[2]==true){
                wednesday=1;
            }
            var thursday=0;
            if(data.isWorking[3]==true){
                thursday=1;
            }
            var friday=0;
            if(data.isWorking[4]==true){
                friday=1;
            }
            var saturday=0;
            if(data.isWorking[5]==true){
                saturday=1;
            }
            var sunday=0;
            if(data.isWorking[6]==true){
                sunday=1;
            }
            connection.query(sql, [monday, tuesday,wednesday,thursday,friday,saturday,sunday,utilityMethods.current_datetime(),data.location_id], function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
    calendarDetails: function (data,callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT monday,tuesday,wednesday,thursday,friday,saturday,sunday FROM calendar WHERE location_id=?";
            connection.query(sql,[data.location_id], function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    }


}
module.exports = dao;

