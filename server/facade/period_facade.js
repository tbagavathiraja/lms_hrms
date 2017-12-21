var q = require('q');
var dao = require('../dao/period_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var db = require('../config/db_connection_config');

var functions = {
    periodSummary: function (req, res,next) {
        getPeriod(req)
        .then(function (result) {
            res.$sendSuccess(result);
        })
        .catch(function(err){
            console.log(err)
             res.$sendFailure(err);
        })
    },
    addPeriod: function (req, res,next) {
        checkPeriodExists(req).
            then(function(periodExists){
                    if(periodExists){
                        return res.$sendSuccess(periodExists);
                    }
                    return addPeriod(req)
                        .then(function (result) {
                            res.$sendSuccess(result);
                        });
            })
            .catch(function(err){
                console.log(err)
                res.$sendFailure(err);
            })
    },
    updatePeriod: function (req, res,next) {
        checkPeriodExists(req).
        then(function(periodExists){
            console.log(periodExists)
            if(periodExists){
                return res.$sendSuccess(periodExists);
            }
            return updatePeriod(req)
                .then(function (result) {
                    console.log(result)
                    res.$sendSuccess(result);
                });
        })
            .catch(function(err){
                console.log(err)
                res.$sendFailure(err);
            })
    },
    deletePeriod: function (req, res,next) {
        checkPeriodInUse(req)
            .then(function(periodInUse){
                    console.log(periodInUse)
                    if(periodInUse){
                        return res.$sendSuccess(periodInUse);
                    }
                    return deletePeriod(req)
                        .then(function (result) {
                            console.log(result)
                            res.$sendSuccess(result);
                        });
                })
            .catch(function(err){
                console.log(err)
                res.$sendFailure(err);
            })
    }
    };
module.exports = functions;

function addPeriod(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;

    db.connection(function(err,connection){
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        connection.beginTransaction(function(err) {
            dao.addPeriod(data,function (err, res){
                if(err){
                    return connection.rollback(function() {
                        console.log(err)
                        deferred.reject(new errors.ServerError("Server error occured"));
                    });
                }
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function () {
                                deferred.reject(new errors.ServerError("Server error occured"));
                            });
                        }
                    });
                    deferred.resolve(res.affectedRows);
            },connection);
        });
    });

    return deferred.promise;
}

function getPeriod(req) {

    var deferred = q.defer();
    var output={};
    var data=req.query;

    db.connection (function (err,connection){
        dao.getPeriod(data,function (err, res) {
            if (err) {
                console.log("Error in login "+err)
                deferred.reject(new errors.ServerError("Server error occured"));
            } else {
                if (res == null || res.length ===0 ) {
                    deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                } else {
                    deferred.resolve(res);
                }
            }
        },connection);
    });
    return deferred.promise;
}


function checkPeriodExists(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    db.connection (function (err,connection){
        dao.checkPeriodExists(data,function (err, res){
            if(err){
                console.log(err)
                deferred.reject(new errors.ServerError("Server error occured"));
            }else{
                if(res && res[0].period_exists===1){
                    deferred.resolve(setResponse.build_response(api_response_constant.PERIOD_ALREADY_EXIST));
                }else{
                    deferred.resolve(null);
                }
            }

        },connection);
    });
    return deferred.promise;
}

function updatePeriod(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;

    db.connection(function(err,connection){
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        }

        connection.beginTransaction(function(err) {
            dao.updatePeriod(data,function (err, res){
                if(err){
                    return connection.rollback(function() {
                        console.log(err)
                        deferred.reject(new errors.ServerError("Server error occured"));
                    });
                }
                connection.commit(function(err) {
                    if (err) {
                        return connection.rollback(function () {
                            deferred.reject(new errors.ServerError("Server error occured"));
                        });
                    }
                });
                deferred.resolve(res.affectedRows);
            },connection);
        });
    });

    return deferred.promise;
}

function deletePeriod(req) {

    var deferred = q.defer();
    var output={};
    var data=req.query;

    db.connection(function(err,connection){
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        connection.beginTransaction(function(err) {
            dao.deletePeriod(data,function (err, res){
                if(err){
                    return connection.rollback(function() { s
                        deferred.reject(new errors.ServerError("Server error occured"));
                    });
                }
                connection.commit(function(err) {
                    if (err) {
                        return connection.rollback(function () {
                            deferred.reject(new errors.ServerError("Server error occured"));
                        });
                    }
                });
                connection.release();
                deferred.resolve(res.affectedRows);
            },connection);
        });
    });

    return deferred.promise;
}

function checkPeriodInUse(req) {

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data)
    db.connection(function(err,connection) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        dao.checkPeriodInUse(data, function (err, res) {
            if (err) {
                deferred.reject(new errors.ServerError("Server error occured"));
            }else{
                if(res && res.length>0){
                    deferred.resolve(setResponse.build_response(api_response_constant.PERIOD_IN_USE));
                }else{
                    deferred.resolve(null);
                }
            }

        },connection);
    });
    return deferred.promise
}