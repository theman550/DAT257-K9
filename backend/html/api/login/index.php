<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	//include(ABS_PATH . "/DAT257-K9/backend/html/api.php");
	include(ABS_PATH . "/api.php");
	//include(ABS_PATH . "/agilecourse/api.php");

	/* include(dirname(__FILE__) . "\api.php");
	include(dirname(__FILE__) . "\debug.php");
	 */
	 headers();
	

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		headers();
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$data = json_decode(file_get_contents("php://input", true));
		$email = "";
		$password = "";
		if(isset($data->email) && isset($data->password)) // om datan skickas i json, annars felmeddelande
		{
			$email = $data->email;
			$password = $data->password;
		}
		else // förutsätter att vanlig post används om datan inte skickats i JSON format
		{
			$email = $_POST['email'];
			$password = $_POST['password'];
		}
		$token = tryLogin($email, $password);
	    echo json_encode($token);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	}

?>
