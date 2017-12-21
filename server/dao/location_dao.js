var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {

    addLocation: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "INSERT INTO location (`location_number`,`location_name`,`location_street`,`location_city`,`location_state`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?)";
            connection.query(sql, [data.location_number, data.location_name, data.location_street, data.location_city, data.location_state,utilityMethods.current_datetime(),utilityMethods.current_datetime()], function (err, results, fields) {
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

    getLocation: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT l.location_id,l.location_number,l.location_name,l.location_street,l.location_city,l.location_state,IF((SELECT COUNT(*) FROM holiday AS h WHERE h.location_id = l.location_id)>0,1,0) AS is_deleted FROM location AS l";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " WHERE l.location_number LIKE ? OR l.location_name LIKE ? OR location_street LIKE ? OR location_city LIKE ? OR location_state LIKE ?"
            	data_array = ["%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            connection.query(sql, data_array, function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
    
    getLocationDetails: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT l.location_id,l.location_number,l.location_name,l.location_street,l.location_city,l.location_state FROM location AS l WHERE l.location_id = ?";
            var data_array = [data.location_id];
            
            connection.query(sql, data_array, function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
    
    updateLocation: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE location SET `location_number` = ?,`location_name` = ?,`location_street` = ?,`location_city` = ?,`location_state` = ?,`last_updated_timestamp` = ? WHERE location_id = ?";
            var data_array = [data.location_number, data.location_name, data.location_street, data.location_city, data.location_state,utilityMethods.current_datetime(),data.location_id];
            console.log(sql,data_array);
            connection.query(sql, data_array, function (err, results, fields) {
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


    deleteLocation: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "DELETE  FROM location WHERE location_id=?";
            console.log(data.location_number);
            connection.query(sql, [data["location_id"]], function (err, results, fields) {
                console.log(data.location_number);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },
}
    module.exports = dao;
