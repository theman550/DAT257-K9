<?php

include("connectDB.php");

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
// skrev om denna så att den funkar både för users och trips, tar en array av alla gets och hämtar bara de columnerna istället för alla(vill ej returnera password i json) 
function readFilteredTable($filterArray, $table){
	$toSelect = implode(",", $filterArray); // blir till string från array, t.ex [1,2,3,4] -> "1,2,3,4" 
	$query = "SELECT $toSelect FROM $table WHERE '1' = '1'"; // syntax fel i query skapandet om inte '1' = '1' och jag vill lägga till flera ands, om inga argument läggs till returneras alla resor.
	for($i = 0; $i < count($filterArray); $i++)
	{
		if(isset($_GET[$filterArray[$i]]))
		{
			$val = $_GET[$filterArray[$i]];
			$query = $query . " AND $filterArray[$i] = '$val'";
		}
	}
    $result = queryDB($query);
    return $result;
}
function getTripGETParameters()
{
	return array("startLocation", "destination", "price", "tripID", "startTime", "seatsAvailable", "description", "userID");
}
function getUserGETParameters()
{
	return array("userID", "email", "firstname", "lastname");
}
function tripExists($tripID)
{
	$query = "SELECT * FROM Resa WHERE tripID = '$tripID'";
	$result = queryDB($query);
	if(mysqli_num_rows($result) > 0)
		return true;
	return false;
}
function removeTrip($tripID)
{
	$sql = "DELETE FROM Resa WHERE tripID = '$tripID'";
	queryDB($sql);
}

function writeTrip($data){ 
    $tripID = createTripID();
	$sql = "INSERT INTO Resa (startLocation, destination, price, tripID, startTime, seatsAvailable, description, userID) VALUES (
        '{$data->startLocation}',
        '{$data->destination}',
        '{$data->price}',
        '{$tripID}',
        '{$data->startTime}',
        '{$data->seatsAvailable}',
        '{$data->description}',
        '{$data->userID}')";
    $status = queryDB($sql);
    if($status === true){ // Var allt ok, returnera ID
        http_response_code(201);
        return $tripID;
    }
    else{ // Annars returnera ilska och en nolla
        http_response_code(400);
        return 0;
    }
}

// generar trip-id på form "trip-xxxxx...x"
function createTripID()
{
	return (uniqid('trip-', true));
} 
// genererar user-id på form "user-xxxx...x"
function createUserID()
{
	return (uniqid('user-', true));
}

// skapar nytt konto i databas om mail inte redan finns inlagd, lösenord hashas också innan
function createAccount($email, $password, $firstname, $lastname)
{
	$userID = createUserID();
	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
	if(!validMail($email))
	{
		// hantera, JSON retur?
		return null; 
	}
	$sql = "INSERT INTO Users (userID, email, firstname, lastname, password) VALUES ('$userID', '$email', '$firstname', '$lastname', '$hashedPassword')";
	queryDB($sql);
	return $userID;
}
// kollar så att mailen inte redan finns i databas
function validMail($email)
{
	$sql = "SELECT * FROM Users WHERE email = '$email'";
	$result = queryDB($sql);
	if (mysqli_num_rows($result) > 0)
	{
		return false;
	}	
	return true;
	// if(!filter_var($email, FILTER_VALIDATE_EMAIL)) skulle kunna användas för att kontrollera att formatet av mailen är rätt, men det borde frontend göra tycker jag	
}
// returnar lösenordsHash i databas
function getPassword($email)
{
	$query = "SELECT password FROM Users WHERE email ='$email'";
	$password = queryDB($query);
	return $password;
}

// https://stackoverflow.com/questions/1354999/keep-me-logged-in-the-best-approach länk om hur man lägger till bra säkerhet enkelt.
// jämnför om lösenord i plaintext angivet för en email matchar den hashade verisionen av det lösenordet
function tryLogin($email, $password)
{	
	$row = mysqli_fetch_assoc(getPassword($email));
	if(password_verify($password, $row['password']))
	{
		// sätt session <-- http://www.learningaboutelectronics.com/How-to-use-sessions-to-track-user-data-using-PHP.php
		echo 'logged in';
	}
}
// tar bort alla tider som gått ut, användning 0 parametrar ger alla tider som expireats utan filter, med extraconditions satt kan t.ex filterExpiredTrips("startLocation = 'lidkoping'"); som ger alla resor som inte gått ut och startar i lidkoping
function filterExpiredTrips($extraConditions = null)
{
	$currentTime = date('d-m-y h:i:s');
	echo $currentTime;
	$query;
	if($extraConditions != null)
	{
		$query = "SELECT * FROM Resa WHERE startTime >='$currentTime' AND " . $extraConditions;
	}
	else
	{
		$query = "SELECT * FROM Resa WHERE startTime >='$currentTime'"; // ändra till >=
	}
	return (queryDB($query));
}
?>