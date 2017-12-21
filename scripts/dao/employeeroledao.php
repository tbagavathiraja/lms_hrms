<?php

namespace dao;

class EmployeeRoleDao extends Dao {
	public static function get_employee_role($connection, $employee_id) {
		$sql_query = " SELECT COUNT(1) FROM `employee_roles` WHERE employee_id = ?";
		$data = array($employee_id);
		return self::fetchColumn ( $connection, $sql_query, $data );
	}
	public static function get_employee_id($connection, $employee_email) {
		$sql_query = " SELECT employee_id FROM `employee` WHERE employee_email = ?";
		$data = array($employee_email);
		return self::fetchColumn ( $connection, $sql_query, $data );
	}
	public static function get_role($connection, $role_name) {
		$sql_query = " SELECT role_id FROM `roles` WHERE role_name = ?";
		$data = array($role_name);
		return self::fetchColumn ( $connection, $sql_query, $data );
	}
	public static function insert_role($connection, $role_id,$employee_id) {
		$sql_query = " INSERT INTO employee_roles (role_id,employee_id,active,tenant_id,created_timestamp,last_updated_timestamp) VALUES(?,?,1,1,NOW(),NOW())";
		$data = array($role_id,$employee_id);
		return self::executeDMLQuery ( $connection, $sql_query, $data );
	}
	public static function update_role($connection, $role_id,$employee_id) {
		$sql_query = " UPDATE employee_roles SET role_id = ?,active = 1,last_updated_timestamp = NOW() WHERE employee_id = ?";
		$data = array($role_id,$employee_id);
		return self::executeDMLQuery ( $connection, $sql_query, $data );
	}
}
