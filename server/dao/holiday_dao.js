var db = require('../config/db_connection_config');
var crypto = require('crypto');
var utilityMethods = require('../utilities/utilitymethods');


var dao = {
    addHoliday: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "INSERT INTO holiday (`tenant_id`,`holiday_name`,`holiday_date`,`location_id`,`department_id`,`created_timestamp`,`last_updated_timestamp`) values (?,?,?,?,?,?,?)";
            console.log(data);
            connection.query(sql,[data.tenant_id,data.holiday_name,utilityMethods.format_date(data.holiday_date.formatted,'YYYY-MM-DD'),data.location_id,data.department_id,utilityMethods.current_datetime(),utilityMethods.current_datetime()], function (err, results, fields) {
                console.log(sql, err);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        })
    },

    getholiday:function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT h.holiday_id, h.holiday_name, h.holiday_date, (select location_name from location where location_id=h.location_id) as location_name, (select department_name from department where department_id=h.department_id) as department_name FROM holiday as h";
            var data_array = [];
            if(data.search && data.search != ""){
                sql = sql+" WHERE h.holiday_name like ? OR DATE_FORMAT(h.holiday_date,'%b %d, %Y') like ?  OR (select location_name from location where location_id=h.location_id) like ? OR (select department_name from department where department_id=h.department_id) like ?";
                data_array=["%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%"]
            }
            connection.query(sql, data_array, function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err);
                    callback(err, results);
                }
            });
        });
    },

  get_emplist:function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT location,department FROM employee WHERE employee_id = ?";
      var data_array = [data.employee_id];
      connection.query(sql, data_array, function (err, results, fields) {
        callback(null, results);
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
      });
    });
  },

  get_locationId:function (data, callback) {
     db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT location_id AS location  FROM location  WHERE location_name =? UNION ALL SELECT department_id AS department_id FROM  department WHERE department_name=? ";
      var data_array= [data["location"],data["department"]];
      connection.query(sql, data_array, function (err, results, fields) {
        callback(null, results);
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
      });
    });
  },

  get_departmentId:function (data, callback) {
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT department_id   FROM department WHERE department_name =?";
      var data_array= [data["department"]];
      connection.query(sql, data_array, function (err, results, fields) {
        callback(null, results);
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
      });
    });
  },


  get_holiday:function (data, callback) {
      console.log("db",data)
    db.connection(function (err, connection) {
      if (err) {
        return callback(err);
      }
      var sql = "SELECT holiday_id, holiday_name,holiday_date FROM holiday WHERE location_id=? AND department_id=?";
      var data_array = [data["location_id"],data["department_id"]];
      if(data.search && data.search != ""){
        sql = sql+" WHERE h.holiday_name like ? OR DATE_FORMAT(h.holiday_date,'%b %d, %Y') like ?  OR (select location_name from location where location_id=h.location_id) like ? OR (select department_name from department where department_id=h.department_id) like ?";
        data_array=["%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%","%"+data["search"]+"%"]
      }
      connection.query(sql, data_array, function (err, results, fields) {
        callback(null, results);
        connection.release();
        if (err) {
          console.log(err);
          callback(err, results);
        }
      });
    });
  },

    getHolidayDetails:function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "SELECT h.holiday_id, h.holiday_name, DATE_FORMAT(h.holiday_date,'%d-%m-%Y') AS holiday_date, location_id, department_id FROM holiday as h WHERE holiday_id = ?";
            var data_array = [data.holiday_id];
            connection.query(sql, data_array, function (err, results, fields) {
                callback(null, results);
                connection.release();
                if (err) {
                    console.log(err);
                    callback(err, results);
                }
            });
        });
    },

    updateHoliday: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "UPDATE holiday SET `holiday_name` = ?,`holiday_date` = ?,`location_id` = ?,`department_id` = ?, last_updated_timestamp = ?  WHERE holiday_id = ?";
            console.log(data);
            connection.query(sql,[data.holiday_name,utilityMethods.format_date(data.holiday_date.formatted,'YYYY-MM-DD'),data.location_id,data.department_id,utilityMethods.current_datetime(),data.holiday_id], function (err, results, fields) {
                console.log(sql, err);
                callback(null, results);
                connection.release();
                if (err) {
                    callback(err, results);
                }
            });
        })
    },

    deleteholiday: function (data, callback) {
        db.connection(function (err, connection) {
            if (err) {
                return callback(err);
            }
            var sql = "DELETE FROM holiday WHERE holiday_id=?";
            connection.query(sql, [data["holiday_id"]], function (err, results, fields) {
                console.log(results);
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
