var db = require('../config/db_connection_config');
var crypto = require('crypto');
var config = require('../config/app_config');
var utilityMethods = require('../utilities/utilitymethods');

var dao = {

    getRequestSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT rr.`resource_request_id`,(SELECT p.`name` FROM `project` p WHERE p.`project_id`=rr.`project_id`) AS project,rr.`no_of_resource`,REPLACE(rr.`request_status`,'_',' ') AS request_status, DATE_FORMAT(rr.`request_date`,'%%d-%m-%Y %r') as `request_date`  FROM `resource_request` rr WHERE rr.`request_employee_id` = ? AND rr.`is_deleted`=0";
            var data_array = [data.employee_id];
            if(data.search && data.search != ''){
            	sql = sql + " AND ((SELECT p.`name` FROM `project` p WHERE p.`project_id`=rr.`project_id`) LIKE ? OR rr.`no_of_resource` LIKE ? OR REPLACE(rr.`request_status`,'_',' ') LIKE ? OR DATE_FORMAT(rr.`request_date`,'%%d-%m-%Y %r') LIKE ?)"
            	data_array = [data.employee_id,"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            sql = sql + " ORDER BY rr.resource_request_id DESC";
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getEmployeeList: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT employee_id, employee_number, employee_name, employee_email FROM employee WHERE active=1 AND employee_id != ? AND is_deleted = 0";
            connection.query(sql,[data.employee_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    insertResourceRequest: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "INSERT INTO resource_request"+
            "(request_employee_id, project_id, no_of_resource, comments, request_status, request_date,  created_timestamp, updated_timestamp)"+
            " VALUES( ?, ?, ?, ?, 'RAISED', ?,?,?);";
            connection.query(sql,[data.employee_id,data.project_info.project_id,data.no_of_resource,data.project_info.comments,
                                  utilityMethods.current_formated_datetime(),utilityMethods.current_formated_datetime(),utilityMethods.current_formated_datetime()],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    insertResourceRequestEmployee: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            console.log(data);
            var sql = "INSERT INTO resource_request_employee"+
                "(resource_request_id, comments, request_start_date, request_end_date, employee_id, created_timestamp, updated_timestamp)"+
                " VALUES(?, ?, ?, ?, ?, ?, ?);";
            connection.query(sql,[data.resource_request_id,data.comments,data.start_date,data.end_date,data.employee_id,utilityMethods.current_formated_datetime(),utilityMethods.current_formated_datetime()],function(err,results,fields){
                // console.log(err);

                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    updateResourceRequest: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE resource_request"+
                    " SET project_id=?, no_of_resource=?, comments=?, updated_timestamp=?"+
                    " WHERE resource_request_id=?;";
            connection.query(sql,[data.project_info.project_id,data.no_of_resource,data.project_info.comments,utilityMethods.current_formated_datetime(),data.resource_request_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getResourceList: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }

            var sql = "SELECT `resource_request_id`, `comments`, DATE_FORMAT(`request_start_date`,'%d-%m-%Y') as `request_start_date`, DATE_FORMAT(`request_end_date`,'%d-%m-%Y') as  `request_end_date`, `employee_id`"+
            " FROM `resource_request_employee` WHERE `is_deleted` =0 AND `resource_request_id` = ?;";
            connection.query(sql,[data.resource_request_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    deleteResource: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }

            var sql = "UPDATE resource_request_employee SET is_deleted = 1 , updated_timestamp=? WHERE employee_id = ? AND  resource_request_id = ?;";
            connection.query(sql,[utilityMethods.current_formated_datetime(),data.employee_id ,data.resource_request_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    updateResourceRequestEmployee: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE resource_request_employee SET "+
                " comments = ?, request_start_date = ? , request_end_date = ?, updated_timestamp=? WHERE employee_id = ? AND resource_request_id = ? AND is_deleted = 0 ";
            connection.query(sql,[data.comments,data.start_date,data.end_date,utilityMethods.current_formated_datetime(),data.employee_id,data.resource_request_id],function(err,results,fields){
                console.log(err);

                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    updateResourceApproval: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE resource_request_employee SET "+
                " comments = ?, request_start_date = ? , request_end_date = ?,status = ?, updated_timestamp=? WHERE employee_id = ? AND resource_request_id = ? AND is_deleted = 0 ";
            connection.query(sql,[data.comments,data.start_date,data.end_date,data.status,utilityMethods.current_formated_datetime(),data.employee_id,data.resource_request_id],function(err,results,fields){
                console.log(err);

                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },


};
module.exports = dao;