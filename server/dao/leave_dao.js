var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {

    insertLeave: function (data, callback) {
        db.connection(function (err, connection) {
            if (data.to_date &&  data.to_date ==null) {
              var sql = "INSERT INTO leaves (`employee_id`,`reason`,`leave_type`,`from_date`,`number_of_days`,`applied_on`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?,?)";
              var data_array = [data["employee_id"],data["reason"], data["leave_type"],utilityMethods.format_date(data.from_date.formatted,'YYYY-MM-DD'), data["number_of_days"], utilityMethods.currentTimestamp(), utilityMethods.currentTimestamp(), utilityMethods.currentTimestamp()];
            }else{
              console.log("2")
              var sql = "INSERT INTO leaves (`employee_id`,`reason`,`leave_type`,`from_date`,`to_date`,`number_of_days`,`applied_on`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?,?,?)";
              var data_array = [data["employee_id"],data["reason"], data["leave_type"],utilityMethods.format_date(data.from_date.formatted,'YYYY-MM-DD'),utilityMethods.format_date(data.to_date.formatted,'YYYY-MM-DD'), data["number_of_days"], utilityMethods.currentTimestamp(), utilityMethods.currentTimestamp(), utilityMethods.currentTimestamp()];

            }
             connection.query(sql,data_array , function (err, results, fields) {
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




    getleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT leave_id,employee_id,from_date,to_date,reason,leave_type,number_of_days,status,privelege_of_leave,rejected_reason FROM leaves WHERE employee_id=?";
            var data_array = [data["employee_id"]];
            if(data.search && data.search != ''){
            	sql = sql + " AND (DATE_FORMAT(from_date, '%b %e, %Y') LIKE ? OR DATE_FORMAT(to_date, '%b %e, %Y') LIKE ? OR reason LIKE ? OR leave_type LIKE ? OR number_of_days LIKE ? OR status LIKE ? OR privelege_of_leave LIKE ? OR rejected_reason LIKE ?)"
            	data_array = [data["employee_id"],"%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
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


  get_leave_holiday: function (data, callback) {
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


  get_initial_leave: function (data, callback) {
    console.log(data);
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT from_date,to_date,number_of_days FROM leaves WHERE employee_id=? AND status='Initial'";
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



  get_granted_leave: function (data, callback) {
    console.log(data);
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT from_date,to_date,number_of_days FROM leaves WHERE employee_id=? AND status='Granted'";
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



  deleteleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "DELETE FROM leaves WHERE leave_id=? AND status='Initial'";
            console.log(data.params);
            connection.query(sql, [data["leave_id"]], function (err, results, fields) {
                console.log(results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    totalleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT COUNT(*) as max_total FROM leaves WHERE employee_id=? AND status='Granted'";
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

    getEditleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT leave_id,leave_type,reason,DATE_FORMAT(from_date,'%d-%m-%Y') as from_date,DATE_FORMAT(to_date,'%d-%m-%Y') as to_date,number_of_days FROM leaves WHERE leave_id =?";
            connection.query(sql,[data["leave_id"]],function(err, results, fields) {
                console.log("qaasd",results);
                callback(null,results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },


    updateleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE leaves set reason=?,leave_type=?,from_date=?,to_date=?,number_of_days=?,last_updated_timestamp=? WHERE leave_id=? AND status='Initial'";
            connection.query(sql, [data["reason"], data["leave_type"],utilityMethods.format_date(data.from_date.formatted,'YYYY-MM-DD'),utilityMethods.format_date(data.to_date.formatted,'YYYY-MM-DD'), data["number_of_days"],utilityMethods.currentTimestamp(),data["leave_id"]], function (err, results, fields) {
                console.log(sql, data, results);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        });
    },

    getempleaves: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT  l.leave_id,l.employee_id,l.reason,l.leave_type,l.from_date,l.to_date,l.number_of_days,l.status,\n" +
                 "(SELECT employee_name FROM employee tl WHERE tl.employee_id = l.employee_id) as employee_name,\n" +
                "(SELECT employee_email FROM employee tk WHERE tk.employee_id = l.employee_id) as employee_email\n"+
                " FROM leaves l  WHERE  l.employee_id IN (SELECT employee_id FROM employee_reporting WHERE reporting_employee_id=?)";
            var data_array = [data["employee_id"]];
            if(data.search && data.search !=""){
                sql = sql+" AND (l.employee_id like ? OR DATE_FORMAT(l.from_date,'%b %e, %Y') like ? OR DATE_FORMAT(l.to_date,'%b %e, %Y') like ? OR (SELECT employee_name FROM employee tk WHERE tk.employee_id = l.employee_id) like ? OR l.reason like ? OR l.leave_type like ? OR l.number_of_days like ?)";
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




    acceptleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE leaves set status ='Granted',`privelege_of_leave`=?,`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE leave_id =? AND status ='Initial'";

            var dataArr = [data["status"],utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(), data["leave_id"]];
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

    rejectleave: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE leaves set status ='Rejected', `rejected_reason` =?,`responded_on`=?,`responded_by`=?,`last_updated_timestamp`=? WHERE leave_id =? AND status ='Initial'";
            var dataArr = [data["rejected_reason"], utilityMethods.currentTimestamp(),data["responded_by"],utilityMethods.currentTimestamp(), data["leave_id"]];
            console.log(dataArr);
            connection.query(sql, dataArr, function (err, results, fields) {
                connection.release();
                if (err) {
                    callback(err, results);
                }else{
                  callback(null, results);
                }
            });
        });


    },

  leaveType: function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT COUNT(privelege_of_leave) AS COUNT FROM leaves WHERE privelege_of_leave=? AND employee_id IN (SELECT employee_id FROM employee WHERE employee_email=?) AND status='Granted'";
      var dataArr = [data.leave_type,data.employee_email];
      console.log(dataArr);
      connection.query(sql, dataArr, function (err, results, fields) {
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
