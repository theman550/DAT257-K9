<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");

	headers();

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		headers();
	}
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
	else{
		http_response_code(405); //"method not allowed", endast POST ska finnas här
	}
?>
