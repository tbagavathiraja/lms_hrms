var q = require('q');
var dao = require('../dao/login_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');

var functions = {

  authenticate: function (req, res,next) {
    authenticate(req)
      .then(function (result) {
        console.log(result);

        res.$sendSuccess(result);
      })
      .catch(function(err){
        console.log(err.message)
        res.$sendFailure(err);
      })
  },
  getLoginType: function (req, res) {
    getLoginType(req).then(function (result) {
      res.$sendSuccess(result);
    }).catch(function(err){
      res.$sendFailure(err);
    })
  },
  googleAuthenticate: function (req, res,next) {
    googleAuthenticate(req)
      .then(function (result) {
        res.$sendSuccess(result);
      })
      .catch(function(err){

        res.$sendFailure(err);
      })
  },
};
module.exports = functions;

function authenticate(req) {

  var deferred = q.defer();
  var output = {};
  var data = req.body;
  var token,userObject, lastLoginDateTime, addSessionDetails;


  dao.authenticate(data, function (err, res) {
    if (err) {
      deferred.reject(new errors.ServerError("Server error occured"));
    } else {
      if (res == null || res.length === 0) {
        deferred.reject(new errors.PermissionDeniedError(api_response_constant.UNAUTHORIZED_ACCESS));
      } else {
        console.log("responsesssssssssss", res)
        var token = setResponse.hashPassword(res.employee_id + setResponse.current_datetime1());
        res[0].token = token;
        addSessionDetails = {
          session_auth_token: token,
          expiry_time: setResponse.add_minute_current_datetime(5),
          employee_id: res[0].employee_id
        };
        console.log("RRRRRRRRRRRR", res)

        var data1 = addSessionDetails
        dao.addSession(data1, function (error, response) {
          if (error) {
            deferred.reject(new errors.ServerError("Server error occured"));
          } else {
            if (response == null || response.length === 0) {

              deferred.resolve(setResponse.build_response(api_response_constant.UNAUTHORIZED_ACCESS));
            } else {
              console.log("hii", token)
            }
          }
        })
      }
      if (res != "") {
        if (res[0].employee_role === null) {
          res[0].employee_role = 'EMPLOYEE';
          res[0].url = 'summary'
        } else if (res[0].employee_role === 'EMPLOYEE') {
          res[0].url = 'summary'
        }
        else if (res[0].employee_role === 'ADMIN') {
          console.log(token)
          res[0].url = 'dashboard'
        }
        else {
          res[0].url = 'summary'
        }
      }
    }
    deferred.resolve(res);
  })
  return deferred.promise;
}

function googleAuthenticate(req) {

  var deferred = q.defer();
  var output={};
  var data=req.body;
  dao.googleAuthenticate(data,function (err, res) {
    if (err) {
      deferred.reject(new errors.ServerError("Server error occured"));
    } else {
      if (res == null || res.length ===0 ) {
        output = {code:1010,status:'failure',message:'Unauthorised access'};
        deferred.resolve(output);
      } else {
        if(res[0].employee_role === null){
          res[0].employee_role='EMPLOYEE';
          res[0].url='summary'
        }else if(res[0].employee_role === 'EMPLOYEE'){
          res[0].url='summary'
        }
        else{
          res[0].url='dashboard'
        }
        /*deferred.resolve(setResponse.build_response(api_response_constant.UNKNOWN_ERROR_OCCURRED));*/
        deferred.resolve(res);
      }
    }
  });
  return deferred.promise;
}


function getLoginType(req) {

  var deferred = q.defer();
  var output={};
  var data=req.body;
  if (!data.tenant || data.tenant ===''){
    data.tenant="ionixx"
  }
  data.status=1;
  console.log("1",data)
  dao.getLoginType(data,function (err, res) {
    if (err) {
      deferred.reject(new errors.ServerError("Server error occured"));
    } else {
      if (res == null || res.length ===0 ) {
        output = {code:1010,status:'failure',message:"Tenant doesn't exist."};
        deferred.resolve(output);
        console.log("4",output)
      } else {
        //output = {code:0000,status:'success',data:res};
        console.log("5",res)
        deferred.resolve(res);
      }
    }
  });
  return deferred.promise;
}
