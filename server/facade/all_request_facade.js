var q = require('q');
var db = require('../config/db_connection_config');
var dao = require('../dao/all_request_dao');
var requestDao = require('../dao/request_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var forEach = require('async-foreach').forEach;
var setResponse = require('../utilities/utilitymethods');
var utilityMethod = require('../utilities/utilitymethods');
var resourceRequestConstant = require('../utilities/constants/resource_request_constant');
var requestFunctions = {

		getAll: function (req, res,next) {
			getAll(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
        },

        getRequestDetails: function (req, res,next) {
            getRequestDetails(req)
                .then(function (result) {
                    res.$sendSuccess(result);
                })
                .catch(function(err){
                    res.$sendFailure(err);
                })
        },

        approveRequest: function (req, res,next) {
            approveRequest(req)
                .then(function (result) {
                    res.$sendSuccess(result);
                })
                .catch(function(err){
                    res.$sendFailure(err);
                })
        },

        getRequestSummary: function (req, res,next) {
            getRequestSummary(req)
                .then(function (result) {
                    res.$sendSuccess(result);
                })
                .catch(function(err){
                    res.$sendFailure(err);
                })
        },

         deleteResourceRequest: function (req, res,next) {
                checkRequestBeForeDelete(req).
                    then(function(result){
                        if(result){
                          return  res.$sendSuccess(result);
                        }
                        return deleteRquest(req).then(function(result){
                            res.$sendSuccess(result);
                        });
                    }).
                    catch(function(err){
                        res.$sendFailure(err);
                    })
        },
        modifyRequest: function (req, res,next) {
            modifyRequest(req)
                .then(function (result) {
                    res.$sendSuccess(result);
                })
                .catch(function(err){
                    res.$sendFailure(err);
                })
        },

};
module.exports = requestFunctions;

function getAll(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getAll(data,function (err, res) {
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
function getRequestDetails(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.resource_request_id = req.params['resource_request_id'];
    dao.get_request(data,function (err, res) {
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

function getRequestSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.resource_request_id = req.params['resource_request_id'];
    var response = {};
    dao.get_request_details(data,function (err,res) {
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        } else{
            if(res== null || res.length === 0){
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            }
            else{
                response.project_info = res;
                dao.get_request(data,function (err, resp) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {
                        if (resp == null || resp.length ===0 ) {
                            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                        } else {
                            response.request_info = resp;
                            deferred.resolve(response);
                        }
                    }
                });
            }
        }
    })

    return deferred.promise;
}

function approveRequest(req) {
    var deferred = q.defer();
    var output={};

    var data=req.body;
    data.resource_request_id = req.params['resource_request_id'];
    if(data.request_status === 'APPROVED'){
        requestDao.getResourceList(data,function (err, resourceList) {
            if (err) {
                deferred.reject(new errors.ServerError("Server error occured"));
            } else {

                var itemsProcessed = 0;
                forEach(resourceList,function (value) {
                    itemsProcessed++;
                    var resourceCheck = {
                        'employee_id':value.employee_id,
                        'request_start_date':value.request_start_date,
                        'request_end_date':value.request_end_date,
                        'resource_request_id':data.resource_request_id
                    }
                    dao.checkResourceAvailable(resourceCheck,function(err,res){
                        if(err){
                            deferred.reject(new errors.ServerError("Server error occured"));
                        }
                        else{
                            forEach(res,function(val){

                                if(val.is_available > 0){
                                    deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_IN_USE));
                                }
                                else{
                                    if(itemsProcessed === resourceList.length) {
                                        dao.approveRequest(data,function (err, res) {
                                            if (err) {
                                                deferred.reject(new errors.ServerError("Server error occured"));
                                            } else {
                                                dao.changeResourceStatus(data,function (err, resp) {
                                                    if (err) {
                                                        deferred.reject(new errors.ServerError("Server error occured"));
                                                    } else {

                                                        deferred.resolve(resp);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                            });

                        }
                    });
                });
            }
        })
    }
    else{
        dao.approveRequest(data,function (err, res) {
            if (err) {
                deferred.reject(new errors.ServerError("Server error occured"));
            } else {
                dao.changeResourceStatus(data,function (err, resp) {
                    if (err) {
                        deferred.reject(new errors.ServerError("Server error occured"));
                    } else {

                        deferred.resolve(resp);
                    }
                });
            }
        });
    }

    return deferred.promise;
}

function checkRequestBeForeDelete(req) {
    var deferred = q.defer();
    var data = req.query;
    db.connection(function (err,connection) {
        dao.checkRequestBeForeDelete(connection,data,function (err, res) {
            if (err) {
                deferred.reject(new errors.ServerError("Server error occured"));
            } else {
                if (res && res.length > 0 ) {
                    deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_REQUEST_IN_USE));
                } else {
                    deferred.resolve(null);
                }
            }
        });
    });
    return deferred.promise;
}

function deleteRquest(req){
    var deferred = q.defer();
    var output = {};
    var data = req.query;
    db.connection(function (err,connection) {
        connection.beginTransaction(function(err) {
            dao.deleteRequest(connection,data,function (err, res) {
                if (err) {
                    return connection.rollback(function() {
                        console.log(err)
                        deferred.reject(new errors.ServerError("Server error occured"));
                    });
                } else {
                    connection.commit(function(err) {
                        if (err) {
                            return connection.rollback(function () {
                                deferred.reject(new errors.ServerError("Server error occured"));
                            });
                        }
                    });
                    deferred.resolve(output);
                }
            });
        });
    });
    return deferred.promise;
}

function modifyRequest(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.resource_request_id = req.params['resource_request_id'];
    if(data.resource_info.length <1){
        deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_REQUIRED));
    }
    data.no_of_resource = data.resource_info.length;

    var formArray = [];
    var employeeArray = [];
    requestDao.getResourceList(data,function(err,resourceResponse){
        if(err){
            deferred.reject(new errors.ServerError("Server error occurred"));
        }else {

            var itemsProcessed = 0;
            forEach(data.resource_info,function (value) {
                itemsProcessed++;
                var resourceCheck = {
                    'resource_request_id':data.resource_request_id,
                    'employee_id':value.employee_id,
                    'request_start_date':utilityMethod.format_date(value.request_start_date.formatted,'DD-MM-YYYY'),
                    'request_end_date':utilityMethod.format_date(value.request_end_date.formatted,'DD-MM-YYYY')
                }
                dao.checkResourceAvailable(resourceCheck,function(err,res){
                    if(err){
                        deferred.reject(new errors.ServerError("Server error occured"));
                    }
                    else{
                        forEach(res,function(val){
                            if(value.status === resourceRequestConstant.requestStatus.STATUS_APPROVED){
                                if(val.is_available > 0){
                                    console.log(resourceCheck);
                                    deferred.resolve(setResponse.build_response(api_response_constant.RESOURCE_IN_USE));
                                }
                            }
                            if(itemsProcessed === data.resource_info.length) {
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
                                        requestDao.deleteResource(deleteData,function(err,result){
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
                                                    'start_date':utilityMethod.format_date(value.request_start_date,'DD-MM-YYYY'),
                                                    'end_date':utilityMethod.format_date(value.request_end_date,'DD-MM-YYYY')
                                                }
                                                requestDao.insertResourceRequestEmployee(resourceData,function (err, resp) {
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
                                        'start_date':utilityMethod.format_date(value.request_start_date.formatted,'YYYY-MM-DD HH:mm:ss'),
                                        'end_date':utilityMethod.format_date(value.request_end_date.formatted,'YYYY-MM-DD HH:mm:ss'),
                                        'status':value.status
                                    }

                                    requestDao.updateResourceApproval(resourceData,function (err, resp) {
                                        if (err) {
                                            deferred.reject(new errors.ServerError("Server error occured"));
                                        }
                                    });

                                });
                                var resourceData = {
                                    'approver_employee_id':data.employee_id,
                                    'resource_request_id':data.resource_request_id
                                }
                                dao.updateRequestBasedOnResource(resourceData,function (err, resp) {
                                    if (err) {
                                        deferred.reject(new errors.ServerError("Server error occured"));
                                    }
                                    else{
                                        deferred.resolve(resp);
                                    }
                                });
                            }
                        });

                    }
                });
            });


        }

    });
    return deferred.promise;
}
