var express = require('express');
var router = express.Router();
var loginFunctions = require('../facade/login_facade');
var assessmentFunctions = require('../facade/assessment_facade');
var requestFunctions = require('../facade/request_facade');
var employeeFunctions = require('../facade/employee_facade');
var allrequestFunctions = require('../facade/all_request_facade');
var assessment_parameter_functions = require('../facade/assessment_parameter_facade');
var projectFunctions = require('../facade/project_facade');
var reminderFunctions = require('../facade/reminder_facade');
var periodfacade = require('../facade/period_facade');
var leavefacade = require('../facade/leave_facade');
var permissionfacade = require('../facade/permission_facade');
var compoffacade=require('../facade/compoff_facade');
var holidayfacade = require('../facade/holiday_facade');
var locationfacade = require('../facade/location_facade');
var departmentfacade = require('../facade/department_facade');
var calendarFunctions =require('../facade/calendar_facade');
var resetPasswordFunction=require("../facade/reset_password_facade")

/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.post('/login-type', loginFunctions.getLoginType);
router.post('/authenticate', loginFunctions.authenticate);
router.post('/google_authenticate', loginFunctions.googleAuthenticate);
router.post('/get_self_summary', assessmentFunctions.getSelfSummary);
router.post('/get_employees_summary', assessmentFunctions.getEmployeeSummary);
router.get('/get_assessment', assessmentFunctions.getAssessment);
router.get('/get_assessment_list', assessmentFunctions.getAssessmentList);
router.post('/add_assessment', assessmentFunctions.addAssessment);
router.get('/get_assessment_period', assessmentFunctions.get_assessment_period);
router.get('/get_assessment_employee', assessmentFunctions.get_assessment_employee);
router.post('/delete_assessment', assessmentFunctions.deleteAssessment);
router.post('/get_request_summary', requestFunctions.getRequestSummary);
router.post('/get_employee_list', requestFunctions.getEmployeeList);
router.post('/insert_request', requestFunctions.insertRequest);
router.post('/reset-password',resetPasswordFunction.resetPassword);

router.put('/update_request/:resource_request_id', requestFunctions.updateRequest);
router.put('/save_assessment', assessmentFunctions.saveAssessment);
router.put('/submit_assessment', assessmentFunctions.submitAssessment);
router.get('/get_all_request_summary', allrequestFunctions.getAll);
router.get('/get_assessment_parameter', assessment_parameter_functions.getAll);
router.get('/get_assessment_parameter/:parameter_id', assessment_parameter_functions.getDetail);
router.post('/assessment_parameter', assessment_parameter_functions.insert_parameter);
router.put('/assessment_parameter/:parameter_id', assessment_parameter_functions.update_parameter);
router.post('/delete_parameter', assessment_parameter_functions.delete_parameter);
router.post('/google_authenticate', loginFunctions.googleAuthenticate);
router.get('/get_employees', employeeFunctions.getEmployeeSummary);
router.get('/get_myProfile', employeeFunctions.getProfileSummary);
router.get('/getemployeehistory',employeeFunctions.getemployeeshistory);
router.post('/delete_employee', employeeFunctions.deleteEmployee);
router.post('/employee', employeeFunctions.insert_employee);
router.put('/employee/:employee_id', employeeFunctions.update_employee);
router.put('/updateMyprofile', employeeFunctions.update_myProfile);
router.get('/employee/:employee_id', employeeFunctions.get_employee);
router.post('/get_project_summary', projectFunctions.getProjectSummary);
router.post('/get_all_project_summary', projectFunctions.getAllProjectSummary);
router.post('/get_my_project_summary', projectFunctions.getMyProjectSummary);
router.post('/get_reminder_summary', reminderFunctions.getReminderSummary);
router.post('/release_resource/:resource_request_employee_id', reminderFunctions.releaseResource);
router.get('/get_request_details/:resource_request_id', allrequestFunctions.getRequestDetails);
router.put('/approve_request/:resource_request_id',allrequestFunctions.approveRequest);
router.put('/modify_request/:resource_request_id',allrequestFunctions.modifyRequest);
router.get('/get_request_summary/:resource_request_id', allrequestFunctions.getRequestSummary);
router.get('/get_period',periodfacade.periodSummary);
router.post('/period/add',periodfacade.addPeriod);
router.post('/period/save',periodfacade.updatePeriod);
router.delete('/period/delete',periodfacade.deletePeriod);
router.delete('/request/delete',allrequestFunctions.deleteResourceRequest);
router.get('/assessment/get_employees',assessmentFunctions.getAllEmployees);
router.post('/assessment/get_reporting_managers',assessmentFunctions.getReportingManagers);
router.post('/assessment/save_reporting_managers',assessmentFunctions.saveReportingManagers);
router.post('/assessment/reset_managers',assessmentFunctions.resetManagers);
router.get('/roles',employeeFunctions.getRoles);
router.get('/send_mail',reminderFunctions.sendMail);

