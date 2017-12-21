var q = require('q');
var dao = require('../dao/employee_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var db = require("../config/db_connection_config")
var async = require('async');

var requestFunctions = {

    getEmployeeSummary: function (req, res,next) {
    	getEmployeeSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getProfileSummary: function (req, res,next) {
        getProfileSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getemployeeshistory: function (req, res,next) {
        getemployeeshistory(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    insert_employee: function (req, res,next) {
    	insert_employee(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    get_employee: function (req, res,next) {
    	get_employee(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    update_employee: function (req, res,next) {
    	update_employee_data(req)
                .then(function (result) {
                    console.log("final result",result);
                    res.$sendSuccess(result);
                })
                .catch(function(err){
                    console.log("final err",err)
                    res.$sendFailure(err);
                })
        },
    update_myProfile: function (req, res,next) {
        update_myProfile(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    deleteEmployee: function (req, res,next) {
    	deleteEmployee(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getRoles : function(req,res,next){
        db.connection(function(err,connection){
            getRoles(connection,req).
            then(function(result){
                res.$sendSuccess(result);
            }).
            catch(function(err){
                res.$sendSuccess(err);
            });
        });

    }

};
module.exports = requestFunctions;

function getEmployeeSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getEmployeeSummary(data,function (err, res) {
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

function getProfileSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getProfileSummary(data,function (err, res) {
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

function getemployeeshistory(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getemployeeshistory(data,function (err, res) {
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

function insert_employee(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.get_employee(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res.length > 0) {
                deferred.resolve(setResponse.build_response(api_response_constant.USER_EMAIL_ADDRESS_ALREADY_EXISTS));
            }else{
            	dao.get_employee_for_number(data,function (err1, res1) {
            		if (err1) {
            			deferred.reject(new errors.ServerError("Server error occured"));
            		}else{
            			if (res1.length > 0) {
            				deferred.resolve(setResponse.build_response(api_response_constant.USER_NUMBER_ALREADY_EXISTS));
            			}else{
            				db.connection(function(err,connection){
            			        if(err){
            			            deferred.reject(new errors.ServerError("Server error occured"));
            			        }
            			        connection.beginTransaction(function(err){
            			             if(err){
            			                deferred.reject(new errors.ServerError("Server error occured"));
            			            }
            			             dao.insert_employee(connection,data,function (err, res) {
            			                console.log("error",err)
            			                if (err) {
            			                    deferred.reject(new errors.ServerError("Server error occured"));
            			                } else {
            			                    console.log(res)
            			                     data.employee_id = res.insertId;
            			                    dao.insert_employee_role(connection,data,function (err, res) {
            			                        console.log(err)
            			                        if (err) {
            			                            return connection.rollback(function(){
            			                                deferred.reject(new errors.ServerError("Server error occured"));
            			                            });
            			                        } else {
            			                            connection.commit(function (err) {
            			                                if(err){
            			                                    return connection.rollback(function(){
            			                                        deferred.reject(new errors.ServerError("Server error occured"));
            			                                    })
            			                                }
            			                            });
            			                            connection.release();
            			                            deferred.resolve(output);
            			                        }
            			                    });

            			                }
            			            });
            			        });
            			    })
            			}
            		}
            	});
            }
        }
        return deferred.promise;
    });
    
    return deferred.promise;
}
function get_employee(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.employee_id = req.params['employee_id'];
    data.employee_email =data.employee_id;
    dao.get_employee(data,function (err, res) {
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
function update_employee_data(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.employee_id = req.params['employee_id'];
    db.connection(function(err,connection){
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        connection.beginTransaction(function(err){
            async.series([
                    function(callback) {
                        dao.update_employee(connection,data, function (err, res) {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        callback(err);
                                    });
                                } else {
                                    output = res;
                                    callback(null, res);
                                }

                            });
                    },
                    function(callback) {
                        dao.get_employee(data,function (err, res) {
                            if (err) {
                                deferred.reject(new errors.ServerError("Server error occured"));
                            } else {
                                if (res == null || res.length ===0 ) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        callback(err);
                                    });
                                }else if (res[0].role == null) {
                                     var roleData = {
                                         role:data.role,
                                         tenant_id:res[0].tenant_id,
                                         employee_id:res[0].employee_id
                                     }
                                    console.log(roleData);
                                    dao.insert_employee_role(connection,roleData, function (err, res) {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                callback(err);
                                            });
                                        } else {
                                            output = res;
                                            callback(null, res);
                                        }

                                    });
                                } else {

                                    dao.updateRole(connection,data, function (err, res) {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                callback(err);
                                            });
                                        } else {
                                            output = res;
                                            callback(null, res);
                                        }

                                    });
                                }
                            }
                        });

                    }
                ],
                // optional callback
                function(err, results) {
                    if(err){
                        console.log(err)
                        deferred.reject(new errors.ServerError("Server error occured"));
                    }else{
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    deferred.reject(new errors.ServerError("Server error occured"));
                                });
                            }
                            console.log('success!');
                        });
                        connection.release();
                        deferred.resolve(output);
                    }
                });

        });
    });
    return deferred.promise;
}

function update_myProfile(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.update_myProfile(data,function (err, res) {
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

function deleteEmployee(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.deleteEmployee(data,function (err, res) {
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

function getRoles(connection,req) {
    var deferred = q.defer();
    var output={};
    var data = req;
    if(req.query!==undefined && req.query!==""){
        var data = req.query;
    }
    console.log(data)
    dao.getRoles(connection,data,function (err, res) {
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
    connection.release();
    return deferred.promise;
}

