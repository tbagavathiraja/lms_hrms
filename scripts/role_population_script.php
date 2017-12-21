<?php
use dao\Dao;
use dao\EmployeeRoleDao;
use utilities\DbConnector;

require_once 'initialize.php';

$connection = DbConnector::getConnection ();
echo "Reading CSV file information";
echo "<br />";
$file = fopen("employee.csv","r");
$is_not_first_row = false;
echo "Populating employee role details starts";
echo "<br />";
while(! feof($file))
{
    $employee_data = fgetcsv($file);
    
    if($is_not_first_row){
	$employee_email = trim($employee_data[0]);
	$employee_id = EmployeeRoleDao::get_employee_id($connection,$employee_email);
	$role_name = strtoupper($employee_data[1]);
        $employee_count = EmployeeRoleDao::get_employee_role($connection,$employee_id);
	$role_id = EmployeeRoleDao::get_role($connection,$role_name);
	if(!empty($employee_id) && !empty($role_id)){
	    echo "Populating employee role for ".$employee_email." starts";
	    echo "<br />";
	    if($employee_count > 0){
	        EmployeeRoleDao::update_role($connection,$role_id,$employee_id);
	    }else{
	        EmployeeRoleDao::insert_role($connection,$role_id,$employee_id);
	    }
	    echo "Populating employee role for ".$employee_email." completed";
	    echo "<br />";
	}
    }
    $is_not_first_row = true;
}
echo "Populating employee role details completed";
fclose($file);



?>
