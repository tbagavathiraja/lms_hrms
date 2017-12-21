const commonConstant = require("../utilities/constants/common_constant");
const responseConstant = require("../utilities/constants/response_constant");
const apiResponseConstant = require("../utilities/constants/api_response_constant");
const errorHandler = require("../utilities/error/error_messages");



/**
 * sets headers on request to allow all request methods and cross-domain requests
 * @param req {Object} request object
 * @param res {Object} response object
 * @param next {Function} next function in chain
 */
exports.allowCrossDomain = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

/**
 * used to handle server errors
 * @param err {*} error
 * @param req {Object} request object
 * @param res {Object} response object
 * @param next {Function} next function in chain
 */
exports.handleError = function(err, req, res, next) {
  res.status(err.status || responseConstant.HTTP_INTERNAL_SERVER_ERROR).end(err.message || 'Uh-oh. Something went wrong.');
};

/**
 * sends a "Bad Request" header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendBadRequest = function(res, err) {
  res.status(responseConstant.HTTP_BAD_REQUEST).end(err ? err.toString() : null);
};

/**
 * sends a "Resource Not Found" header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendUnauthorizedRequest = function(res, err) {
  res.status(responseConstant.HTTP_UNAUTHORIZED).end(err ? err.toString() : null);
};

/**
 * sends a "Resource Not Found" header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendResourceNotFound = function(res, err) {
  res.status(responseConstant.HTTP_NOT_FOUND).end(err ? err.toString() : null);
};

/**
 * sends a "Resource Not Found" header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendResourceLocked = function(res, err) {
  res.status(responseConstant.HTTP_RESOURCE_LOCKED).end(err ? err.toString() : null);
};

/**
 * sends a "Resource or action forbidden" header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendForbiddenResponse = function(res, err) {
  res.status(responseConstant.HTTP_FORBIDDEN).end(err ? err.toString() : null);
};

/**
 * sends a "Resource not modified" header to user
 * @param res {Object} response obj
 * @param data {Object} data to send
 */
exports.sendResourceNotModified = function(res, data) {
  res.status(responseConstant.HTTP_NOT_MODIFIED).end();
};


exports.sendServerErrorResponse = function(res, err) {
    res.status(err.statusCode|| responseConstant.HTTP_INTERNAL_SERVER_ERROR).end(err ? err.toString() : null);
}

/**
 * sends a error header to user
 * @param res {Object} response obj
 * @param err {Object} optional error message
 */
exports.sendErrorResponse = function(res, err) {
    res.set('Content-Type', 'application/json');

    if(err===undefined || typeof err==="string"){
        err = apiResponseConstant.UNKNOWN_ERROR_OCCURRED;
    }

    var response = {
        code:err,
        status:commonConstant.RESPONSE_TYPE_FAILURE,
        message: errorHandler.errorMessage[err]
    }

    return res.status(errorHandler.errorCodeMapping[err]).send(response);

};

/**
 * sends a successful response back to the client with an optional payload
 * @param res {Object} response obj
 */
exports.sendSuccessResponse = function(res, payload) {
  /*if (payload === undefined) {
   return res.status(204).end();
   } else if (typeof payload === 'number') {
   return res.status(200).end(payload.toString());
   } else if (typeof payload === 'boolean') {
   return res.status(200).end();
   } else if (typeof payload === 'object') {
   return res.status(200).json(payload);
   } else {
   return res.status(200).end(payload);
   }*/
    //res.set('Content-Type', 'application/json');

if (payload === undefined || payload === "")  {
        payload = {};
    }else{
         if(payload.code!== undefined && payload.code!==apiResponseConstant.SUCCESS){
            return res.status(responseConstant.HTTP_OK).send(payload);
         }
     }
    var  response = {
        code:apiResponseConstant.SUCCESS,
        status:commonConstant.RESPONSE_TYPE_SUCCESS,
        message: commonConstant.RESPONSE_TYPE_SUCCESS,
        data:payload
    }
    return res.status(responseConstant.HTTP_OK).send(response);
};

