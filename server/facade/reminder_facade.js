var q = require('q');
var dao = require('../dao/reminder_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var moment = require('moment');
var config = require('../config/app_config');
var Mail = require('../utilities/mail');
var forEach = require('async-foreach').forEach;
var utilityMethods = require('../utilities/utilitymethods');
var reminderFunctions = {

    getReminderSummary: function (req, res,next) {
        getReminderSummary(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    releaseResource: function (req, res,next) {
        releaseResource(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    sendMail: function (req, res,next) {
        sendMail(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    send_remainder_leaveMail: function () {
        send_remainder_leaveMail()
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    send_remainder_permissionMail: function () {
        send_remainder_permissionMail()
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    send_remainder_compoffMail: function () {
        send_remainder_compoffMail()
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    }


};
module.exports = reminderFunctions;

function getReminderSummary(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    dao.getReminderSummary(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {


                res.forEach(function (value,key) {
                    var now  =moment(config.CURRENT_TIME);
                    var then =moment(value.request_end_date).add(1, 'days');;

                    var duration = moment.duration(then.diff(now));
                    var days = duration.asDays();
                    var hours = duration.asHours();
                    var minutes = duration.asMinutes();
                    if(minutes >= 1){
                        value['duration'] = minutes.toFixed(0)+" minutes";
                    }
                    if(hours >= 1){
                        value['duration'] = hours.toFixed(1)+" hours";
                    }
                    if(days >= 1) {
                        value['duration'] = days.toFixed(1) + " days";
                    }
                });
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;
}

function releaseResource(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.resource_request_employee_id = req.params['resource_request_employee_id'];
    dao.releaseResource(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {

            dao.updateResourceReleaseRequest(data,function (err, res) {
                if (err) {
                    deferred.reject(new errors.ServerError("Server error occured"));
                } else {
                    deferred.resolve(res);

                }
            });
        }
    });
    return deferred.promise;
}

function sendMail() {
    var deferred = q.defer();
    var output={};
    var data={};
    dao.getRequestEmployees(data,function (err, employeeData) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (employeeData == null || employeeData.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {

                forEach(employeeData,function (employee,employeeKey) {
                    var reminderData ={
                        'employee_id':employee.request_employee_id
                    }
                    dao.getReminderSummary(reminderData,function (err, res) {
                        if (err) {
                            deferred.reject(new errors.ServerError("Server error occured"));
                        } else {
                            if (res == null || res.length ===0 ) {
                                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                            } else {

                                var mailData = "<table border = 1><th style='width:30%;'>Project Name</th><th style='width:20%;'>Employee Name</th><th style='width:10%;' class='text-right'>Expires In</th><th style='width:20%;' class='text-right'>Start Date</th><th style='width:20%;' class='text-right'>End Date</th>";
                                forEach(res,function (value,key) {
                                    var now  =moment(config.CURRENT_TIME);
                                    var then =moment(value.request_end_date).add(1, 'days');;

                                    var duration = moment.duration(then.diff(now));
                                    var days = duration.asDays();
                                    var hours = duration.asHours();
                                    var minutes = duration.asMinutes();
                                    if(minutes >= 1){
                                        value['duration'] = minutes.toFixed(0)+" minutes";
                                    }
                                    if(hours >= 1){
                                        value['duration'] = hours.toFixed(1)+" hours";
                                    }
                                    if(days >= 1) {
                                        value['duration'] = days.toFixed(1) + " days";
                                    }

                                    mailData += "<tr><td>"+value.project_name+"</td><td>"+utilityMethods.toTitleCase(value.employee_name)+"</td><td>"+value.duration+"</td><td>"+value.start_date+"</td><td>"+value.end_date+"</td></tr>";
                                    if(key === res.length-1){
                                        mailData +="</table>";
                                        console.log(employee);
                                        Mail.sendMail(employee.email_id,'Resource Reminder ','Hi hello',mailData);
                                        console.log(employeeKey);
                                        console.log(employee.length);
                                        if(employeeKey === employeeData.length-1){
                                            deferred.resolve(output);
                                        }
                                    }
                                });


                            }
                        }
                    });

                });


            }
        }
    });
    return deferred.promise;
}



function send_remainder_leaveMail() {
    var deferred = q.defer();
    var output={};
    var data={};

    dao.getRequestleaveId(data,function (err, employeeData) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (employeeData == null || employeeData.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                forEach(employeeData,function (employee,employeeKey) {
                    var reminderData ={
                        'employee_id':employee.employee_id
                    }
                    dao.getReportingEmployees(reminderData,function (err, res) {
                         if (err){
                            deferred.reject(new errors.ServerError("Server error occured"));
                        } else {
                            if (res == null || res.length === 0) {
                                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                            } else {
                                forEach(res,function (employeedata) {
                                     var mailData = "You have got Leaves to be Approved ";
                                    Mail.sendMail([employeedata.employee_email],'Leave Remainder','Hello',mailData);
                                    deferred.resolve(output);
                                });
                            }
                        }
                    });
                });
              }
            }
    });
    return deferred.promise;
}

function send_remainder_permissionMail() {
    var deferred = q.defer();
    var output={};
    var data={};

    dao.getRequestpermissionId(data,function (err, employeeData) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (employeeData == null || employeeData.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                forEach(employeeData,function (employee,employeeKey) {
                    var reminderData ={
                        'employee_id':employee.employee_id
                    }
                    dao.getReportingEmployees(reminderData,function (err, res) {
                        if (err){
                            deferred.reject(new errors.ServerError("Server error occured"));
                        } else {
                            if (res == null || res.length === 0) {
                                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                            } else {
                                forEach(res,function (employeedata) {
                                    var mailData = "You have got Permission to be Approved ";
                                    Mail.sendMail([employeedata.employee_email],'Permission Remainder','Hello',mailData);
                                    deferred.resolve(output);
                                });
                            }
                        }
                    });
                });
            }
        }
    });
    return deferred.promise;
}


function send_remainder_compoffMail() {
    var deferred = q.defer();
    var output={};
    var data={};

    dao.getRequestcompoffId(data,function (err, employeeData) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (employeeData == null || employeeData.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                forEach(employeeData,function (employee,employeeKey) {
                    var reminderData ={
                        'employee_id':employee.employee_id
                    }
                    dao.getReportingEmployees(reminderData,function (err, res) {
                        if (err){
                            deferred.reject(new errors.ServerError("Server error occured"));
                        } else {
                            if (res == null || res.length === 0) {
                                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                            } else {
                                forEach(res,function (employeedata) {
                                    var mailData = "You have got Compoff to be Approved ";
                                    Mail.sendMail([employeedata.employee_email],'Compoff Remainder','Hello',mailData);
                                    deferred.resolve(output);
                                });
                            }
                        }
                    });
                });
            }
        }
    });
    return deferred.promise;
}