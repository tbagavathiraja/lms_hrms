var q = require('q');
var dao = require('../dao/holiday_dao');
var errors = require('../handler/error_handler');
var api_response_constant = require('../utilities/constants/api_response_constant');
var setResponse = require('../utilities/utilitymethods');
var forEach = require('async-foreach').forEach;


var functions ={
    addHoliday: function(req,res,next){
        addHoliday(req)
            .then(function(result){
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })

    },
    getholiday: function(req,res,next){
        getholiday(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },
    getHolidayDetails: function(req,res,next){
    	getHolidayDetails(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },
    updateHoliday: function(req,res,next){
    	updateHoliday(req)
            .then(function(result){
                console.log(result);
                res.$sendSuccess(result);
            }).catch(function(err){
            res.$sendFailure(err);
        })
    },

    deleteholiday: function (req, res,next) {
        deleteholiday(req)
            .then(function (result) {
                res.$sendSuccess(result);
            })
            .catch(function(err){
                res.$sendFailure(err);
            })
    },
}
module.exports = functions;

function addHoliday(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    console.log(data);
    dao.addHoliday(data,function (err, res) {
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

function  getholiday(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data)

    if(data.employee_id == null) {
      dao.getholiday(data, function (err, res) {
        console.log("1",data)
        if (err) {
          deferred.reject(new errors.ServerError("Server error occured"));
        } else {
          if (res == null || res.length === 0) {
            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            var output = {code: 1056, status: 'failure', message: 'No records found'};
            deferred.resolve(output);
          } else {
            deferred.resolve(res);
          }
        }
      });
    }
    else{
      dao.get_emplist(data, function (err, res) {
        console.log("2",data)
        if (err) {
          deferred.reject(new errors.ServerError("Server error occured"));
        } else {
          if (res == null || res.length === 0) {
            deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
            var output = {code: 1056, status: 'failure', message: 'No location,Department Details found'};
            deferred.resolve(output);
          } else {
              console.log("result",res[0]);
               dao.get_locationId(res[0],function (error, response) {
               if (error) {
                 deferred.reject(new errors.ServerError("Server error occured"));
               } else {
                 if (response == null || response.length ===0 ) {
                   deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                   var output= { code: 1056, status: 'failure', message: 'No location found' };
                   deferred.resolve(output);
                } else  {
                   console.log("response",response[0])
                  /* dao. get_departmentId(res[0],function (error1, response1) {
                     if (err) {
                       deferred.reject(new errors.ServerError("Server error occured"));
                     } else {
                       if (res == null || res.length ===0 ) {
                         deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                         var output= { code: 1056, status: 'failure', message: 'No records found' };
                         deferred.resolve(output);

                       } /!*else {
                         console.log("location",response[0])
                         console.log("department",response1[0])

                         var data1={
                               "location_id":response[0].location,
                               "department_id":response1[0].department_id,
                               "search":data.search
                         }
                         console.log(data1);
                   /!*      dao.get_holiday(data1,function (err1, res1) {
                           if (err) {
                             deferred.reject(new errors.ServerError("Server error occured"));
                           } else {
                             if (res == null || res.length ===0 ) {
                               deferred.resolve(setResponse.build_response(api_response_constant.NO_RECORDS_FOUND));
                               var output= { code: 1056, status: 'failure', message: 'No records found' };
                               deferred.resolve(output);

                             } else {

                               deferred.resolve(res1);
                             }
                           }
                         });*!/

                       }*!/
                     }
                   });
*/

                 }
              }
            });
          }
        }
      });
    }
    return deferred.promise;
}

function  getHolidayDetails(req){

    var deferred = q.defer();
    var output={};
    var data=req.query;
    data.holiday_id = req.params['holiday_id'];
    dao. getHolidayDetails(data,function (err, res) {
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

function  updateHoliday(req){

    var deferred = q.defer();
    var output={};
    var data=req.body;
    data.holiday_id = req.params['holiday_id'];
    console.log(data);
    dao. updateHoliday(data,function (err, res) {
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

function deleteholiday(req) {
    var deferred = q.defer();
    var output={};
    var data=req.query;
    console.log(data);
    dao.deleteholiday(data,function (err, res) {
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
