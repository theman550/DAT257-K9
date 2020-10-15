<?php
	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");

headers();

//Chrome skickar en pre-flight request av typ OPTIONS som 
//vill ha flaggor, den här biten löser det
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	headers();
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	$filterArray = getTripGETParameters();
	if(isset($_GET['startTime']))
	{
		$response = readFilteredTable($filterArray, "Resa", returnStringQuery($filterArray, "=") . returnStringQuery(Array("startTime"), ">=") . "ORDER BY startTime ASC");
	}
	else if(isset($_GET['price']))
	{
		$response = readFilteredTable($filterArray, "Resa", returnStringQuery($filterArray, "=") . returnStringQuery(Array("price"), ">=") . "ORDER BY price ASC");
	}
	sendResponseQuery($response);
}

else if($_SERVER['REQUEST_METHOD'] === 'POST'){
	$data = json_decode(file_get_contents("php://input", true));
	if(checkToken($data)){
		$response = writeTrip($data); // ändra writetrip så att den tar emot alla parametrar som förut så det inte blir error
		sendResponseString($response);
	}
	else{
			http_response_code(401); //unauthorized
		}
}
else{
	http_response_code(400);
}
?>