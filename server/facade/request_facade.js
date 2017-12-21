var q = require('q');
var dao = require('../dao/request_dao');
var errors = require('../handler/error_handler');
var forEach = require('async-foreach').forEach;
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var utilityMethod = require('../utilities/utilitymethods');
var requestFunctions = {

    getRequestSummary: function (req, res,next) {
        getRequestSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getEmployeeList: function (req, res,next) {
        getEmployeeList(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    insertRequest: function (req, res,next) {
        insertRequest(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    updateRequest: function (req, res,next) {
        updateRequest(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    }

};
module.exports = requestFunctions;

function getRequestSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getRequestSummary(data,function (err, res) {
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

function insertRequest(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    if(data.resource_info.length <1){
        deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_REQUIRED));
    }
    data.no_of_resource = data.resource_info.length;
    dao.insertResourceRequest(data,function(err,res){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {

            data.resource_info.forEach(function (value,key) {
            	var start_date_format = value.request_start_date.date.year+"-"+value.request_start_date.date.month+"-"+value.request_start_date.date.day;
            	var end_date_format = value.request_end_date.date.year+"-"+value.request_end_date.date.month+"-"+value.request_end_date.date.day;
                var resourceData = {
                    'resource_request_id':res.insertId,
                    'employee_id':value.employee_id,
                    'comments':value.comments,
                    'start_date':start_date_format,
                    'end_date':end_date_format
                }

                dao.insertResourceRequestEmployee(resourceData,function (err, resp) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {
                        if(key === (data.resource_info.length - 1)){
                            deferred.resolve(resp);
                        }

                    }
                });

            })

        }
    });

    return deferred.promise;
}

function getEmployeeList(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getEmployeeList(data,function (err, res) {
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

function updateRequest(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.resource_request_id = req.params['resource_request_id'];
    if(data.resource_info.length <1){
        deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_REQUIRED));
    }
    data.no_of_resource = data.resource_info.length;
    dao.updateResourceRequest(data,function(err,res){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            var formArray = [];
            var employeeArray = [];
            dao.getResourceList(data,function(err,resourceResponse){
                if(err){
                    deferred.reject(new errors.ServerError("Server error occurred"));
                }else {

                   forEach(data.resource_info,function (value,key) {
                        formArray.push(value.employee_id);
                   });

                   forEach(resourceResponse,function (value,key) {
                       employeeArray.push(value.employee_id);
                   });
                   forEach(employeeArray,function (value,key) {
                       if(formArray.indexOf(value) == -1){
                            var deleteData = {
                                employee_id:value,
                                resource_request_id:data.resource_request_id
                            }
                            dao.deleteResource(deleteData,function(err,result){
                                if(err){
                                    deferred.reject(new errors.ServerError("Server error occurred"));
                                }
                            });

                       }
                   });
                   forEach(formArray,function(value,key){
                       if(employeeArray.indexOf(value) == -1)
                       {
                           forEach(data.resource_info,function (resoureValue,resourceKey) {
                               if(value == resoureValue.employee_id){
                                   var resourceData = {
                                           'resource_request_id':data.resource_request_id,
                                           'employee_id':resoureValue.employee_id,
                                           'comments':resoureValue.comments,
                                           
                                           'start_date':resoureValue.request_start_date.date.year+"-"+resoureValue.request_start_date.date.month+"-"+resoureValue.request_start_date.date.day,
                                           'end_date':resoureValue.request_end_date.date.year+"-"+resoureValue.request_end_date.date.month+"-"+resoureValue.request_end_date.date.day
                                       }
                                   dao.insertResourceRequestEmployee(resourceData,function (err, resp) {
                                       if (err) {
                                           deferred.reject(new errors.ServerError("Server error occured"));
                                       }
                                   });
                               }
                           });

                       }
                   });

                    forEach(data.resource_info,function (value,key) {
                        var resourceData = {
                            'resource_request_id':data.resource_request_id,
                            'employee_id':value.employee_id,
                            'comments':value.comments,
                            'start_date':value.request_start_date.date.year+"-"+value.request_start_date.date.month+"-"+value.request_start_date.date.day,
                            'end_date':value.request_end_date.date.year+"-"+value.request_end_date.date.month+"-"+value.request_end_date.date.day
                        }

                        dao.updateResourceRequestEmployee(resourceData,function (err, resp) {
                            if (err) {
                                deferred.reject(new errors.ServerError("Server error occured"));
                            } else {
                                if(key === (data.resource_info.length - 1)){
                                    deferred.resolve(resp);
                                }

                            }
                        });

                    });

                }

            })


        }
    });

    return deferred.promise;
}
