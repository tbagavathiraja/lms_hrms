var q = require('q');
var dao = require('../dao/leave_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var leaveMail = require('../utilities/mail/leaveMail');
var acceptMail = require('../utilities/mail');
var rejectMail = require('../utilities/mail');
var forEach = require('async-foreach').forEach;


var functions ={
    insertLeave: function(req,res,next){
        insertLeave(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },

    getleave: function(req,res,next){
        getleave(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

  get_leave_holiday: function(req,res,next){
      var data = {};
    get_leave_holiday(req)
            .then(function(result){
              data.holiday = result;
              return getInitial(req);
            })
            .then(function(result){
             data.initial = result;
            return getGranted(req);
            })
          .then(function (response) {
            data.granted = response;
            res.$sendSuccess(data);
          })
          .catch(function(err){
            res.$sendFailure(err);
        })
    },

    deleteleave: function (req, res,next) {
        deleteleave(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    totalleave: function (req, res,next) {
        totalleave(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    getEditleave: function(req,res,next){
        getEditleave(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    updateleave: function(req,res,next){
    	updateleave(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },

    getempLeave: function(req,res,next){
        getempLeave(req)
            .then(function(result){
                 res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    acceptLeave: function(req,res,next){
        acceptLeave(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

  leaveType: function(req,res,next){
    leaveType(req)
      .then(function(result){
        res.$sendSuccess(result);
      }).catch(function(err){
      res.$sendFailure(err);
    })
  },

    rejectLeave: function(req,res,next){
        rejectLeave(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

}
module.exports = functions;



function insertLeave(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;

    dao.insertLeave(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }else {
            data1=data.employee_id;
            dao.getmail(data1,function (error, response) {
                if (err) {
                    deferred.reject(new errors.ServerError("Server error occured"));
                } else{
                     if (response == null || response.length ===0 ){
                         deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                    }else{
                         forEach(response,function (value) {
                             var mailData =data.employee_name+" has Applied Leave For "+ data.number_of_days+" Days";
                           leaveMail.leaveMail([value.employee_email], 'LMS-Leave Apply', 'Hello', mailData);
                             deferred.resolve(response);
                         });
                    }
                }
            });
        }
    });
    return deferred.promise;
}


function  getleave(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;

    dao.getleave(data,function (err, res) {
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

function  get_leave_holiday(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;

    dao.get_leave_holiday(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
              deferred.resolve(res)}
        }
    });
    return deferred.promise;
}

function getInitial(req){
  var deferred = q.defer();
  var output={};
  var data=req.query;
  dao.get_initial_leave(data,function(err,res){
    if (err) {
      deferred.reject(new errors.ServerError("Server error occured"));
    }else{
      if (res == null || res.length ===0 ) {
        deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
      }else{
        deferred.resolve(res);
      }
    }

  });
  return deferred.promise;
}

function getGranted(req){
  var deferred = q.defer();
  var output={};
  var data=req.query;
  dao.get_granted_leave(data,function(err,res){
    if (err) {
      deferred.reject(new errors.ServerError("Server error occured"));
    }else{
      if (res == null || res.length ===0 ) {
        deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
      }else{
        deferred.resolve(res);
      }
    }

  });
  return deferred.promise;
}

function deleteleave(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
     dao.deleteleave(data,function (err, res) {
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




function  totalleave(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
     dao.totalleave(data,function (err, res) {
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




function  getEditleave(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
     dao.getEditleave(data,function (err, res) {
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


function updateleave(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
     dao.updateleave(data,function (err, res) {
        if (err){
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

function  getempLeave(req) {

    var deferred = q.defer();
    var output = {};
    var data = req.query;

    dao.getempleaves(data, function (err, res) {
        if (res === null || res.length === 0) {
            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            var output = {code: 1056, status: 'failure', message: 'No records found'};
            deferred.resolve(output);
        } else {
            deferred.resolve(res);
        }
    });
        return deferred.promise;
}

function  acceptLeave(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;

    dao.acceptleave(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
              deferred.resolve(res);
              console.log(data.employee_email)
              console.log(data.from_date)
              console.log(data.to_date)
              console.log(data.status)

              var mailData ="Your Leave Type\t" + data.status +"\t" + "From-\t"  +  data.from_date + "\t" +  "To-\t"  +  data.to_date +"\t" + "Was Approved.";
              acceptMail.sendMail([data.employee_email], 'LMS-Leave Apply', 'Hello', mailData);
            }
        }
    });
    return deferred.promise;

}

function  rejectLeave(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
      dao.rejectleave(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
              console.log(data.employee_mail);
              console.log(data.leave_type);
              console.log(data.from_date);
              console.log(data.to_date)
              deferred.resolve(res);
              var mailData ="Your Leave Type\t" + data.leave_type +"\t" + "From-\t"  +  data.from_date + "\t" +  "To-\t"  +  data.to_date +"\t" + "Was Rejected.";
                rejectMail.sendMail([data.employee_mail], 'LMS-Leave Apply', 'Hello', mailData);
            }
        }
    });
    return deferred.promise;

}


function leaveType(req) {
  var deferred = q.defer();
  var output={};
  var data=req.query;
  console.log(data)

  dao.leaveType(data,function (err, res) {
    if (err){
      deferred.reject(new errors.ServerError("Server error occured"));
    } else {
      console.log("hiuii",res)
      if (res == null || res.length ===0 ) {
        deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
      } else {
        deferred.resolve(res);
      }
    }
  });

  return deferred.promise;
}
