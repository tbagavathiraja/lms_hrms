var q = require('q');
var dao = require('../dao/department_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var forEach = require('async-foreach').forEach;


var functions ={

    addDepartment: function (req,res,next){
        addDepartment(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },


    getAlldepartment: function(req,res,next){
        getAlldepartment(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },
    
    getDepartmentDetails: function(req,res,next){
    	getDepartmentDetails(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    deleteDepartment: function (req, res,next) {
        deleteDepartment(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    updateDepartment: function(req,res,next){
    	updateDepartment(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },

}
module.exports = functions;


function addDepartment(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("hdslfb",data);
    dao.addDepartment(data,function (err, res) {
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



function  getAlldepartment(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao. getAlldepartment(data,function (err, res) {
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

function  getDepartmentDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    data.department_id = req.params['department_id'];
    dao. getDepartmentDetails(data,function (err, res) {
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

function deleteDepartment(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.department_id = req.params['department_id'];
    dao.deleteDepartment(data,function (err, res) {
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

function updateDepartment(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.department_id = req.params['department_id'];
    dao.updateDepartment(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
        	console.log(res);
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;
}