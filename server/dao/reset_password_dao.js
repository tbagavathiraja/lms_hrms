var db = require('../config/db_connection_config');
var crypto = require('crypto');
const q = require('q');


var dao={

  checkUser:function (userEmail,callback) {
  db.connection(function (err,connection) {
    if(err)
    {
      callback(err,null);
    }

    var sql="SELECT `employee_id` FROM `employee` where `employee_email`=? ";
    connection.query(sql,[userEmail ],function(err,result,fields){
      callback(err,result);
      connection.release();
      if(err){
        callback(err, result);
      }else{
        callback(null, result);
      }

    });

  })

  },

  getUser:function(emailId,callback){

    db.connection(function (err,connection) {
      if(err)
      {
        callback(err);
      }

      var sql="   ";
      connection.query(sql,[ ],function(err,result,fields){


      });

    })



  },
  updatePassword:function (data,callback) {

    db.connection(function (err,connection) {
      if(err) {
        callback(err);
      }

      var sql="   ";
      connection.query(sql,[ ],function(err,result,fields){


      });

    })

  }

}

module.exports=dao;
