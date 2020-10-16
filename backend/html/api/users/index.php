<?php
	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");

	headers();

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		headers();
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {	
		$data = json_decode(file_get_contents("php://input", true));
		$email = $password = $firstname = $lastname = "";
		if(isset($data->email, $data->password, $data->firstname, $data->lastname))
		{
			$email = $data->email;
			$password = $data->password;
			$firstname = $data->firstname;
			$lastname = $data->lastname;
		}
		else
		{
			$email = $_POST['email'];
			$password = $_POST['password'];
			$firstname = $_POST['firstname'];
			$lastname = $_POST['lastname'];
		}
		$userID = createAccount($email, $password, $firstname, $lastname);
		if($userID == null)
		{
			http_response_code(400);
			return;
		}
		else
		{
			http_response_code(201);
			$tokenMail = logUserIn($email);
		}
		echo json_encode($tokenMail);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {	
		$data = json_decode(file_get_contents("php://input", true));
		$filterArray = getUserGETParameters();
		$response = readFilteredTable($filterArray, "Users", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">="));
		sendResponseQuery($response);	
	}
	else{
		http_response_code(405);
	}
?>