var q = require('q');
var dao = require('../dao/calendar_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var forEach = require('async-foreach').forEach;
var calendarFunctions = {


    getcalendarbranch: function(req,res,next){
        getcalendarbranch(req)
            .then(function(result){
                 res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    insertDays: function (req, res,next) {
        insertDays(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },


    calendarDetails: function (req, res,next) {
        calendarDetails(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    }


};
module.exports = calendarFunctions;




function  getcalendarbranch(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getcalendarbranch(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;

}


function insertDays(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.calendarDetails(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                dao.insertDays(data,function (err, res) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {
                        if (res == null || res.length ===0 ) {
                            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                        } else {
                            output = {code:2300,status:'success',message:'Schedule Added Successfully'};
                            deferred.resolve(output);
                        }
                    }
                });
            } else {

                dao.updateDays(data,function (err, res) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {
                        console.log(res);
                        if (res == null || res.length ===0 ) {
                            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                        } else {
                            output = {code:2300,status:'success',message:'Schedule Added Successfully'};
                            deferred.resolve(output);
                        }
                    }
                });
            }
        }
    });


    return deferred.promise;

}


function  calendarDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log("bfhdgbhkdg",data);
    dao.calendarDetails(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;

}
