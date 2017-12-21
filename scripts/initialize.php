<?php
use utilities\Logger;

define ( 'DS', DIRECTORY_SEPARATOR );
define ( 'BASE_PATH', dirname ( __FILE__ ) );
define ( 'CONTEXT_PATH', dirname ( __FILE__ ) . DS );

define ( 'CONFIG_PATH', CONTEXT_PATH . 'config' . DS );
spl_autoload_register ( "autoload", true, true );

$error_log = "/var/log/httpd/script_log_" . date ( "Y-m-d" ) . ".log";
error_reporting ( E_ALL | E_STRICT );
ini_set ( 'display_errors', 1 );
ini_set ( "log_errors", "1" );
ini_set ( "error_log", $error_log );
const LOGGER_LOG_LEVEL = Logger::DEBUG;

require_once CONFIG_PATH . 'config.php';
function autoload($class) {
	try {
		$classPath = CONTEXT_PATH . strtolower ( str_replace ( '\\', '/', $class ) . '.php' );
		if (file_exists ( $classPath )) {
			require_once $classPath;
		} else {
			if (substr_compare ( strtolower ( $class ), "callback", - 8, 8 ) != 0) {
				throw new Exception ( 'File not found : ' . $classPath );
			}
		}
	} catch ( Exception $e ) {
		error_log ( $e );
		die ( "File not found." . $e );
	}
}
