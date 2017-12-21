var mysql = require('mysql');
var appConfig = require('../config/app_config');
var poolConnection = mysql.createPool(appConfig.dbConfig);
module.exports.connection = function(callback){

/*
  console.log(poolConnection.config.connectionLimit);
  console.log(poolConnection._freeConnections.length);
  console.log(poolConnection._allConnections.length);
  console.log(poolConnection._acquiringConnections.length);*/

    poolConnection.on('error',function(err){
        console.log("Error in connecting to database. error code -%s",err.code);
    callback(err);
});


    poolConnection.getConnection(function(err,connection){
        if(err){
            console.log("Error in connecting to database. error code -%s",err.code);
            callback(err);
        }
        callback(err,connection);
});

    poolConnection.on('enqueue', function(){
        console.log('Waiting for available connection slot');
});

    poolConnection.on('release',function(connection){
        console.log("Connection is now free to release");
});


    poolConnection.on('end',function(err){
        if(err){
            console.log("Problem in closing connection");
            poolConnection.destroy();
        }
        console.log("Connection will close once all the pending queries completed");
});

}