/*
 * the below url is for LMS screens
 */


//Leave related screens
router.post('/applyleave',leavefacade.insertLeave);
router.get('/getleave',leavefacade.getleave);
router.get('/get_leave_holiday',leavefacade.get_leave_holiday);
router.post('/delete_leave',leavefacade.deleteleave);
router.get('/totalleave',leavefacade.totalleave);
router.get('/getEditDetails',leavefacade.getEditleave);
router.post('/updateleave',leavefacade.updateleave);

router.get('/getempleave',leavefacade.getempLeave);
router.put('/accept_leave',leavefacade.acceptLeave);
router.get('/leave_type',leavefacade.leaveType);
router.put('/reject_leave',leavefacade.rejectLeave);

//Permission related screens
router.post('/applyPermission',permissionfacade.insertPermission);
router.get('/getpermission',permissionfacade.getpermission);
router.get('/get_permission_holidays',permissionfacade.get_permission_holidays);
router.post('/delete_permission',permissionfacade.deletePermission);
router.get('/totalpermission',permissionfacade.totalpermission);
router.get('/getPermissionDetails',permissionfacade.getPermissionDetails);
router.post('/updatepermission',permissionfacade.updatepermission);

router.get('/getempermission',permissionfacade.getemPermission);
router.put('/accept_permission',permissionfacade.acceptPermission);
router.put('/reject_permission',permissionfacade.rejectPermission);


//Compoff related screens
router.post('/applycompoff',compoffacade.insertCompoff);
router.get('/getcompoff',compoffacade.getcompoff);
router.get('/get_compoff_holidays',compoffacade.get_compoff_holidays);
router.post('/delete_compoff',compoffacade.deleteCompoff);
router.get('/totalCompoff',compoffacade.totalCompoff);
router.get('/getCompoffDetails',compoffacade.getCompoffDetails);
router.post('/updatecompoff',compoffacade.updatecompoff);

router.get('/getempcompoff',compoffacade.getempCompoff);
router.put('/accept_compoff',compoffacade.acceptCompoff);
router.put('/reject_compoff',compoffacade.rejectCompoff);


//holiday related screens
router.get('/getholiday',holidayfacade.getholiday);
router.get('/getHolidayDetails/:holiday_id',holidayfacade.getHolidayDetails);
router.post('/holiday',holidayfacade.addHoliday);
router.put('/holiday/:holiday_id',holidayfacade.updateHoliday);
router.delete('/holiday',holidayfacade.deleteholiday);

//location related screens
router.get('/getLocation',locationfacade.getLocation);
router.delete('/deleteLocation/:location_id',locationfacade.deleteLocation);
router.post('/location',locationfacade.addLocation);
router.get('/getLocationDetails/:location_id',locationfacade.getLocationDetails);
router.put('/updateLocation/:location_id',locationfacade.updateLocation);

//department related screens
router.get('/getDepartment',departmentfacade.getAlldepartment);
router.delete('/deleteDepartment/:department_id',departmentfacade.deleteDepartment);
router.post('/department',departmentfacade.addDepartment);
router.get('/getDepartmentDetails/:department_id',departmentfacade.getDepartmentDetails);
router.put('/department/:department_id',departmentfacade.updateDepartment);

//calendar settings related screens
router.get('/get_calendar_branch',calendarFunctions.getcalendarbranch);
router.post('/calendar',calendarFunctions.insertDays);
router.get('/calendarDetails',calendarFunctions.calendarDetails);
router.get('/send_remainder_leaveMail',reminderFunctions.send_remainder_leaveMail);
router.get('/send_remainder_permissionMail',reminderFunctions.send_remainder_permissionMail);
router.get('/send_remainder_compoffMail',reminderFunctions.send_remainder_compoffMail);


module.exports = router;
