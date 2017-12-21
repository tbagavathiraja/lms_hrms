var q = require('q')
var dao = require('../dao/reset_password_dao')
var errors = require('../handler/error_handler')
var api_response_constant = require('../utilities/constants/api_response_constant')
var app_config=require('../config/app_config')

var functions = {
  resetPassword: function (req, res, next) {
    authenticate(req).then(function (res) {

      console.log(res)

      }
    )
      .catch(function (err) {
        console.log(err)

      })

  }

}

module.exports = functions

function authenticate (req) {

  var user = req.body
  var defered = q.defer()
   console.log("mail id iss : "+user.employee_email);

  dao.checkUser(user.employee_email, function (err, result) {
    if (err) {
      defered.reject(new errors.ServerError('Server error pccured'))
    }
    else {
      if (result == null || result.length == 0) {
        defered.reject(new errors.PermissionDeniedError(api_response_constant.UNAUTHORIZED_ACCESS))
      }
      else {
        defered.resolve(result)
      }
    }
  })
  return defered.promise
}
