<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");
	include(ABS_PATH . "/booking.php");

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
		$response = bookTrip($data);
		sendResponseString($response);
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		//$response = getBooking($_GET['bookingID']);
		//sendResponseQuery($response); */
		$response = getAllBookingsFromUser($_GET['userID']);
		logga($response);
		sendResponseString($response);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
		$response = deleteBooking($_REQUEST['bookingID']);
		sendResponseString($response);
	}
?>