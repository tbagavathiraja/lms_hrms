var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {

    addDepartment: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "INSERT INTO department (`department_name`,`description`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?)";
            console.log("kdshfdsf",data);
            connection.query(sql,[data.department_name,data.description,utilityMethods.currentTimestamp(),utilityMethods.currentTimestamp()],function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },


    getAlldepartment: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT d.department_id,d.department_name,d.description,IF((SELECT COUNT(*) FROM holiday AS h WHERE h.department_id = d.department_id)>0,1,0) AS is_deleted FROM department AS d";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " WHERE d.department_name LIKE ? OR description LIKE ?"
            	data_array = ["%"+data.search+"%","%"+data.search+"%"];
            }
             connection.query(sql, data_array, function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
    
    getDepartmentDetails: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT d.department_id,d.department_name,d.description FROM department AS d WHERE department_id = ?";
            var data_array = [data.department_id];
            
             connection.query(sql, data_array, function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },


    deleteDepartment: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "DELETE  FROM department WHERE department_id=?";
            connection.query(sql, [data["department_id"]], function (err, results, fields) {
                console.log(data.department_id);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    updateDepartment: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE department set department_name=?,description=?, last_updated_timestamp=?  WHERE department_id=?";
            console.log(data);
             connection.query(sql, [data["department_name"],data["description"],utilityMethods.currentTimestamp(),data["department_id"]], function (err, results, fields) {
                console.log(sql, data, results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
        console.log(data);

    },
}
    module.exports = dao;
