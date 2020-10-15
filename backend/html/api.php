<?php

include("debug.php");
include("dataValidation.php");
include("connectDB.php");
include("booking.php");
include("user.php");
include("trips.php");
include("token.php");

define("SECRET_KEY", "f402a1dff337b00f3e5c121bb374ccfa802be479b6be1e812282db714a6e5c4fbd02b694a5ffbe073139693fa201719af75c8d876bd878df07534c3f695581cb"); // key ska ligga någon annanstans sen. 

function headers(){
	header('Access-Control-Allow-Origin: http://localhost:3000'); // <- Ersätt med null för att använda lokalt
	header('Content-Type: application/json');
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Credentials');
	header('Access-Control-Max-Age: 1000');	
	header('Access-Control-Allow-Credentials: true');
}

#skickar query i json-format 
function sendResponseQuery($response){
	if ($response->num_rows > 0) {
		$rows = $response->fetch_all(MYSQLI_ASSOC);
		$response = $rows; //Gör varje rad till json
	} else {
		$response = "no results found";
	}
	$json_response = json_encode($response); //Gör hela arrayen till json
    echo $json_response;
}
//Kan endast hantera sträng/array
function sendResponseString($response){
	echo json_encode($response);
}

function returnStringQuery($filterArray, $comparisonOperator){
	$queryString = "";
	for($i = 0; $i < count($filterArray); $i++)
	{
		if(isset($_GET[$filterArray[$i]]))
		{
			$val = $_GET[$filterArray[$i]];
			$queryString = $queryString . " AND $filterArray[$i] $comparisonOperator '$val'"; // comparisonOperator kan vara typ =, >, < osv, kommer leda till error vid fel.
		}
	}
	return $queryString;
}

// skrev om denna så att den funkar både för users och trips, tar en array av alla gets och hämtar bara de columnerna istället för alla(vill ej returnera password i json) 
function readFilteredTable($filterArray, $table, $inputQuery){
	$toSelect = implode(",", $filterArray);  // blir till string från array, t.ex [1,2,3,4] -> "1,2,3,4" 
	$query = "SELECT * FROM $table WHERE '1' = '1'" . $inputQuery; // syntax fel i query skapandet om inte '1' = '1' och jag vill lägga till flera ands, om inga argument läggs till returneras alla resor.
    $result = queryDB($query);
    return $result;
}

function findUserIDFromEmail($email){
    return queryDB("SELECT userID FROM Users WHERE email = '{$email}'")->fetch_assoc()['userID'];
}

?>
