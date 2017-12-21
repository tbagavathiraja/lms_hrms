const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const baseDir = process.cwd();
const errors = require('./handler/error_handler');
const response = require('./handler/response_handler');
const app_config = require('./config/app_config');
const cronejobs=require('./cron');
var moment = require('moment-timezone');
var morgan = require('morgan');
var rfs = require('rotating-file-stream');
var cors=require('cors')
var logDirectory = path.join(__dirname, 'log')

var authMiddleware=require('./utilities/utilitymethods')

console.log(logDirectory);
// create a rotating write stream
var accessLogStream = rfs('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
  });
app.use(morgan('combined', {stream: accessLogStream}))
app.use(cors())
app.use(function(req,res,next){

  var auth_token=req.header("auth_token")
  console.log("AUTH IS : "+auth_token)
  next();
})


moment.tz.setDefault("Asia/Kolkata");
// const helmet = require('helmet');
app.use(logger('dev'));
app.use(bodyParser.json());
/*app.use(helmet());*/

app.all('/*', function (req, res, next) {
// CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    /**
     * adds a function to the HTTP `response` object, uses the API service to send the proper response
     * @param data {*} data to send back to client
     * @returns {*}
     */
    res.$sendSuccess = function (data) {
        res.set('Content-Type', 'application/json');
        return response.sendSuccessResponse(res, data);
    }

    res.$sendFailure= function (data) {
        if (data && data instanceof errors.BadRequestError) {
            return response.sendBadRequest(res, data.message || data);
        } else if (data && data instanceof errors.PermissionDeniedError) {
            return response.sendUnauthorizedRequest(res, data.message || data);
        } else if (data && data instanceof errors.ResourceLockedError) {
            return response.sendResourceLocked(res, data.message || data);
        } else if (data && data instanceof errors.ForbiddenError) {
            return response.sendForbiddenResponse(res, data.message || data);
        } else if (data && data instanceof errors.ResourceNotFoundError) {
            return response.sendResourceNotFound(res, data.message || data);
        } else if (data && data instanceof errors.ResourceNotModifiedError) {
            return response.sendResourceNotModified(res, data.message || data);
        } else if (data && data instanceof errors.ServerError ||
                    data && data instanceof Error) {
            return response.sendErrorResponse(res, data.message || data);
        }
    };

    next();
});
app.use('/', require('./handler/route_handler'));
// If no route is matched by now, it must be a 404

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    if (err.status == 404) {
        res.status(err.status). send(err.stack)
    } else {
        res.status( 500).send(err.stack);
    }
});
// Start the server
app.set('port', app_config.port);
const server = app.listen(4000, function () {
    cronejobs.Expiry();
    console.log('Express server listening on port ' + server.address().port);
});
