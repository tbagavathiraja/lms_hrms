var db = require('../config/db_connection_config');
var crypto = require('crypto');


var dao = {

    getAll: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT assessment_parameter_id,parameter_name,apraisal_parameter_type FROM assessment_parameter WHERE is_deleted = 0";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " AND (parameter_name LIKE ? OR apraisal_parameter_type LIKE ?)"
            	data_array = ["%"+data.search+"%","%"+data.search+"%"];
            }
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                	console.log(err);
                    callback(err, results);
                }
            });
        });

    },
    getDetail: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT assessment_parameter_id,parameter_name,apraisal_parameter_type,default_parameter_weightage FROM assessment_parameter WHERE is_deleted = 0 AND assessment_parameter_id = ?";
            connection.query(sql,[data.parameter_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getDetailByName: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT assessment_parameter_id,parameter_name,apraisal_parameter_type,default_parameter_weightage FROM assessment_parameter WHERE is_deleted = 0 AND parameter_name = ?";
            connection.query(sql,[data.parameter_name],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    updateParameter: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE assessment_parameter" +
            		" SET parameter_name = ?,apraisal_parameter_type = ?,default_parameter_weightage = ?" +
            		",last_updated_timestamp = CURRENT_TIMESTAMP WHERE assessment_parameter_id = ?";
            connection.query(sql,[data.parameter_name,data.apraisal_parameter_type,data.default_parameter_weightage,data.parameter_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    insertParameter: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "INSERT INTO assessment_parameter" +
            		" (parameter_name,apraisal_parameter_type,default_parameter_weightage,active,tenant_id,is_deleted,created_timestamp" +
            		",last_updated_timestamp) VALUES(?,?,?,1,1,0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
            connection.query(sql,[data.parameter_name,data.apraisal_parameter_type,data.default_parameter_weightage],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    delete_parameter: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            console.log(data);
            var sql = "UPDATE assessment_parameter SET is_deleted=1 WHERE assessment_parameter_id = ?";
            connection.query(sql,[data.delete_id],function(err,results,fields){
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
