var q = require('q');
var dao = require('../dao/assessment_parameter_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var functions = {

		getAll: function (req, res,next) {
			getAll(req)
        .then(function (result) {
            res.$sendSuccess(result);
        })
        .catch(function(err){
            res.$sendFailure(err);
        })
    },
    getDetail: function (req, res,next) {
    	getDetail(req)
	    .then(function (result) {
	        res.$sendSuccess(result);
	    })
	    .catch(function(err){
	        res.$sendFailure(err);
	    })
    },
    insert_parameter: function (req, res,next) {
    	insert_parameter(req)
	    .then(function (result) {
	        res.$sendSuccess(result);
	    })
	    .catch(function(err){
	        res.$sendFailure(err);
	    })
    },
    update_parameter: function (req, res,next) {
    	update_parameter(req)
	    .then(function (result) {
	        res.$sendSuccess(result);
	    })
	    .catch(function(err){
	        res.$sendFailure(err);
	    })
    },
    delete_parameter: function (req, res,next) {
    	delete_parameter(req)
    .then(function (result) {
        res.$sendSuccess(result);
    })
    .catch(function(err){
        res.$sendFailure(err);
    })
},
};
module.exports = functions;

function getAll(req) {

    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getAll(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length === 0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;
}
function update_parameter(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.parameter_id = req.params['parameter_id'];
    dao.updateParameter(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            deferred.resolve(output);
        }
    });
    return deferred.promise;
}
function insert_parameter(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getDetailByName(data,function (err, res) {
    	if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if(res.length==0){
            	dao.insertParameter(data,function (err, res) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {
                        deferred.resolve(res);
                    }
                });
            }else{
            	deferred.resolve(setResponse.build_response(api_response_constant.PARAMETER_IN_USE));
            }
        }
    });
    return deferred.promise;
}
function getDetail(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.parameter_id = req.params['parameter_id'];
    dao.getDetail(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.UNAUTHORIZED_ACCESS));
            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;
}

function delete_parameter(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.delete_parameter(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
        	deferred.resolve(output);
        }
    });
    return deferred.promise;
}