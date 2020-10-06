<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");
	//include(ABS_PATH . "/agilecourse/api.php");

	/* include(dirname(__FILE__) . "\api.php");
	include(dirname(__FILE__) . "\debug.php");
	 */
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	header('Access-Control-Max-Age: 1000');	
	if (session_status() == PHP_SESSION_NONE) {
    session_start();
	}
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		header('Access-Control-Max-Age: 1000');	
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$data = json_decode(file_get_contents("php://input", true));
		$token = tryLogin($data->email, $data->password);
		echo json_encode($token);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		
	}

?>