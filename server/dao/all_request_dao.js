var db = require('../config/db_connection_config');
var crypto = require('crypto');
var resourceRequestConstant = require('../utilities/constants/resource_request_constant');
var utilityMethods = require('../utilities/utilitymethods');

var dao = {

		getAll: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT * FROM (SELECT rr.`resource_request_id`,(SELECT p.`name` FROM `project` p WHERE p.`project_id`=rr.`project_id`) AS project,rr.`no_of_resource`,REPLACE(rr.`request_status`,'_',' ') AS request_status, DATE_FORMAT(rr.`request_date`,'%d-%m-%Y %r') as `request_date`  FROM `resource_request` rr WHERE rr.is_deleted=0 ORDER BY rr.resource_request_id DESC) AS temp";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " WHERE temp.project LIKE ? OR temp.no_of_resource LIKE ? OR temp.request_status LIKE ? OR temp.request_date LIKE ?"
            	data_array = ["%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            console.log(data_array);
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                	console.log(err)
                    callback(err, results);
                }
            });
         });

        },

        get_request: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }
                var sql = "SELECT rre.employee_id, (SELECT e.employee_name FROM employee e WHERE e.employee_id = rre.employee_id) as employee_name , rre.comments, DATE_FORMAT(rre.request_start_date,'%d-%m-%Y') as request_start_date, DATE_FORMAT(rre.request_end_date,'%d-%m-%Y') as request_end_date,rre.status, IF(rre.status='APPROVED' OR rre.status = 'REJECTED','0','1') as is_editable  FROM resource_request_employee rre JOIN resource_request rr ON rr.resource_request_id = rre.resource_request_id WHERE rr.resource_request_id = ? AND rre.is_deleted=0 AND rr.is_deleted=0;";
                connection.query(sql,[data.resource_request_id],function(err,results,fields){
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
            });
        },

        approveRequest: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }
                console.log(data);

                var sql = "UPDATE `resource_request` SET request_status = ? ,approver_employee_id = ? WHERE resource_request_id = ? ";
                connection.query(sql,[data.request_status,data.approver_employee_id,data.resource_request_id],function(err,results,fields){
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
            });

        },

        changeResourceStatus: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }
                console.log(data);

                var sql = "UPDATE `resource_request_employee` SET status = ?  WHERE resource_request_id = ? AND is_deleted = 0 ";
                connection.query(sql,[data.request_status,data.resource_request_id],function(err,results,fields){
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
            });

        },

        get_request_details: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }
                var sql = "SELECT (SELECT employee_name FROM employee WHERE employee_id = rr.request_employee_id) as request_employee_name,"+
                    "rr.project_id, (SELECT name FROM project WHERE project_id = rr.project_id) as project_name,"+
                    "rr.no_of_resource,rr.comments, REPLACE(rr.request_status,'_',' '), DATE_FORMAT(rr.request_date,'%d-%m-%Y %r') as request_date,"+
                    "(SELECT employee_name FROM employee WHERE employee_id = rr.approver_employee_id) as approver_employee_name"+
                    " FROM resource_request rr WHERE rr.resource_request_id = ? AND rr.is_deleted=0 ";
                connection.query(sql,[data.resource_request_id],function(err,results,fields){
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
            });
        },
	    checkRequestBeForeDelete: function (connection,data, callback) {
            console.log(data)
                var sql = "SELECT 1 from resource_request rr"+
                    " JOIN (select resource_request_id,request_start_date,request_end_date from resource_request_employee )rre ON "+
                    " rre.resource_request_id = rr.resource_request_id "+
                    "WHERE rr.resource_request_id = ? and (rr.status = ? OR request_start_date < ?)  ";
                var dataParams = [
                    data.resource_request_id,
                    resourceRequestConstant.STATUS_RAISED,
                    utilityMethods.current_datetime()
                ];
                console.log(dataParams)
                connection.query(sql,dataParams,function(err,results,fields){
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
 		},
		deleteRequest: function (connection,data,callback) {
                 var sql = "UPDATE resource_request SET is_deleted=?,updated_timestamp = ? WHERE resource_request_id = ? ";
                 var dataArray = [resourceRequestConstant.loginConstant.DELETE_STATUS_YES,
                 utilityMethods.current_datetime(),
                 data.resource_request_id
		 ];
                 connection.query(sql,dataArray,function(err,results,fields){
                    console.log(dataArray);
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
		},
        updateRequestBasedOnResource: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }

                var sql = "UPDATE resource_request rr SET rr.request_status = (SELECT IF((SELECT COUNT(*) FROM resource_request_employee rr1 WHERE rr1.resource_request_id = ? AND rr1.is_deleted = 0) = (SELECT COUNT(*) FROM resource_request_employee rr2 WHERE rr2.resource_request_id = ? AND rr2.is_deleted = 0 AND rr2.status = ?),"+
                " ?,IF((SELECT COUNT(*) FROM resource_request_employee rr1 WHERE rr1.resource_request_id = ? AND rr1.is_deleted = 0) = (SELECT COUNT(*) FROM resource_request_employee rr2 WHERE rr2.resource_request_id = ? AND rr2.is_deleted = 0 AND rr2.status = ?),"+
                " ?,?)) ),approver_employee_id = ?, updated_timestamp=? WHERE  rr.resource_request_id = ? AND rr.is_deleted = 0;";
                var dataParam = [
                    data.resource_request_id,
                    data.resource_request_id,
                    resourceRequestConstant.requestStatus.STATUS_APPROVED,
                    resourceRequestConstant.requestStatus.STATUS_APPROVED,
                    data.resource_request_id,
                    data.resource_request_id,
                    resourceRequestConstant.requestStatus.STATUS_REJECTED,
                    resourceRequestConstant.requestStatus.STATUS_REJECTED,
                    resourceRequestConstant.requestStatus.STATUS_PARTIAL_APPROVED,
                    data.approver_employee_id,
                    utilityMethods.current_datetime(),
                    data.resource_request_id
                ];
                connection.query(sql,dataParam,function(err,results,fields){
                    console.log(results);
                    callback(null, results);
                    connection.release();
                    if(err){
                        callback(err, results);
                    }
                });
            });

        },
        checkResourceAvailable: function (data,callback) {
            db.connection(function(err,connection){
                if(err){
                    return  callback (err);
                }

                var sql = "SELECT COUNT(*) as is_available FROM resource_request_employee WHERE ((str_to_date(?, '%d-%m-%Y') BETWEEN  request_start_date AND request_end_date )OR (str_to_date(?, '%d-%m-%Y') BETWEEN  request_start_date AND request_end_date)) AND is_deleted = 0 AND status = ? AND employee_id =? AND resource_request_id != ?;";
                var dataParam = [
                    data.request_start_date,
                    data.request_end_date,
                    resourceRequestConstant.requestStatus.STATUS_APPROVED,
                    data.employee_id,
                    data.resource_request_id
                ];
                connection.query(sql,dataParam,function(err,results,fields){
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