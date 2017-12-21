var db = require('../config/db_connection_config');
var crypto = require('crypto');
var roleConstant = require('../utilities/constants/role_constant');
var utilityMethods = require('../utilities/utilitymethods');

var dao = {

    getSelfSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT ea.`employee_assessment_id`,(SELECT  `employee_name` FROM `employee` WHERE `employee_id`=`ea`.`employee_id`) AS employee_name,ea.`employee_id`,ap.`start_date`,ap.`end_date`,ea.`assessment_status` FROM `employee_assessment` ea JOIN `assessment_period` ap  ON ea.`period_id`=ap.`period_id` AND ea.`tenant_id`=ap.`tenant_id` WHERE `ea`.`employee_id`=? AND `ea`.`tenant_id`= ?";
            connection.query(sql,[data.employee_id,data.tenant_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getAssessmentList: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
              return  callback (err);
            }
            var sql = "SELECT " +
            		"		ea.employee_assessment_id,ap.start_date,ap.end_date,e.employee_name,REPLACE(ea.assessment_status,'_',' ') AS assessment_status" +
            		"	FROM assessment_period AS ap" +
            		"	INNER JOIN employee_assessment AS ea ON ap.period_id = ea.period_id" +
            		"	INNER JOIN employee AS e ON e.employee_id = ea.employee_id" +
            		"	WHERE ap.is_deleted = 0 AND ap.active = 1 ";
            var data_array = [];
            if(data.search && data.search != ''){
            	sql = sql + " AND (DATE_FORMAT(ap.start_date, '%b %%d, %Y') LIKE ? OR DATE_FORMAT(ap.end_date, '%b %%d, %Y') LIKE ? OR e.employee_name LIKE ? OR REPLACE(ea.assessment_status,'_',' ') LIKE ?)"
            	data_array = ["%"+data.search+"%","%"+data.search+"%","%"+data.search+"%","%"+data.search+"%"];
            }
            sql = sql + " ORDER BY e.employee_id ASC";
            connection.query(sql,data_array,function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getEmployeeAssessmentDetails: function (connection,data,callback) {
    	var sql = "SELECT employee_assessment_details_id FROM employee_assessment_details WHERE employee_assessment_id = ?";
  	  	connection.query(sql,[data.delete_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    checkAssessment: function (connection,data,callback) {
    	var sql = "SELECT COUNT(period_id) AS period_count FROM assessment_period WHERE period_id = ?";
  	  	connection.query(sql,[data.selectedValue],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    checkEmployeeAssessment: function (connection,data,employee_id,callback) {
    	var sql = "SELECT COUNT(*) AS employee_count FROM employee_assessment WHERE period_id = ? AND employee_id = ?";
  	  	connection.query(sql,[data.selectedValue,employee_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    getParameter: function (connection,data,callback) {
    	var sql = "SELECT * FROM assessment_parameter WHERE is_deleted = 0";
  	  	connection.query(sql,[],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }else{
  			callback(false,results);
  		  }

  	  });
    },
    getKRA: function (connection,employee_id,limit,callback) {
    	var sql = "SELECT * FROM future_kra WHERE employee_id = ? LIMIT "+limit+",1";
  	  	connection.query(sql,[employee_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    insertEmployeeAssessment: function (connection,employee_id,assessment_id,callback) {
    	var sql = "INSERT INTO employee_assessment " +
    			"(employee_id,period_id,assessment_status,employee_comment,employee_development_plan,employee_improvement_area" +
    			",tenant_id,is_deleted,created_timestamp,last_updated_timestamp) VALUES(?,?,'NEED_TO_FILL','','','',1,0" +
    			",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
  	  	connection.query(sql,[employee_id,assessment_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    insertAssessment_details: function (connection,employee_assessment_id,assessment_parameter_id,parameter_weightage,callback) {
    	var sql = "INSERT INTO employee_assessment_details " +
    			"(employee_assessment_id,assessment_parameter_id,parameter_weightage,apraisee_comments,appraiser_remarks" +
    			",appraisee_rating,appraiser_rating,milestone,tenant_id,created_timestamp,last_updated_timestamp) " +
    			"VALUES(?,?,?,'','','','','',1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
  	  	connection.query(sql,[employee_assessment_id,assessment_parameter_id,parameter_weightage],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }else{
  			callback(false,results);
  		  }

  	  });
    },

    insertKRADetails: function (connection,assessment_detail_id,kra_name,callback) {
    	var sql = "INSERT INTO kra_details " +
    			"(employee_assessment_details_id,kra_name,tenant_id,created_timestamp,last_updated_timestamp) " +
    			"VALUES(?,?,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
  	  	connection.query(sql,[assessment_detail_id,kra_name],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    get_assessment_period: function (connection,data,callback) {
    	var sql = "SELECT period_id,CONCAT(start_date,' to ',end_date) AS period FROM assessment_period WHERE is_deleted = 0 AND active = 1 ORDER BY period_id DESC";
  	  	connection.query(sql,[data.delete_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    get_assessment_employee: function (connection,data,callback) {
    	var sql = "SELECT " +
    				"employee_id,employee_name " +
    			 "FROM employee " +
    			 "WHERE employee_id NOT IN(SELECT employee_id FROM employee_assessment WHERE period_id = ?) AND is_deleted = 0";
  	  	connection.query(sql,[data.assessment_id],function(err,results,fields){
  		  if(err){
  			callback(err);
  		  }
  		  callback(false,results);
  	  });
    },
    deleteKra: function (connection,data,callback) {
    	data.forEach(function(value,key){
      	  //deleting kra details
      	  var kra_sql = "DELETE FROM `kra_details` WHERE employee_assessment_details_id = ?";
      	  connection.query(kra_sql,[value.employee_assessment_details_id],function(err,results,fields){
      		  if(err){
      			callback(err,results);
      			return;
      		  }
      	  });
        });
    	callback(false);
    },
    deleteAssessmentDetails: function (connection,data,callback) {
    	var assessment_details = "DELETE FROM `employee_assessment_details` WHERE employee_assessment_id = ?";
  	    connection.query(assessment_details,[data],function(err,results,fields){
  		  if(err){
  			callback(err);
  			return;
  		  }
  		callback(false);
  	  });

    },
    deleteEmployeeAssessment: function (connection,data,callback) {
    	var assessment_details = "DELETE FROM `employee_assessment` WHERE employee_assessment_id = ?";
  	    connection.query(assessment_details,[data],function(err,results,fields){
  		  if(err){
  			callback(err);
  			return;
  		  }
  		callback(false);
  	  });
    },
    getEmployeeSummary: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT er.`reporting_employee_id`,ea.`employee_assessment_id`,(SELECT `employee_name` FROM `employee` WHERE `employee_id` = `ea`.`employee_id`) AS employee_name,ea.`employee_id`,ap.`start_date`,ap.`end_date`,ea.`assessment_status` FROM employee_reporting er JOIN (SELECT employee_assessment_id,period_id,assessment_status,tenant_id,employee_id FROM employee_assessment )ea ON ea.employee_id = er.employee_id JOIN assessment_period ap ON ap.period_id = ea.period_id WHERE `er`.`reporting_employee_id` = ?    AND `er`.`tenant_id` = ? ";
            connection.query(sql,[data.employee_id,data.tenant_id],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getEmployeeDetails: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT ea.employee_id,ea.`assessment_status`,ea.`employee_comment`,ea.`employee_development_plan`,ea.`employee_improvement_area`,employee_name ,designation,employee_number,date_of_joining,start_date,end_date,location,(SELECT GROUP_CONCAT(employee_name SEPARATOR ' , ' ) FROM employee AS ie INNER JOIN employee_reporting AS er ON ie.employee_id=er.reporting_employee_id WHERE er.employee_id = e.employee_id ) AS reporting_manager,(SELECT GROUP_CONCAT(`name` SEPARATOR ' , ' )FROM project AS p INNER JOIN employee_project AS ep ON p.project_id = ep.project_id WHERE ep.employee_id = e.employee_id ) AS projects,`employee_assessment_id` FROM employee_assessment AS ea INNER JOIN employee AS e ON e.employee_id = ea.employee_id INNER JOIN assessment_period AS ap ON ap.period_id = ea.period_id WHERE ea.employee_assessment_id = ?";
            connection.query(sql,[data['id']],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getEmployees: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT (SELECT r.`role_name` FROM roles r WHERE r.`role_id`=er.`role_id`) AS employee_role, FALSE AS checked, e.`designation`,  e.`employee_name`, e.`employee_number`, e.`employee_id`  FROM `employee` e LEFT JOIN `employee_roles` er  ON e.`employee_id` = er.`employee_id`  AND e.`tenant_id` = er.tenant_id  WHERE e.tenant_id = ?  AND e.active = ? ORDER BY e.`employee_number` ";
            connection.query(sql,[data['id'],data["status"]],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    getAssessmentDetails: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "SELECT asp.`parameter_name`,asp.apraisal_parameter_type,parameter_weightage,IF(asp.apraisal_parameter_type='KRA',(SELECT kra_name FROM kra_details WHERE employee_assessment_details_id = ead.employee_assessment_details_id),asp.parameter_name) AS assessment_parameter, ead.apraisee_comments,ead.appraiser_remarks,ead.appraisee_rating,ead.appraiser_rating,ead.milestone FROM employee_assessment AS ea INNER JOIN employee_assessment_details AS ead ON ead.employee_assessment_id = ea.employee_assessment_id INNER JOIN assessment_parameter AS asp ON asp.assessment_parameter_id = ead.assessment_parameter_id WHERE ea.employee_assessment_id = ?";

            connection.query(sql,[data['employee_assessment_id']],function(err,results,fields){
                callback(null, results);

                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    saveEmployeeDetails: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE `employee_assessment` ea SET ea.`employee_comment`= ? , ea.`employee_development_plan`= ? ,ea.`employee_improvement_area`= ?  WHERE ea.`employee_assessment_id`= ? ";
            connection.query(sql,[data.employeeDetail['employee_comment'],data.employeeDetail['employee_development_plan'],data.employeeDetail['employee_improvement_area'],data.employeeDetail['employee_assessment_id']],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    saveAssessmentDetails: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE `employee_assessment_details` SET  `apraisee_comments`= ?,`appraiser_remarks`= ?,`appraisee_rating`= ?,`appraiser_rating`= ?,`milestone`= ? WHERE `employee_assessment_id`= ? AND `assessment_parameter_id`=(SELECT `assessment_parameter_id` FROM `assessment_parameter` WHERE `parameter_name`= ? AND active = 1 AND is_deleted = 0)";
            connection.query(sql,[data["apraisee_comments"],data["appraiser_remarks"],data["appraisee_rating"],data["appraiser_rating"],data["milestone"],data["id"],data["parameter_name"]],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },
    submitAssessment: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "UPDATE `employee_assessment` SET  `assessment_status` = ? WHERE `employee_assessment_id` = ?";
            connection.query(sql,[data["assesmentStatus"],data["employee_assessment_id"]],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },


    getReportingManagers: function (connection,data, callback) {
   var sql= "SELECT e.employee_id,e.employee_name,e.employee_email,er.role_name,emprep.* " +
        "FROM employee e JOIN (SELECT employee_id,(SELECT role_name FROM roles WHERE role_id = employee_roles.role_id) AS role_name FROM employee_roles)er ON er.employee_id = e.employee_id " +
        "LEFT JOIN (SELECT  rep.reporting_employee_id FROM employee e " +
        "JOIN employee_reporting rep ON rep.employee_id =  e.employee_id " +
        "WHERE e.employee_email = ? ) emprep ON emprep.reporting_employee_id  = e.employee_id " +
        "WHERE e.employee_email <> ? AND e.is_deleted =?  AND " +
        "(CASE WHEN 'ADMIN'=? THEN er.role_name IN ('ADMIN') " +
        "WHEN 'MANAGER'=? THEN er.role_name IN ('MANAGER') " +
        "WHEN 'LEAD'=? THEN er.role_name IN('LEAD','MANAGER') " +
        "WHEN 'EMPLOYEE'=? THEN er.role_name IN('LEAD','MANAGER') " +
        "END)";
        var dataParams = [data.email,data.email,roleConstant.ACTIVE_NO,data.role_name,data.role_name,data.role_name,data.role_name];
         connection.query(sql,dataParams, function (err, results, fields) {
             callback(null, results);
            connection.release();
             if (err) {
                callback(err, results);
            }
        });
    },

    getAllEmployees: function (connection,data, callback) {
        var sql = "SELECT e.employee_id,e.employee_email,e.employee_name,e.designation, " +
            "(SELECT (SELECT role_name FROM roles WHERE role_id=er.role_id) FROM employee_roles er  WHERE er.employee_id = e.employee_id) as role_name " +
            "FROM employee e WHERE e.tenant_id =? AND e.is_deleted = ?";
        connection.query(sql, [data.tenant,roleConstant.ACTIVE_NO], function (err, results, fields) {
                console.log(sql)
                callback(null, results);
            connection.release();
            if (err) {
                console.log(results);
                callback(err, results);
            }
        });
    },

    saveReportingManagers:function (connection,data, callback) {

        var sql = "INSERT INTO employee_reporting (employee_id,reporting_type,reporting_employee_id, " +
                    " tenant_id,created_timestamp,last_updated_timestamp) " +
                    " values ";
            var dataParams = [];

            var count = data.reporting_managers.length;
            let a = 0;
            if(count>1) {
                for (; a < count-1; a++) {
                    sql = sql + "((select employee_id from employee where employee_email = ? AND is_deleted = ?), " +
                        " ?,(select employee_id from employee where employee_email = ? AND is_deleted = ?),?,?,?), ";

                    dataParams.push(data.employee['employee_email'],roleConstant.ACTIVE_NO, 'ASSESSMENT', data.reporting_managers[a],roleConstant.ACTIVE_NO, data.tenant_id,
                        utilityMethods.current_datetime(), utilityMethods.current_datetime());
                }
            }
              sql = sql + "((select employee_id from employee where employee_email = ? AND is_deleted = ?), " +
                " ?,(select employee_id from employee where employee_email = ? AND is_deleted = ?),?,?,?)";

              dataParams.push(data.employee['employee_email'],roleConstant.ACTIVE_NO, 'ASSESSMENT', data.reporting_managers[a],roleConstant.ACTIVE_NO, data.tenant_id,
                utilityMethods.current_datetime(), utilityMethods.current_datetime());

console.log(sql,dataParams);
         connection.query(sql, dataParams, function (err, results, fields) {
            callback(err, results);
        });
    },

    deletePrevReportingManagers: function (connection,data, callback) {
      console.log("data in delete reporting managers ",data)
        let temp = data.reporting_managers_prev.length; let prepString="";
        let dataParams = [data.tenant_id,data.employee['employee_email'],roleConstant.ACTIVE_NO];
        console.log("temp",temp)
        if(temp>1){
            for(var i=0;i<temp;i++){
              if (i == temp-1){
                prepString = prepString + "?";
                dataParams.push(data.reporting_managers_prev[i]);
              }else{
                prepString = prepString + "?,";
                dataParams.push(data.reporting_managers_prev[i]);
              }

            }
        }else {
          prepString = prepString + "?";
          dataParams.push(data.reporting_managers_prev[0]);
        }

        var sql = "DELETE FROM employee_reporting WHERE tenant_id = ? " +
                    "AND employee_id = (SELECT employee_id FROM employee WHERE employee_email=? AND is_deleted = ?) " +
                    "AND reporting_employee_id IN (SELECT employee_id FROM employee WHERE employee_email IN ("+prepString+")) " ;

        connection.query(sql,dataParams, function (err, results, fields) {
                callback(err, results);
        });
    },

    resetManagers: function (data,callback) {
        db.connection(function(err,connection){
            if(err){
                return  callback (err);
            }
            var sql = "DELETE FROM employee_reporting WHERE employee_id=?";
            connection.query(sql,[data["employee"]],function(err,results,fields){
                callback(null, results);
                connection.release();
                if(err){
                    callback(err, results);
                }
            });
        });

    },



};
module.exports = dao;