var q = require('q');
var dao = require('../dao/permission_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var permissionMail = require('../utilities/mail/permissionmail');
var acceptMail = require('../utilities/mail');
var rejectMail = require('../utilities/mail');
var forEach = require('async-foreach').forEach;

var functions = {
    insertPermission: function(req,res,next){
        insertPermission(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },
    getpermission: function(req,res,next){
        getpermission(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },


  get_permission_holidays: function(req,res,next){
    var data = {};
    get_permission_holidays(req)
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

    deletePermission: function (req, res,next) {
        deletePermission(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
    totalpermission: function (req, res,next) {
        totalpermission(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    getPermissionDetails: function (req, res,next) {
        getPermissionDetails(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    updatepermission: function (req, res,next) {
        updatepermission(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },

    getemPermission: function(req,res,next){
        getempermission(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    acceptPermission: function(req,res,next){
        acceptPermission(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    rejectPermission: function(req,res,next){
        rejectPermission(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },




}

module.exports = functions;

function insertPermission(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("sdada",data);

    dao.insertPermission(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        }else{
            data1=data.employee_id;
            dao.getmail(data1,function (error,response) {
                if (error) {
                    deferred.reject(new errors.ServerError("Server error occured"));
                } else{
                    if (response == null || response.length ===0 ){
                        deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                    }else{
                        forEach(response,function(value){
                             var mailData =data.employee_name+" has Applied Permission On "+ data.date.formatted;
                          permissionMail.permissionMail([value.employee_email], 'LMS-Permission Apply', 'Hello', mailData);
                            deferred.resolve(response);
                        });
                    }
                }
            });
        }
    });
    return deferred.promise;
}

function  getpermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao. getpermission(data,function (err, res) {
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

function  get_permission_holidays(req){

  var deferred = q.defer();
  var output={};
  var data=req.query;
  console.log(data);

  dao.get_permission_holidays(data,function (err, res) {
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
  dao.get_initial_permission(data,function(err,res){
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
  dao.get_granted_permission(data,function(err,res){
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

function deletePermission(req) {
    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.deletePermission(data,function (err, res) {
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

function  totalpermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao.totalpermission(data,function (err, res) {
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

function  getPermissionDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao.getPermissionDetails(data,function (err, res) {
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

function  updatepermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.updatepermission(data,function (err, res) {
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

function  getempermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;

    dao.getempermission(data,function (err, res) {
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

function  acceptPermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("requihdf");

    dao.acceptpermission(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
            deferred.resolve(res);
            console.log(data.employee_email)
            console.log(data.date)

            var mailData ="Your Permission On\t" + data.date +"\t" + "Was Approved.";
            acceptMail.sendMail([data.employee_email], 'LMS-Permission Apply', 'Hello', mailData);
          }
        }
    });
    return deferred.promise;

}

function  rejectPermission(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log("requihdf",data);

    dao.rejectpermission(data,function (err, res) {
        if (err) {
            deferred.reject(new errors.ServerError("Server error occured"));
        } else {
            if (res == null || res.length ===0 ) {
                deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            } else {
              deferred.resolve(res);
              console.log(data.employee_email)
              console.log(data.date)

              var mailData ="Your Permission On\t" + data.date +"\t" + "Was Rejected.";
              rejectMail.sendMail([data.employee_email], 'LMS-Permission Apply', 'Hello', mailData);
            }
        }
    });
    return deferred.promise;

}

