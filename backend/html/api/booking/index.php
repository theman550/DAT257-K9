<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");
	
	headers();
	$data = json_decode(file_get_contents("php://input", true));

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		headers();
	}
	if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		if(isset($_GET['userID'])){
			$response = getAllBookingsFromUser($_GET['userID']);
		}
		else if(isset($_GET['bookingID'])){
			$response = getBooking($_GET['bookingID'])->fetch_assoc();
		}
		else{
			$response = "Varken userID eller bookingID är satt.";
		}
		sendResponseString($response);
	}
	if(checkToken($data)){
		if ($_SERVER['REQUEST_METHOD'] === 'POST') {
				$response = bookTrip($data);
		}
		else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
			if(isset($_REQUEST['bookingID']))
				$response = deleteBooking($_REQUEST['bookingID']);
			else
				$response = deleteBooking($data->bookingID);
		}
		sendResponseString($response);
	}
	else{
		http_response_code(401);
	}
?>