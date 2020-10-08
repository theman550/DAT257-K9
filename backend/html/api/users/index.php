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

	//Chrome skickar en pre-flight request av typ OPTIONS som 
	//vill ha flaggor, den här biten löser det
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		header('Access-Control-Max-Age: 1000');	
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
			http_response_code(400);
		else
		{
			http_response_code(201);
			logUserIn($email);
		}
		//echo json_encode($userID);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if (session_status() == PHP_SESSION_NONE)
		session_start();
		if(isset($_SESSION['email']) && isset($_SESSION['token']))
		{		
			if(verifyToken($_SESSION['email'], $_SESSION['token']))
			{	
				$filterArray = getUserGETParameters();
				$response = readFilteredTable($filterArray, "Users", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">="));
				sendResponseQuery($response);
			}
		}
	}
?>