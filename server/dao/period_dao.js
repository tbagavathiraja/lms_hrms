var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utility_method = require("../utilities/utilitymethods");
var mom  = require('moment-timezone');

var dao = {
    getPeriod: function (data,callback,connection) {
             var sql = "SELECT period_id,DATE_FORMAT(start_date,'%d-%m-%Y') as start_date,start_date AS start_date_list,"+
                "DATE_FORMAT(end_date,'%d-%m-%Y') as end_date,end_date AS end_date_list,"+
                "DATE_FORMAT(submission_start_date,'%d-%m-%Y') as submission_start_date,submission_start_date AS submission_start_date_list,"+
                "DATE_FORMAT(submission_end_date,'%d-%m-%Y') as submission_end_date,submission_end_date AS submission_end_date_list,"+
                "DATE_FORMAT(resubmission_end_date,'%d-%m-%Y') as resubmission_end_date,resubmission_end_date AS resubmission_end_date_list " +
                 " FROM assessment_period WHERE tenant_id = ? and active=?";
             var data_params = [data.tenant_id,1]
             if(data.period_id && data.period_id!=""){
                 sql = sql +" and period_id = ?";
                 data_params.push(data.period_id);
             }
             var data_array = [];
             if(data.search && data.search != ''){
             	sql = sql + " AND (DATE_FORMAT(submission_start_date,'%b %e, %Y') LIKE ? OR DATE_FORMAT(submission_end_date,'%b %e, %Y') LIKE ? OR DATE_FORMAT(resubmission_end_date,'%b %e, %Y') LIKE ?)"
             	data_params.push("%"+data.search+"%");
             	data_params.push("%"+data.search+"%");
             	data_params.push("%"+data.search+"%");
             }
             console.log(sql,data_params);
            connection.query(sql,data_params,function(err,results,fields){
                callback(err, results);
                connection.release();
            });
    },

    addPeriod: function (data,callback,connection) {
            var sql = "INSERT INTO assessment_period SET tenant_id = ?,start_date = ?," +
                "end_date=?,submission_start_date=?,submission_end_date=?,resubmission_end_date=?,created_timestamp=?," +
                "last_updated_timestamp=?";
            connection.query(sql,
                [data.tenant_id,
                 	data.start_date.date.year+"-"+data.start_date.date.month+"-"+data.start_date.date.day,
                 	data.end_date.date.year+"-"+data.end_date.date.month+"-"+data.end_date.date.day,
                 	data.submission_start_date.date.year+"-"+data.submission_start_date.date.month+"-"+data.submission_start_date.date.day,
                 	data.submission_end_date.date.year+"-"+data.submission_end_date.date.month+"-"+data.submission_end_date.date.day,
                 	data.resubmission_end_date.date.year+"-"+data.resubmission_end_date.date.month+"-"+data.resubmission_end_date.date.day,
                    utility_method.current_datetime(),
                    utility_method.current_datetime()
                ],function(err,results,fields){
                callback(err, results);
                connection.release();
            });
    },

    checkPeriodExists: function (data,callback,connection) {

        var sql = "SELECT EXISTS(select 1 from assessment_period where tenant_id =? " +
            "AND start_date = ? AND end_date = ? and active = 1";
        var data_params =   [   data.tenant_id,
                                data.start_date.date.year+"-"+data.start_date.date.month+"-"+data.start_date.date.day,
                                data.end_date.date.year+"-"+data.end_date.date.month+"-"+data.end_date.date.day
                            ];
        if(data.period_id && data.period_id!=""){
            sql = sql + " and period_id <> ?";
            data_params.push(data.period_id);
        }
        sql = sql + " ) as period_exists";

        connection.query(sql,data_params,function(err,results,fields){
                callback(err, results);
                connection.release();
            });
    },
    updatePeriod: function (data,callback,connection) {
        var sql = "UPDATE assessment_period SET start_date = ?," +
            "end_date=?,submission_start_date=?,submission_end_date=?,resubmission_end_date=?," +
            "last_updated_timestamp=? WHERE period_id=? and  tenant_id = ?";
        connection.query(sql,
            [
             	data.start_date.date.year+"-"+data.start_date.date.month+"-"+data.start_date.date.day,
             	data.end_date.date.year+"-"+data.end_date.date.month+"-"+data.end_date.date.day,
             	data.submission_start_date.date.year+"-"+data.submission_start_date.date.month+"-"+data.submission_start_date.date.day,
             	data.submission_end_date.date.year+"-"+data.submission_end_date.date.month+"-"+data.submission_end_date.date.day,
             	data.resubmission_end_date.date.year+"-"+data.resubmission_end_date.date.month+"-"+data.resubmission_end_date.date.day,
                utility_method.current_datetime(),
                data.period_id,
                data.tenant_id
            ],function(err,results,fields){
                callback(err, results);
                connection.release();
            });
    },
    checkPeriodInUse: function (data,callback,connection) {
        console.log(data.delete_id)
        var sql = "SELECT 1 FROM employee_assessment WHERE period_id = ? ORDER BY employee_assessment_id LIMIT 1";
        connection.query(sql,[data.delete_id],function(err,results,fields){
                callback(err, results);
                connection.release();
            });
    },
    deletePeriod: function (data,callback,connection) {
        var sql = "UPDATE assessment_period SET active = 0 WHERE period_id = ? ";
        connection.query(sql,
            [ data.delete_id ],function(err,results,fields){
                callback(err, results);
            });
    }
};
module.exports = dao;