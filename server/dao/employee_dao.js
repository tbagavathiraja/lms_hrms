var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utility = require("../utilities/utilitymethods");
var roleConstant = require("../utilities/constants/role_constant");

var dao = {

		getEmployeeSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT employee_number,employee_name,employee_email,designation  FROM `employee` WHERE is_deleted = 0";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " AND (employee_number LIKE ? OR employee_name LIKE ? OR employee_email LIKE ? OR designation LIKE ?)"
            	data_array.push("%"+data.search+"%");
            	data_array.push("%"+data.search+"%");
            	data_array.push("%"+data.search+"%");
            	data_array.push("%"+data.search+"%");
            }
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });
    },

    getProfileSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT employee_number,employee_name,employee_email,designation  FROM `employee` WHERE employee_id=? AND is_deleted = 0";
            connection.query(sql,[data["employee_id"]],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    console.log(err)
                    callback(err, results);
                }
            });
        });
    },

    getemployeeshistory: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql ="SELECT l.employee_name,(SELECT count(*) FROM leaves tl WHERE tl.employee_id = l.employee_id AND tl.status='Granted') as max_leaves, \n" +
                     "(SELECT count(*) FROM compoff tc WHERE tc.employee_id = l.employee_id AND tc.status='Granted') as max_compoff, \n" +
                     "(SELECT count(*) FROM permission tp WHERE tp.employee_id = l.employee_id AND tp.status='Granted') as max_permission \n" +
                     " FROM employee AS l WHERE l.employee_id=? ";
            connection.query(sql,data["employee_id"], function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err);
                    callback(err, results);
                }
            });
        });
    },
    get_employee: function (data,callback) {
		  console.log("db",data)
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT employee_number," +
                        "CONCAT(UCASE(LEFT(employee_name,1)),LOWER(SUBSTRING(employee_name,2))) as employee_name," +
                        "employee_email,IF(admin_access = 1 , 'Yes','No') AS admin_access," +
                        " CONCAT(UCASE(LEFT(designation,1)),LOWER(SUBSTRING(designation,2))) as designation,location,department," +
                        "DATE_FORMAT(date_of_joining,'%d-%m-%Y') as date_of_joining,NULL AS `employee_password`,"+
                        "(select role_name from roles where role_id = (select role_id from employee_roles where employee_id = employee.employee_id) ) as role, "+
                        " NULL AS confirm_password,employee_id, tenant_id  FROM employee "+
                        " WHERE is_deleted = 0 AND employee_email = ?";
            connection.query(sql,[data.employee_email],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });
    },
    get_employee_for_number: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT employee_number," +
                        "CONCAT(UCASE(LEFT(employee_name,1)),LOWER(SUBSTRING(employee_name,2))) as employee_name," +
                        "employee_email," +
                        " CONCAT(UCASE(LEFT(designation,1)),LOWER(SUBSTRING(designation,2))) as designation,location," +
                        "DATE_FORMAT(date_of_joining,'%d-%m-%Y') as date_of_joining,NULL AS `employee_password`,"+
                        "(select role_name from roles where role_id = (select role_id from employee_roles where employee_id = employee.employee_id) ) as role, "+
                        " NULL AS confirm_password,employee_id, tenant_id  FROM employee "+
                        " WHERE is_deleted = 0 AND employee_number = ?";
            connection.query(sql,[data.employee_number],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });
    },
    insert_employee: function (connection,data,callback) {
            var password = null;
            if(data.employee_password!=''){
            	password = crypto.createHash('md5').update(data.employee_password).digest("hex");
            }
            admin_access = 0;
            if(data.admin_access == 'Yes'){
            	admin_access = 1;
            }
            var sql = "INSERT INTO `employee` (employee_number,employee_name,employee_email,designation,location,department,date_of_joining,admin_access " +
            		",employee_password,active,is_deleted,tenant_id,created_timestamp,last_updated_timestamp) " +
            		" VALUES(?,?,?,?,?,?,?,?,?,1,0,?,?,?) ";
            var admin_access = 0;
            if(data.admin_access == 'Yes'){
            	admin_access = 1;
            }
            connection.query(sql,[data.employee_number,data.employee_name,data.employee_email,
                                  data.designation,data.location,data.department,
                                  utility.format_date(data.date_of_joining.formatted,'YYYY-MM-DD'),admin_access,
                                  password,data.tenant_id,utility.current_datetime(),utility.current_datetime()],
                function(err,results,fields){
                    callback(null, results);
                    if(err){
                        callback(err, results);
                    }
            });
    },
    insert_employee_role: function (connection,data,callback) {
		    console.log(data)
            var sql = "INSERT INTO `employee_roles` (role_id,employee_id,active," +
                "tenant_id,created_timestamp,last_updated_timestamp)" +
                " VALUES((select role_id from roles where role_name = ? and tenant_id = ?),?,?,?,?,?)";
            connection.query(sql,[data.role,data.tenant_id,data.employee_id,roleConstant.ACTIVE_YES,data.tenant_id,
                                utility.current_datetime(),utility.current_datetime()],function(err,results,fields){
                 callback(err, results);
            });
    },
    update_employee: function (connection,data,callback) {
		  console.log(data)
                var sql = "UPDATE `employee` SET employee_number = ?,employee_name = ?,employee_email = ?,designation = ?,location = ?,department=?" +
                        ",date_of_joining = ?,admin_access = ?,last_updated_timestamp = ? ";
                var admin_access = 0;
                if(data.admin_access == 'Yes'){
                	admin_access = 1;
                }
                var data_update = [data.employee_number,data.employee_name,data.employee_email,
                                    data.designation,data.location,data.department,
                                    utility.format_date(data.date_of_joining.formatted,'YYYY-MM-DD'),admin_access,
                                    utility.current_datetime()];
                var password = null;
                if(data.employee_password != '' && data.employee_password != null){
                    sql = sql + ",employee_password = ?"
                    password = crypto.createHash('md5').update(data.employee_password).digest("hex");
                     data_update.push(password);
                }
                sql = sql + " WHERE employee_email = ? AND is_deleted = ?";
                data_update.push(data.employee_email,roleConstant.ACTIVE_NO);
                connection.query(sql,data_update,function(err,results,fields){
                    callback(err, results);
            });
    },

    update_myProfile: function (data,callback) {
        db.connection(function(err,connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE `employee` SET employee_name = ?,last_updated_timestamp = ?";
            var data_update = [data.employee_name, utility.current_datetime()];
            var password = null;
            if (data.employee_password != '' && data.employee_password != null) {
                sql = sql + ",employee_password = ?"
                password = crypto.createHash('md5').update(data.employee_password).digest("hex");
                data_update.push(password);
            }
            sql = sql + " WHERE employee_email = ?";
            data_update.push(data.employee_email);
            connection.query(sql, data_update, function (err, results, fields) {
                console.log(sql,data);
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err);
                    callback(err, results);
                }
            });
        });
    },

    deleteEmployee: function (data,callback) {
    db.connection(function(err,connection){
        if(err){
          return  callback (err);
        }
        var sql = "UPDATE employee SET is_deleted = 1, last_updated_timestamp=CURRENT_TIMESTAMP WHERE employee_email = ?";
        connection.query(sql,[data.delete_id],function(err,results,fields){
            callback(null, results);
            connection.release();
            if(err){
                callback(err, results);
            }
        });
    });
},

    getRoles: function(connection,data,callback){
                var sql = 'Select * from roles where tenant_id = ?';
		        let dataParams = [data.tenant_id];
		        if(data.role && data.role!==""){
                    sql = sql + " and role_name = ? ";
                    dataParams.push(data.role);
                }
                connection.query(sql,dataParams,function(err,results,fields){
                    console.log("get  roles result",results);
                    callback(err,results);
            });
    },
    updateRole: function(connection,data,callback){
            var sql = "UPDATE employee_roles SET role_id = (select role_id from roles where role_name = ? and tenant_id = ?) " +
                       "where tenant_id = ? and employee_id = (select employee_id from employee where employee_email=? AND tenant_id=? AND is_deleted=?)";
            let dataParams = [data.role,data.tenant_id,data.tenant_id,data.employee_email,data.tenant_id,roleConstant.ACTIVE_NO];
            connection.query(sql,dataParams,function(err,results,fields){
                console.log("result in update roles ",results);
                callback(err,results);
            });
    },
    is_employee_role_exist: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT * FROM employee_roles WHERE employee_id = ?";
            connection.query(sql,[data.employee_id],function(err,results,fields){
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
