var db = require('../config/db_connection_config');
var crypto = require('crypto');


var dao = {

    getProjectSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT ep.project_id, (SELECT p.name FROM project p WHERE p.project_id = ep.project_id) as project_name,"+
                "(SELECT GROUP_CONCAT(DISTINCT(SELECT e.employee_name FROM employee e WHERE e.employee_id = epp.employee_id) SEPARATOR ', ') as project_members from employee_project epp WHERE epp.project_id = ep.project_id GROUP BY project_id) as project_members,"+
                "ep.role_type,ep.start_date,ep.end_date FROM employee_project ep WHERE ep.employee_id = ? AND ep.tenant_id = ? AND active = 1;";
            connection.query(sql,[data.employee_id,data.tenant_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    
    getAllProjectSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT * FROM (SELECT ep.project_id, (SELECT p.name FROM project p WHERE p.project_id = ep.project_id) as project_name,"+
                "(SELECT GROUP_CONCAT(DISTINCT(SELECT e.employee_name FROM employee e WHERE e.employee_id = epp.employee_id) SEPARATOR ', ') as project_members from employee_project epp WHERE epp.project_id = ep.project_id GROUP BY project_id) as project_members,"+
                "ep.role_type,ep.start_date,ep.end_date FROM employee_project ep WHERE ep.tenant_id = ? AND active = 1) AS temp";
	            var data_array = [data.tenant_id];
	            if(data.search && data.search != ''){
	            	sql = sql + " WHERE temp.project_name LIKE ? OR temp.project_members LIKE ? "
	            	data_array = [data.tenant_id,"%"+data.search+"%","%"+data.search+"%"];
	            }
            	connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    }
    ,
    getMyProjectSummary: function (data,callback) {
    db.connection(function(err,connection){
        if(err){
            return  callback (err);
        }
        var sql = "SELECT * FROM (select project_name, count(employee_name) as no_of_members, group_concat(employee_name SEPARATOR ', ')  as project_members,  DATE_FORMAT(start_date,'%d-%m-%Y') as start_date, DATE_FORMAT(end_date,'%d-%m-%Y') as end_date from ("+
            "select"+
            "(select name from project where project_id = rr.project_id) as project_name,"+
            "(SELECT employee_name FROM employee where employee_id = rre.employee_id) as employee_name,"+
            "min(rre.request_start_date) as start_date,max(rre.request_end_date) as end_date"+
            " from resource_request_employee rre"+
            " JOIN resource_request rr ON rr.resource_request_id = rre.resource_request_id WHERE rre.status = 'APPROVED' AND rr.is_deleted = 0 AND rre.is_deleted = 0  AND rr.request_employee_id = ?"+
            " group by rr.project_id,rre.employee_id) data"+
            " group by project_name) AS temp";
        var data_array = [data.employee_id];
        if(data.search && data.search != ''){
        	sql = sql + " WHERE temp.project_name LIKE ? OR temp.no_of_members LIKE ? OR temp.project_members LIKE ? OR temp.start_date LIKE ? OR temp.end_date LIKE ?"
        	data_array = [data.employee_id,"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
        }
        connection.query(sql,data_array,function(err,results,fields){
            console.log(data);
            console.log(err);
            callback(null, results);
            connection.release();
            if(err){
                callback(err, results);
            }
        });
    });

}


};
module.exports = dao;