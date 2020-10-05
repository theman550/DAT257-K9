<?php

include("connectDB.php");
include_once("debug.php");
include_once("dataValidation.php");
define("SECRET_KEY", "f402a1dff337b00f3e5c121bb374ccfa802be479b6be1e812282db714a6e5c4fbd02b694a5ffbe073139693fa201719af75c8d876bd878df07534c3f695581cb"); // key ska ligga någon annanstans sen. 
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
function returnStringQuery($filterArray, $comparisonOperator)
{
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
function getTripGETParameters()
{
	return array("startLocation", "destination", "price", "tripID", "seatsAvailable", "description", "userID");
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
	$validationResult = validate($data);
	if($validationResult === TRUE){ //Endast om all data var okej, försök skapa entry
		$return = array();
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
			$return['tripID'] = $tripID;
			return $return;
		} //Borde aldrig kunna komma hit om validate gör sitt jobb
		else{ // Annars returnera ilska och en nolla
			http_response_code(400);
			return 0;
    	}
	}
	else{ //Skickar felmeddelandet från validate
		http_response_code(400);
		return $validationResult;
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
function createToken($email)
{
	$token = bin2hex(random_bytes(64));
	$query = "UPDATE Users SET auth = '$token' where email = '$email'";
	queryDB($query);
	return $token;
}
function setExpire($email, $dateInterval)
{
	date_default_timezone_set("Europe/Stockholm"); // använder stockholms tid i databasen, kanske går att sätta globalt istället?
	$currentDate = new DateTime();
	$currentDate->add($dateInterval); // formatet är P före YMD och T före HMS, detta gör att användaren har giltigt auth en timme.
	$dateToInsert = $currentDate->format('Y-m-d H:i:s'); // format för databasen
	$query = "UPDATE Users SET auth_expires = '$dateToInsert' where email = '$email'";
	queryDB($query);
}
function confirmTokenExpired($email)
{
	date_default_timezone_set("Europe/Stockholm"); 
	$query = "SELECT auth_expires FROM Users where email = '$email'";
	$response = queryDB($query);
	if(mysqli_num_rows($response) > 0)
	{
		$currentTime = date('d-m-y h:i:s');
		$row = $response->fetch_row(); // SKA bara ge tillbaka en rad eftersom email alltid är unik i databasen och ger max ett resultat
		if($currentTime > $row[0])
			return false;
		else
			return true;
	}
	return false;
}
function getTokenFromDB($email)
{
	$query = "SELECT auth FROM Users where email = '$email'";
	$response = queryDB($query);
	if(mysqli_num_rows($response) > 0)
	{
		$row = $response->fetch_row();
		return $row[0];
	}
	return "error";
}
function verifyToken($email, $token)
{
	if($token == getTokenFromDB($email))
		return true;
	return false;
}
// https://stackoverflow.com/questions/1354999/keep-me-logged-in-the-best-approach eller https://developer.okta.com/blog/2019/02/04/create-and-verify-jwts-in-php länk om hur man lägger till bra säkerhet enkelt.
// jämnför om lösenord i plaintext angivet för en email matchar den hashade verisionen av det lösenordet
function tryLogin($email, $password, $rememberMe=0)
{	
	// session_start();
	$token = "error";
	$row = mysqli_fetch_assoc(getPassword($email));
	if(password_verify($password, $row['password'])) 
	{
		$token = logUserIn($email);
		if($rememberMe !== 0) // rememberMe=0 innebär att inte komma ihåg
		{
			setRememberMeCookie($email, $token);
		}
		http_response_code(201); 	
	}
	else
	{
		http_response_code(400);
	}
	return $token; //$token == "error" om något token inte lyckats fås
}
function logUserIn($email)
{
	$token = "";
	if(confirmTokenExpired($email))
		$token = getTokenFromDB($email);
	else
		$token = createToken($email);
	setExpire($email, new DateInterval("PT1H"));
	$_SESSION['loggedin'] = true;
	$_SESSION["token"] = $token;
	$_SESSION["email"] = $email;
	return $token;
}
function setRememberMe($email, $token)
{
	$cookie = $email . ':' . $token;
	$mac = hash_hmac('sha256', $cookie, SECRET_KEY);
	$cookie .= ':' . $mac;
	setcookie('rememberme', $cookie);
	$interval = new DateInterval("P1Y");
	setExpire($email, $interval);
}
function rememberMe() {
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    if ($cookie) {
        list ($email, $token, $mac) = explode(':', $cookie);
        if (!hash_equals(hash_hmac('sha256', $email . ':' . $token, SECRET_KEY), $mac)) {
            return false;
        }
        $usertoken = getTokenFromDB($email);
        if (hash_equals($usertoken, $token)) {
			setRememberMe($email, $token);
            logUserIn($user);
        }
    }
}
function logout($email, $token)
{
	$tokenFromDB = getTokenFromDB($email);
	if($tokenFromDB == $token)
	{ 
		$interval = new DateInterval("P0Y");
		setExpire($email, $interval); // sätter till nuvarande tiden, dvs nästa gång användaren försöker logga in har token expireat
		session_start();
		session_destroy();
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