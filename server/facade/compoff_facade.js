var q = require('q');
var dao = require('../dao/compoff_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var compoffMail = require('../utilities/mail/compoffmail');
var acceptMail = require('../utilities/mail');
var rejectMail = require('../utilities/mail');
var forEach = require('async-foreach').forEach;


var functions = {

    insertCompoff: function(req,res,next){
        insertCompoff(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },
    getcompoff: function(req,res,next){
        getcompoff(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

  get_compoff_holidays: function(req,res,next){
    var data = {};
    get_compoff_holidays(req)
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

    deleteCompoff: function (req, res,next) {
        deleteCompoff(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    totalCompoff: function (req, res,next) {
        totalCompoff(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    getCompoffDetails: function (req, res,next) {
        getCompoffDetails(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    updatecompoff: function (req, res,next) {
        updatecompoff(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    getempCompoff: function(req,res,next){
        getempCompoff(req)
            .then(function(result){
                 res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    acceptCompoff: function(req,res,next){
        acceptCompoff(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    rejectCompoff: function(req,res,next){
        rejectCompoff(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    }

}
module.exports = functions;


function insertCompoff(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("sdfew",data);
    dao.insertCompoff(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }else{
            data1=data.employee_id;
            dao.getmail(data1,function (error, response) {
                if (err) {
                    deferred.reject(new errors.ServerError("Server error occured"));
                } else{
                    if (response == null || response.length ===0 ){
                        deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                    }else{
                        forEach(response,function(value){
                            var mailData =data.employee_name+" has Applied  Compoff. ";
                          compoffMail.compoffmail([value.employee_email], 'LMS-CompOff Apply', 'Hello', mailData);
                            deferred.resolve(response);
                        });
                    }
                }
            });
        }
    });
    return deferred.promise;
}

function  getcompoff(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao. getcompoff(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                var output= { code: 1056, status: 'failure', message: 'No records found' };
                deferred.resolve(output);

            } else {
                deferred.resolve(res);
            }
        }
    });
    return deferred.promise;

}



function  get_compoff_holidays(req){

  var deferred = q.defer();
  var output={};
  var data=req.query;
  console.log(data);

  dao.get_compoff_holidays(data,function (err, res) {
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
  dao.get_initial_compoff(data,function(err,res){
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
  dao.get_granted_compoff(data,function(err,res){
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

function deleteCompoff(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.deleteCompoff(data,function (err, res) {
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

function totalCompoff(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao.totalCompoff(data,function (err, res) {
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

function  getCompoffDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao.getCompoffDetails(data,function (err, res) {
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

function  updatecompoff(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.updatecompoff(data,function (err, res) {
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

function  getempCompoff(req){

     var deferred = q.defer();
     var output={};
     var data=req.query;
     console.log(data);

     dao.getempcompoff(data,function (err, res) {
        if (res == null || res.length === 0) {
            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            var output = {code: 1056, status: 'failure', message: 'No records found'};
            deferred.resolve(output);
        } else {
            deferred.resolve(res);
        }
      });
     return deferred.promise;
  }

function  acceptCompoff(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("requihdf");

    dao.acceptcompoff(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
              console.log(data.employee_email)
              var mailData ="Your Compoff\t" + "Was Approved.";
              acceptMail.sendMail([data.employee_email], 'LMS-Compoff Apply', 'Hello', mailData);

            }
        }
    });
    return deferred.promise;

}

function  rejectCompoff(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("requihdf");

    dao.rejectcompoff(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
                deferred.resolve(res);
              console.log(data.employee_email)
              var mailData ="Your Compoff \t"+ "Was Rejected.";
              rejectMail.sendMail([data.employee_email], 'LMS-Compoff Apply', 'Hello', mailData);
            }
        }
    });
    return deferred.promise;

}
