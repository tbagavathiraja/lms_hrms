var db = require('../config/db_connection_config');
var config = require('../config/app_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {

    getReminderSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            console.log(config.CURRENT_TIME,data.employee_id);
            var sql = "SELECT * FROM (SELECT rre.resource_request_employee_id, (SELECT p.name FROM project p WHERE p.project_id =  rr.project_id) as project_name, (SELECT e.employee_name FROM employee e WHERE e.employee_id = rre.employee_id) as employee_name, rre.comments, rre.request_start_date, rre.request_end_date, DATE_FORMAT(rre.request_start_date,'%d-%m-%Y') as start_date,DATE_FORMAT(rre.request_end_date,'%d-%m-%Y') as end_date "+
            " FROM resource_request_employee rre JOIN resource_request rr ON rr.resource_request_id = rre.resource_request_id "+
            " WHERE rre.`request_end_date` <= timestampadd(day, 2, ?) AND rre.`request_end_date` >= timestampadd(day, -1, ?) AND rr.request_employee_id = ? AND rre.status='APPROVED') AS temp";
            var data_array = [utilityMethods.current_formated_datetime(),utilityMethods.current_formated_datetime(),data.employee_id];
            if(data.search && data.search != ''){
            	sql = sql + " WHERE temp.project_name LIKE ? OR temp.employee_name LIKE ? OR temp.start_date LIKE ? OR temp.end_date LIKE ?"
            	data_array = [utilityMethods.current_formated_datetime(),utilityMethods.current_formated_datetime(),data.employee_id,"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            console.log(sql,data_array);
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    releaseResource: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE resource_request_employee SET status='RELEASED', updated_timestamp=? WHERE resource_request_employee_id=?;";
            connection.query(sql,[utilityMethods.current_datetime(),data.resource_request_employee_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });
    },
    updateResourceReleaseRequest: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE resource_request SET request_status = "+
            "(SELECT"+
            " IF("+
                "(SELECT COUNT(*) from resource_request_employee WHERE status = 'APPROVED' AND is_deleted=0 AND resource_request_id ="+
                "(SELECT resource_request_id FROM resource_request_employee WHERE resource_request_employee_id = ?)) = 0,"+
                " 'RELEASED' ,"+
                " request_status"+
            ")) , updated_timestamp = ? WHERE resource_request_id = (SELECT resource_request_id FROM resource_request_employee WHERE resource_request_employee_id = ?)";
            connection.query(sql,[data.resource_request_employee_id,utilityMethods.current_datetime(),data.resource_request_employee_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });
    },
    getRequestEmployees: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT DISTINCT rr.request_employee_id,(SELECT e.employee_email FROM employee e WHERE e.employee_id = rr.request_employee_id) as email_id"+
                        " FROM resource_request_employee rre JOIN resource_request rr ON rr.resource_request_id = rre.resource_request_id"+
                        " WHERE rre.`request_end_date` <= timestampadd(day, 2, ?) AND rre.`request_end_date` >= ?  AND rre.status='APPROVED'";
            connection.query(sql,[utilityMethods.current_datetime(),utilityMethods.current_datetime()],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },

    getRequestleaveId: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT DISTINCT employee_id FROM leaves  WHERE TIMESTAMPDIFF(HOUR,from_date,?)<24 AND status='Initial'";
            connection.query(sql,[utilityMethods.current_datetime()],function(err,results,fields){
                console.log("first",results);
                if(err){
                    callback(err, results);
                }else{
                    callback(null,results);
                    connection.release();
                }

            });
        });

    },

    getReportingEmployees: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT employee_email FROM employee WHERE employee_id IN (SELECT DISTINCT reporting_employee_id FROM employee_reporting WHERE employee_id = ?)"
            connection.query(sql,[data.employee_id],function(err,results,fields){
                console.log(results);
                if(err){
                    console.log(err);
                    callback(err, results);
                }
                else{
                    callback(null,results);
                    connection.release();
                }
            });
        });

    },

    getRequestpermissionId: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT DISTINCT employee_id FROM permission  WHERE TIMESTAMPDIFF(HOUR,from_time,?)<1 AND status='Initial'";
            connection.query(sql,[utilityMethods.current_datetime()],function(err,results,fields){
                console.log("first",results);
                if(err){
                    callback(err, results);
                }else{
                    callback(null,results);
                    connection.release();
                }

            });
        });

    },


    getRequestcompoffId: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT DISTINCT employee_id FROM compoff  WHERE TIMESTAMPDIFF(HOUR,leave_on,?)<24 AND status='Initial'";
            connection.query(sql,[utilityMethods.current_datetime()],function(err,results,fields){
                console.log("first",results);
                if(err){
                    callback(err, results);
                }else{
                    callback(null,results);
                    connection.release();
                }

            });
        });

    },

};
module.exports = dao;