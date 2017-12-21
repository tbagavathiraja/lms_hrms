var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {


insertCompoff: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "INSERT INTO compoff(`employee_id`,`worked_on`,`leave_on`,`description`,`applied_on`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?)";
        console.log(data);
        connection.query(sql, [data.employee_id,utilityMethods.format_date(data.worked_on.formatted,'YYYY-MM-DD'),utilityMethods.format_date(data.leave_on.formatted,'YYYY-MM-DD'),data.description, utilityMethods.currentTimestamp(),utilityMethods.currentTimestamp(),utilityMethods.currentTimestamp()], function (err,results, fields) {
            console.log(sql, data, results);
            callback(null, results);
            connection.release();
            if (err) {
                console.log(err);
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


getcompoff: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "SELECT compoff_id,employee_id,worked_on,leave_on,description,status,rejected_reason FROM compoff WHERE employee_id=?";
        var data_array = [data["employee_id"]];
        if(data.search && data.search != ''){
            sql = sql + " AND (DATE_FORMAT(worked_on, '%b %e, %Y') LIKE ? OR DATE_FORMAT(leave_on, '%b %e, %Y') LIKE ? OR employee_id LIKE ? OR status LIKE ? OR description LIKE ?  OR rejected_reason LIKE ?)"
            data_array = [data["employee_id"],"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
        }
        console.log("dfsfs",sql,data_array);
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

  get_compoff_holidays: function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT holiday_name,holiday_date from holiday where tenant_id IN (select tenant_id from employee where employee_id=?)";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
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


  get_initial_compoff: function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT worked_on,leave_on FROM compoff WHERE employee_id=? AND status='Initial'";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
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



  get_granted_compoff: function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT worked_on,leave_on FROM compoff WHERE employee_id=? AND status='Granted'";
      connection.query(sql, [data["employee_id"]], function (err, results, fields) {
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


deleteCompoff: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "DELETE  FROM compoff WHERE compoff_id=? AND status='Initial'";
        console.log(data.leave_number);
        connection.query(sql, [data["compoff_id"]], function (err, results, fields) {
            console.log(data.department_id);
            callback(null, results);
            connection.release();
            if (err) {
                callback(err, results);
            }
        });
    });
},

totalCompoff: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "SELECT COUNT(*) as max_total FROM compoff WHERE employee_id=? AND status='Granted'";
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

getCompoffDetails: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "SELECT compoff_id,description,DATE_FORMAT(worked_on,'%d-%m-%y') as worked_on,DATE_FORMAT(leave_on,'%d-%m-%y') as leave_on FROM compoff WHERE compoff_id =?";
        connection.query(sql,[data["compoff_id"]],function(err, results, fields) {
            console.log("qaasd",results);
            callback(null,results);
            connection.release();
            if (err) {
                callback(err, results);
            }
        });
    });
},

    updatecompoff: function (data, callback) {
    db.connection(function (err, connection) {
        if (err) {
            return callback(err);
        }
        var sql = "UPDATE compoff set description=?,worked_on=?,leave_on=?,`last_updated_timestamp`=? WHERE compoff_id=? AND status='Initial'";
        connection.query(sql, [data["description"],utilityMethods.format_date(data.worked_on.formatted,'YYYY-MM-DD'),utilityMethods.format_date(data.leave_on.formatted,'YYYY-MM-DD'),utilityMethods.currentTimestamp(),data["compoff_id"]], function (err, results, fields) {
            console.log(sql, data, results);
            callback(null, results);
            connection.release();
            if (err) {
                callback(err, results);

            }
        });
    });
},

    getempcompoff: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT c.compoff_id,c.employee_id,c.worked_on,c.leave_on,c.description,c.status,\n " +
                "(SELECT employee_name FROM employee tc WHERE tc.employee_id = c.employee_id) as employee_name,\n" +
              "(SELECT employee_email FROM employee tk WHERE tk.employee_id = c.employee_id) as employee_email\n" +
                "FROM compoff c WHERE c.employee_id IN (SELECT employee_id FROM employee_reporting WHERE reporting_employee_id=?)";
            var data_array = [data["employee_id"]];
            if(data.search && data.search != ""){
                sql = sql+" AND (employee_id like ? OR (SELECT employee_name FROM employee tc WHERE tc.employee_id = c.employee_id) like ? OR DATE_FORMAT(worked_on,'%b %e, %Y') like ? OR DATE_FORMAT(leave_on,'%b %e, %Y') like ? OR description like ?)";
                data_array=[data["employee_id"],"%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%"]
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

    acceptcompoff: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE compoff set status ='Granted',`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE compoff_id =? AND status='Initial'";

            var dataArr = [utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(),data["compoff_id"]];
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

    rejectcompoff: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE compoff set status ='Rejected', `rejected_reason` =?,`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE compoff_id =? AND status='Initial'";
            var dataArr = [data["rejected_reason"], utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(),data["compoff_id"]];
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


}
module.exports = dao;
