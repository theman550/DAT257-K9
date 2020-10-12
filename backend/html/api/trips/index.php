<?php
define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
//include(ABS_PATH . "/api.php");
include(ABS_PATH . "/agilecourse/api.php");

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 1000');	

//Chrome skickar en pre-flight request av typ OPTIONS som 
//vill ha flaggor, den här biten löser det
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	header('Access-Control-Allow-Origin: http://localhost:3000');
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
	header('Access-Control-Max-Age: 1000');	
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	if (session_status() == PHP_SESSION_NONE)
		session_start();
	if(isset($_SESSION['email']) && isset($_SESSION['token']))
	{		
		if(verifyToken($_SESSION['email'], $_SESSION['token']))
		{	
			$filterArray = getTripGETParameters();
			$response = readFilteredTable($filterArray, "Resa", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">=") . "ORDER BY startTime ASC");
			sendResponseQuery($response);
		}
	}
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
	if (session_status() == PHP_SESSION_NONE)
		session_start();
	if(isset($_SESSION['email']) && isset($_SESSION['token']))
	{		
		if(verifyToken($_SESSION['email'], $_SESSION['token']))
		{	
			$data = json_decode(file_get_contents("php://input", true));
			$response = writeTrip($data); // ändra writetrip så att den tar emot alla parametrar som förut så det inte blir error
			sendResponseString($response);
			/*if(isset($data->startLocation) && isset($data->destination) && isset($data->price) && isset($data->startTime) && isset($data->seatsAvailable) && isset($data->description) && isset($data->userID))
			{
				$response = writeTrip($data->startLocation, $data->destination, $data->price, $data->startTime, $data->seatsAvailable, $data->description, $data->userID); // ändra writetrip så att den tar emot alla parametrar som förut så det inte blir error
				sendResponseString($response);
			}*/
				//$response = writeTrip($_POST['startLocation'], $_POST['destination'], $_POST['price'], $_POST['startTime'], $_POST['seatsAvailable'], $_POST['description'], $_POST['userID']);

			http_response_code(201);
		}
	}
	else
	{
		http_response_code(400);
	}
}
?>