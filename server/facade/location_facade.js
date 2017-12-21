var q = require('q');
var dao = require('../dao/location_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var forEach = require('async-foreach').forEach;


var functions ={

    addLocation: function (req, res,next) {
        addLocation(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getLocation: function(req,res,next){
        getLocation(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },
    
    getLocationDetails: function(req,res,next){
    	getLocationDetails(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },
    
    updateLocation: function(req,res,next){
    	updateLocation(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    deleteLocation: function (req, res,next) {
        deleteLocation(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

}
module.exports = functions;


function addLocation(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.addLocation(data,function (err, res) {
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

function  getLocation(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao. getLocation(data,function (err, res) {
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

function  getLocationDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    data.location_id = req.params['location_id'];
    dao. getLocationDetails(data,function (err, res) {
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

function  updateLocation(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.location_id = req.params['location_id'];
    dao. updateLocation(data,function (err, res) {
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

function deleteLocation(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.location_id = req.params['location_id'];
    dao.deleteLocation(data,function (err, res) {
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