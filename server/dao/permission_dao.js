var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {


    insertPermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "INSERT INTO permission (`employee_id`,`reason`,`date`,`from_time`,`to_time`,`applied_on`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?,?)";
            connection.query(sql,[data["employee_id"], data["reason"], utilityMethods.format_date(data.date.formatted, 'YYYY-MM-DD'),data["from_time"], data["to_time"],utilityMethods.currentTimestamp(), utilityMethods.currentTimestamp(),utilityMethods.currentTimestamp()], function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err)
                    callback(err, results);
                }
            });
        });
    },

    getmail: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT employee_email FROM employee WHERE employee_id IN (SELECT reporting_employee_id FROM employee_reporting WHERE employee_id=?)";
            connection.query(sql,[data],function(err, results, fields) {
                console.log("qaasd",results);
                callback(null,results);
                connection.release();
                if (err) {
                    console.log(err)
                    callback(err, results);
                }
            });
        });
    },

    getpermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT permission_id,employee_id,reason,date,from_time,to_time,status,rejected_reason FROM permission WHERE employee_id=?";
            console.log(data.tenant);
            var data_array = [data["employee_id"]];
            if(data.search && data.search != ''){
                sql = sql + " AND (DATE_FORMAT(date, '%b %e, %Y') LIKE ? OR employee_id LIKE ? OR reason LIKE ? OR status LIKE ? OR from_time LIKE ? OR to_time LIKE ? OR rejected_reason LIKE ?)"
                data_array = [data["employee_id"],"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            connection.query(sql,data_array, function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err)
                    callback(err, results);
                }
            });
        });
    },

  get_permission_holidays: function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT holiday_name,holiday_date from holiday where tenant_id IN (select tenant_id from employee where employee_id=?)";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
        console.log(results,'result holiday');
        connection.release();
        if (err) {
          console.log("holiday err"+err);
          callback(err, results);
        }else{
          callback(null, results);
        }
      });
    });
  },


  get_initial_permission: function (data, callback) {
     db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT date FROM permission WHERE employee_id=? AND status='Initial'";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
        console.log(results,"result");
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
        else{
          callback(null, results);
        }
      });
    });
  },



  get_granted_permission: function (data, callback) {
     db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT date FROM permission WHERE employee_id=? AND status='Granted'";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
        console.log(results,"result");
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
        else{
          callback(null, results);
        }
      });
    });
  },


  deletePermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "DELETE  FROM permission WHERE permission_id=? AND status='Initial'";
            console.log(data.leave_number);
            connection.query(sql, [data["permission_id"]], function (err, results, fields) {
                console.log(data.department_id);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    totalpermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT COUNT(*) as max_total FROM permission WHERE employee_id=? AND status='Granted'";
            console.log(data.tenant);
            connection.query(sql, [data["employee_id"]], function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    getPermissionDetails: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT permission_id,reason,DATE_FORMAT(date,'%d-%m-%y') as date,from_time,to_time FROM permission WHERE permission_id =?";
            connection.query(sql,[data["permission_id"]],function(err, results, fields) {
                console.log("qaasd",results);
                callback(null,results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    updatepermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE permission set reason=?,date=?,from_time=?,to_time=?,last_updated_timestamp=? WHERE permission_id=? AND status='Initial'";
            connection.query(sql, [data["reason"],utilityMethods.format_date(data.date.formatted,'YYYY-MM-DD'),data["from_time"],data["to_time"],utilityMethods.currentTimestamp(),data["permission_id"]], function (err, results, fields) {
                console.log(sql, data, results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);

                }
            });
        });
    },


    getempermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT p.permission_id,p.employee_id,p.reason,p.date,p.from_time,p.to_time,p.status,\n"+
               "(SELECT employee_name FROM employee tp WHERE tp.employee_id = p.employee_id) as employee_name,\n" +
              "(SELECT employee_email FROM employee tl WHERE tl.employee_id = p.employee_id) as employee_email\n" +
                "FROM permission p WHERE p.employee_id IN (SELECT employee_id FROM employee_reporting WHERE reporting_employee_id=?)";
            var data_array = [data["employee_id"]];
            if(data.search && data.search != ""){
                sql = sql+" AND (employee_id like ? OR DATE_FORMAT(date,'%b %e, %Y') like ? OR (SELECT employee_name FROM employee tp WHERE tp.employee_id = p.employee_id) like ? OR reason like ? OR from_time like ? OR to_time like ?  )";
                data_array=[data["employee_id"],"%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%"]
            }

            connection.query(sql, data_array, function (err, results, fields) {
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

    acceptpermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE permission set status ='Granted',`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE permission_id=? AND status='Initial'";

            var dataArr = [utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(),data["permission_id"]];
            console.log(dataArr);
            connection.query(sql, dataArr, function (err, results, fields) {
                console.log(err);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });


    },

    rejectpermission: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE permission set status ='Rejected', `rejected_reason` =?,`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE permission_id =? AND status='Initial'";
            var dataArr = [data["rejected_reason"], utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(), data["permission_id"]];
             connection.query(sql, dataArr, function (err, results, fields) {
                console.log(err);
                connection.release();
                if (err) {
                    callback(err, results);
                }else{
                  callback(null, results);
                }
            });
        });


    },



}
module.exports = dao;
