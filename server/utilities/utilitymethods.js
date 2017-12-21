const commonConstant = require("../utilities/constants/common_constant");
const errorHandler = require("../utilities/error/error_messages");
const moment = require("moment/moment");
const moment_tz = require("moment-timezone");
const crypto = require("crypto");

function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}


function build_response(api_response_code){
    var response = {
        code:api_response_code,
        status:commonConstant.RESPONSE_TYPE_FAILURE,
        message: errorHandler.errorMessage[api_response_code]
    };
    return response;
}

function format_date(date,date_format){
    return moment_tz(date,['DD-MM-YYYY','MM-DD-YYYY','YYYY-MM-DD']).format(date_format);
}

function format_datetime(date,date_format){
    return moment_tz(date,['DD-MM-YYYY HH:mm:ss','MM-DD-YYYY HH:mm:ss','YYYY-MM-DD HH:mm:ss']).format(date_format);
}

function current_date(){
    return moment_tz(new Date()).format('YYYY-MM-DD');
}

function current_datetime(){
    return moment_tz(new Date()).format('YYYY-MM-DD HH:mm:ss');
}

function current_formated_datetime(){
    return moment_tz.tz('Asia/Calcutta').format('YYYY-MM-DD HH:mm:ss');
}

function array_diff(a1,a2){
        var a = [], diff = [];

        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }

        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            }
        }

        for (var k in a) {
            diff.push(k);
        }

        return diff;
}

function jsUcfirst(string)
{
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function currentTimestamp(){
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function build_response(api_response_code){
    var response = {
        code:api_response_code,
        status:commonConstant.RESPONSE_TYPE_FAILURE,
        message: errorHandler.errorMessage[api_response_code]
    };
    return response;
}

function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest("hex")
}

function current_datetime1 () {
  return moment_tz(new Date()).format('YYYY-MM-DD HH:mm:ss');
}
function add_minute_current_datetime(minute) {
  var currentDate = new Date();
  var updatedDate = new Date(currentDate.getTime() + (minute * 60 * 1000));
  return moment_tz(updatedDate).format('YYYY-MM-DD HH:mm:ss');
}
function format_datetime(date, date_format) {
  return moment_tz(date, ['DD-MM-YYYY HH:mm:ss', 'MM-DD-YYYY HH:mm:ss', 'YYYY-MM-DD HH:mm:ss']).format(date_format);
}

function authMiddleware(req,res,next){


}

module.exports =  {
    build_response,
    format_date,
    format_datetime,
    current_date,
    current_datetime,
    current_formated_datetime,
    array_diff,
    jsUcfirst,
    toTitleCase,
    currentTimestamp,
    build_response,
    hashPassword,
    current_datetime1,
    add_minute_current_datetime,
    format_datetime,
  authMiddleware
};
