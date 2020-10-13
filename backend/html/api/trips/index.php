<?php
define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);

//include(ABS_PATH . "/DAT257-K9/backend/html/api.php");
include(ABS_PATH . "/api.php");
//include(ABS_PATH . "/agilecourse/api.php");

headers();

//Chrome skickar en pre-flight request av typ OPTIONS som 
//vill ha flaggor, den här biten löser det
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	headers();
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET') {

	$filterArray = getTripGETParameters();
	$response = readFilteredTable($filterArray, "Resa", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">=") . "ORDER BY startTime ASC");
	sendResponseQuery($response);
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$data = json_decode(file_get_contents("php://input", true));
	if(isset($data->loggedInEmail) && isset($data->token))
	{		
		if(verifyToken($data->loggedInEmail, $data->token) && !hasTokenExpired($data->loggedInEmail))
		{	
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