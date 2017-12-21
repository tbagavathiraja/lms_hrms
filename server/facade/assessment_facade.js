var q = require('q');
var async = require("async");
var dao = require('../dao/assessment_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var db = require('../config/db_connection_config');
//var sync = require('synchronize')

var assessmentFunctions = {

    getSelfSummary: function (req, res,next) {
        getSelfSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    get_assessment_period: function (req, res,next) {
    	get_assessment_period(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    get_assessment_employee: function (req, res,next) {
    	get_assessment_employee(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    addAssessment: function (req, res,next) {
    	addAssessment(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getEmployeeSummary: function (req, res,next) {
        getEmployeeSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getAssessmentList: function (req, res,next) {
    	getAssessmentList(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    deleteAssessment: function (req, res,next) {
    	deleteAssessment(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    getAssessment: function (req, res,next) {
        getEmployeeDetails(req)
            .then(function (employeeDetails) {
                return employeeDetails;
            })
            .then(function (employeeDetails) {
                getAssessmentDetails(employeeDetails)
                    .then(function (assessmentDetails) {
                        res.$sendSuccess(assessmentDetails);
                    })
                    .catch(function(err){
                        res.$sendFailure(err);
                    })
            })
            .catch(function(err){
                res.$end(err);
            })
    },
    getEmployees: function (req, res,next) {
        getEmployees(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$end(err);
            })
    },
    saveAssessment: function (req, res,next) {
        saveEmployeeDetails(req)
            .then(function (employeeDetails) {
                return employeeDetails;
            })
            .then(function (employeeDetails) {
                saveAssessmentDetails(req)
                    .then(function (assessmentDetails) {
                        res.$sendSuccess(assessmentDetails);
                    })
                    .catch(function(err){
                        res.$sendFailure(err);
                    })
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    submitAssessment: function (req, res,next) {
        submitAssessment(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })

    },
    getReportingManagers: function (req, res) {
        getReportingManagers(req).then(function (result) {
            res.$sendSuccess(result);
        }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    getAllEmployees: function (req, res) {
        console.log("asdfasdfsdasd")
        getAllEmployees(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            });
    },
    saveReportingManagers: function (req, res) {
        saveReportingManagers(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            });
    },


    resetManagers: function (req, res) {
        resetManagers(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            });
    }
};
module.exports = assessmentFunctions;

function getSelfSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getSelfSummary(data,function (err, res) {
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

function addAssessment(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    response = addAssessmentAction(data,function(){
    	 deferred.resolve(output);
    	 //return deferred.promise;
    });
    console.log(response);
    deferred.resolve(output);
    return deferred.promise;
}

function addAssessmentAction(data,maincallback){
	db.connection(function(err,connection){
    	connection.beginTransaction(function(err) {
    		//var checkAssessmentfn = sync(dao.checkAssessment);
    		dao.checkAssessment(connection,data,function (err, res) {
    			console.log("Assessment count:",res[0].period_count);
    			if(!err){
    				if(res[0].period_count > 0){
    					isRollback = data.employees.forEach(function(value,key){
    						console.log(value);
    						isAssessment_success = dao.checkEmployeeAssessment(connection,data,value,function (checkEmperr, checkEmpres) {
    							console.log("Empployee count:",checkEmpres[0].employee_count);
								if(checkEmpres[0].employee_count == 0){
									isemployee_success = dao.insertEmployeeAssessment(connection,value,data.selectedValue,function (InsEmperr, InsEmpres) {
										if(InsEmperr){
											rollback(connection,1);
											maincallback()
										}
										//var getParameterfn = sync(dao.getParameter);
										parameter = dao.getParameter(connection,data,function(err,paramres){
											kra_count = 0;
											isParamSuccess = paramres.forEach(function(param,paramKey){
												//var insertAssessmentDetailsfn = sync(dao.insertAssessment_details);
												isInsAssess = dao.insertAssessment_details(connection,InsEmpres.insertId,param.assessment_parameter_id,param.default_parameter_weightage,function(insParamErr,insParamRes){
													if(insParamErr){
														rollback(connection,2);
														maincallback()
													}
													if(param.apraisal_parameter_type == 'KRA'){
														kra_name = "KRA-"+kra_count;
														//var getKRAfn = sync(dao.getKRA);
														KRA = dao.getKRA(connection,value,kra_count,function(kraerr,krares){
															return krares;
														});
														if(KRA){
															if(KRA[0].kra_name){
																kra_name = "KRA-"+kra_count;
															}
														}
														//var insertKRAfn = sync(dao.insertKRADetails);
														isInsKRA = dao.insertKRADetails(connection,insParamRes.insertId,kra_name,function(KRAerr,KRARes){
															if(KRAerr){
																rollback(connection,3);
																maincallback()
															}
														})
													}

												})
											});
										});
									});
								}
							});
    					});
    				}else{
    					rollback(connection,4);
						maincallback()
    				}
    			}else{
    				rollback(connection,5);
					maincallback()
    			}
    			connection.commit(function(err){
        			console.log('transaction committed');
        			maincallback()
        		});
    		});

    	});
    });
}

function rollback(connection,rollback_count){
	connection.rollback(function(err){
		console.log('transaction rollbacked'+rollback_count);
	});
}

function get_assessment_period(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    db.connection(function(err,connection){
    	connection.beginTransaction(function(err) {
    		dao.get_assessment_period(connection,data,function (err, res) {
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
    		connection.commit(function(err){
				console.log(err);
				console.log('transaction committed');
			});
    	});
    	connection.release();
    });

    return deferred.promise;
}

function get_assessment_employee(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    db.connection(function(err,connection){
    	connection.beginTransaction(function(err) {
    		dao.get_assessment_employee(connection,data,function (err, res) {
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
    		connection.commit(function(err){
				console.log(err);
				console.log('transaction committed');
			});
    	});
    	connection.release();
    });

    return deferred.promise;
}

function getAssessmentList(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    dao.getAssessmentList(data,function (err, res) {
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
function deleteAssessment(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    db.connection(function(err,connection){
    	connection.beginTransaction(function(err) {
    		dao.getEmployeeAssessmentDetails(connection,data,function(err,result){
    			if(!err){
    				//deleting kra details
    				dao.deleteKra(connection,result,function(err,result){
    					if(!err){
    						//deleting assessment details
    						dao.deleteAssessmentDetails(connection,data.delete_id,function(err,result){
    							if(!err){
    								dao.deleteEmployeeAssessment(connection,data.delete_id,function(err,result){
    									if(err){
    										console.log(err);
    										connection.rollback(function(err){
        										console.log(err);
        										console.log('transaction rollbacked1');
        									});
    										return;
    									}else{
    										connection.commit(function(err){
        										console.log(err);
        										console.log('transaction committed');
        									});
    									}
    								});
    							}else{
    								connection.rollback(function(err){
										console.log(err);
										console.log('transaction rollbacked2');
									});
									return;
    							}
    							console.log(err);
    						});
    					}else{
							connection.rollback(function(err){
								console.log(err);
								console.log('transaction rollbacked3');
							});
							return;
						}
    				});
    			}else{
					connection.rollback(function(err){
						console.log(err);
						console.log('transaction rollbacked4');
					});
					return;
				}
    			console.log(err);
    		})
    });
    	connection.release();
    });
    /*var deleteData = dao.deleteAssessment(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(output);
            }
        }
    });*/
    deferred.resolve(output);
    return deferred.promise;
}

function getEmployeeDetails(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    data.status=1;
    dao.getEmployeeDetails(data,function (err, res) {
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

function getEmployees(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    data.status=1;
    data.type=''
    dao.getEmployees(data,function (err, res) {
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

function saveEmployeeDetails(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.saveEmployeeDetails(data,function (err, res) {
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

function submitAssessment(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    if(!data.assesmentStatus){
        data.assesmentStatus ='SUBMITTED';
    }
    console.log(data);
    dao.submitAssessment(data,function (err, res) {
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


function saveAssessmentDetails(req) {
    var deferred = q.defer();
    var output;
    var data=req.body;
    var id=data.employeeDetail['employee_assessment_id']
    async.forEach((data.assessmentDetail),function (item, callback){
        item.id=id;
        dao.saveAssessmentDetails(item, function (err, res) {
            if (err) {
                deferred.reject(new errors.ServerError("Server error occured"));

            } else {
                output=res;
                callback();
            }
        });
    }, function(err) {
        if(err){
            deferred.reject(new errors.ServerError("Server error occured"));
        }else{
            deferred.resolve(output);
        }

    });
    return deferred.promise;
}

function resetManagers(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;

    dao.resetManagers(data,function (err, res) {
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

function getAssessmentDetails(req) {

    var deferred = q.defer();
    var output={};
    var data=req[0];
    data.status=1;
    dao.getAssessmentDetails(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                console.log(res,req);
                var response = {
                'assessment_details':res,
                'employee_details':req[0]

                };
                console.log(response);
                deferred.resolve(response);
            }
        }
    });
    return deferred.promise;
}


function getEmployeeSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getEmployeeSummary(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            deferred.resolve(res);
        }
    });
    return deferred.promise;
}


function getReportingManagers(req) {

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);

    db.connection(function(err,connection){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        dao.getReportingManagers(connection,data,function (err, res) {
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
    });
    return deferred.promise;
}

function getAllEmployees(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;

     db.connection(function(err,connection){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        dao.getAllEmployees(connection,data,function (err, res) {
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
    });
    return deferred.promise;
}
/*

function saveReportingManagers(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    db.connection(function(err,connection){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }

        let removedRepManagers = setResponse.array_diff(data.reporting_managers_prev,data.reporting_managers);
        let newRepManagers = setResponse.array_diff(data.reporting_managers,data.reporting_managers_prev);

        dao.saveReportingManagers(connection,{tenant_id:data.tenant_id,employee,reporting_managers:newRepManagers},function (err, res) {
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
        deferred.resolve(null);
    });
    return deferred.promise;
}
*/

function saveReportingManagers(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    const removedRepManagers = data.reporting_managers_prev;
    const newRepManagers = data.reporting_managers;

     db.connection(function(err,connection){
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }
        connection.beginTransaction(function(err){
            async.series([
                    function(callback) {
                        if(newRepManagers.length>0) {
                             dao.saveReportingManagers(connection, {
                                tenant_id: data.tenant_id,
                                employee: data.employee,
                                reporting_managers: newRepManagers
                            }, function (err, res) {

                                if (err) {
                                    return connection.rollback(function () {
                                        callback(err);
                                    });
                                } else {
                                    output = res;
                                    callback(null, res);
                                }

                            });
                        }else{
                            callback(null, []);
                        }
                    },
                    function(callback) {
                            if(removedRepManagers.length>0) {
                                 dao.deletePrevReportingManagers(connection, {
                                    tenant_id: data.tenant_id,
                                    employee: data.employee,
                                    reporting_managers_prev: removedRepManagers
                                }, function (err, res) {
                                    if (err) {
                                        return connection.rollback(function () {
                                            callback(err);
                                        });
                                    } else {
                                        output = res;
                                        callback(null, res);
                                    }

                                });
                            }else{
                                callback(null, []);
                            }
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
                      deferred.resolve(output);
                        connection.release();

                    }
                });

        });
    });
    return deferred.promise;
}