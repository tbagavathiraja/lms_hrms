var q = require('q');
var dao = require('../dao/project_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var projectFunctions = {

    getProjectSummary: function (req, res,next) {
        getProjectSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getAllProjectSummary: function (req, res,next) {
        getAllProjectSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getMyProjectSummary: function (req, res,next) {
        getMyProjectSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    }

};
module.exports = projectFunctions;

function getProjectSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getProjectSummary(data,function (err, res) {
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

function getAllProjectSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getAllProjectSummary(data,function (err, res) {
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

function getMyProjectSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getMyProjectSummary(data,function (err, res) {
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


