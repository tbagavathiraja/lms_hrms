var db = require('../config/db_connection_config');
var crypto = require('crypto');
const q = require('q');


var dao = {

  getLoginType: function (data,callback) {
    db.connection(function(err,connection){
      if(err){
        return  callback (err);
      }
      var sql = "SELECT tenant_id,`authentication_type` FROM `tenant` WHERE `tenant_identifier`=? AND `active`=?";
      connection.query(sql,[data.tenant,data.status],function(err,results,fields){
        connection.release();
        if(err){
          console.log("2",results)
          callback(err, results);
        }else{
          console.log("3",results)
          callback(null, results);
        }
      });
    });

  },
  authenticate: function (data,callback) {
     db.connection(function(err,connection){
      if(err){
        callback (err,null);
      }
      var sql = "SELECT `employee_id`,`employee_email`,IF(admin_access = 1 , 'Yes','No') AS admin_access,`employee_name`,`tenant_id`,(SELECT `role_name` FROM `roles` WHERE `role_id` = (SELECT `role_id` FROM `employee_roles` WHERE `employee_id` = `employee`.`employee_id`)) AS `employee_role`  FROM `employee` WHERE `employee_email`= ? AND `employee_password` = ? AND `tenant_id`=? AND active = 1 AND is_deleted = 0";
      data.password=crypto.createHash('md5').update(data.password).digest("hex");
      connection.query(sql,[data.employee_email,data.password,data.tenant_id],function(err,results,fields){
        callback(err, results);
        connection.release();
        if(err){
          callback(err, results);
        }else{
          callback(null, results);
        }
      });
    });

  },


  addSession: function (data,callback) {
     db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = 'INSERT INTO `user_session`  (`employee_id`, `session_auth_token`,`expiry_time`) VALUES (?, ?, ?) ';
      connection.query(sql, [data.employee_id,data.session_auth_token,data.expiry_time], function (err, results, fields) {

        callback(null, results);
        connection.release();
        if (err) {
          callback(err, results);
        }
      });
    });
  },

  googleAuthenticate: function (data,callback) {
    db.connection(function(err,connection){
      if(err){
        return  callback (err);
      }
      var sql = "SELECT `employee_id`,`employee_email`,IF(admin_access = 1 , 'Yes','No') AS admin_access,`employee_name`,`tenant_id`,(SELECT `role_name` FROM `roles` WHERE `role_id` = (SELECT `role_id` FROM `employee_roles` WHERE `employee_id` = `employee`.`employee_id`)) AS `employee_role`  FROM `employee` WHERE `employee_email`= ? AND `tenant_id`=? AND active = 1 AND is_deleted = 0";
      connection.query(sql,[data.email,data.tenant_id],function(err,results,fields){
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
