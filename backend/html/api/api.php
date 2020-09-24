<?php
include("connectDB.php");
#skickar svar i json-format 
// tror inte denna behövs/används(?)
function sendResponse($response){ 
    if ($response->num_rows > 0) {
        $rows = $response->fetch_all(MYSQLI_ASSOC);
        $response = json_encode($rows);
    } else {
        $response = "no results found";
    }
    $json_response = json_encode($response);
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');
    echo $json_response;
}

#Om "from" är satt returneras endast resor därifrån, annars alla
#Den här funktionen går lätt att bygga vidare på med fler argument
function readTrips()
{
	$filterArray = getTripGETParameters();
	$query = "SELECT * FROM Resa WHERE '1' = '1'"; // syntax fel i query skapandet om inte '1' = '1' och jag vill lägga till flera ands, om inga argument läggs till returneras alla resor.
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
// testar om expected av element finns i databasen i varje steg, och om $onlyAdd = false, kollar om det är korrekt efter borttagning och att alla idn som lagts till finns
function testTrip($numOfTests, $onlyAdd = false, $path ="testing/worldcities.csv") // $path ska vara path till csv fil och filnamn.csv dvs -> path/worldcities.csv, $numOfTests måste vara reasonable längd, tror det finns 15k entries, så absolut inte längre än 5k tests
{
	$numOfTripsAtStart = mysqli_num_rows(queryDB("SELECT * FROM Resa"));
	$allTrips = [];
	if(($handle = fopen($path, "r" )) !== FALSE)
	{
		$row1 = fgetcsv($handle, 1000, ","); // första raden har info om input typ
		for($i = 0; $i < $numOfTests; $i++)
		{
			$row1 = fgetcsv($handle, 1000, ",");
			$row2 = fgetcsv($handle, 1000, ",");
			array_push($allTrips, writeTrip($row1[0], $row2[0], null, 300, 10, $row1[0] . " --> " . $row2[0], createUserID()));
		}
	}	
	$currentNumOfTrips = mysqli_num_rows(queryDB("SELECT * FROM Resa"));
	if($currentNumOfTrips != $numOfTripsAtStart + $numOfTests)
	{
		fclose($handle);
		return false;
	}
	if(!$onlyAdd)
	{
		foreach($allTrips as $tripID)
		{
			if(!tripExists($tripID))
				return false;
			removeTrip($tripID);
		}
	}
	if(mysqli_num_rows(queryDB("SELECT * FROM Resa")) != $numOfTripsAtStart && !$onlyAdd)
	{
		fclose($handle);
		return false;
	}
	fclose($handle);
	return true;
}
#Skriver en ny resa till databasen
function writeTrip($startLocation, $destination, $startTime, $price, $seatsAvailable, $description, $userID/*la till variabler temp för testning, ska vara post senare*/){ 
	$tripID = createTripID();
	$sql = "INSERT INTO Resa (startLocation, destination, price, tripID, startTime, seatsAvailable, description, userID) VALUES ('$startLocation', '$destination', '$price', '$tripID', '" . $startTime/*date('2020-09-15 22:20:31')*/ . "' , '$seatsAvailable', '$description', '$userID')";
    queryDB($sql);
	return $tripID; // detta är mest för testningens skull, men borde kanske alltid returnera? Ponera: skapar resa, resa ändras direkt efter på frontend, förutsätter att en resa som läggs till ska visas någonstans och att man vill ha en referens i form av id till den resan
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
#Printar en query 
// Behövs/används denna(?)
function printRows($result){
    if($result -> num_rows > 0){
        echo "<b><u>Resultat från query: </br></b></u>";
        while($row = mysqli_fetch_assoc($result)){
            echo "<li>" . $row["startLocation"] . " -> " . $row["destination"] . "</br>";
        }
    }
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
	echo $sql;
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