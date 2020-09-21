<?php
include("connectDB.php");

#Här tänker jag mig att huvudlogiken för servern ska vara
if(isset($_GET['function'])){
    switch($_GET['function']){
        case "writeTrip":
            //writeTrip();
            writeTrip("lidkoping", "skövde", null, 100, 5, "bästa resan nånsin!", createUserID());
            break;
        case "readTrips":
            $response = readTrips();
            sendResponse($response);
            break;
        }
}

#skickar svar i json-format
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
function readTrips(){
    if(isset($_GET['from'])){ 
        $sql = "SELECT * FROM Resa WHERE startLocation = '{$_GET['from']}'";
    }
    elseif(isset($_GET['tripID'])){
        $sql = "SELECT * FROM Resa WHERE tripID = '{$_GET['tripID']}'";
    }
    elseif(isset($_GET['userID'])){
        $sql = "SELECT * FROM Resa WHERE userID = '{$_GET['userID']}'";
    }
    else{
        $sql = "SELECT * FROM Resa";
    }
    $result = queryDB($sql);
    return $result;
}

#Skriver en ny resa till databasen
function writeTrip($startLocation, $destination, $startTime, $price, $seatsAvailable, $description, $userID/*la till variabler temp för testning, ska vara post senare*/){ 
    $POST = [ #Det här ska simulera den $_POST vi får från frontend
    'Start' => 'Myskoxe',
    'Slut' => 'Vildsvin',
    'Pris' => '321'
    ];
    $start = $POST['startLocation'];
    $slut = $POST['destination'];
    $pris = $POST['Price'];

    //$sql = "INSERT INTO Resa (Start, Slut, Pris) VALUES ('{$start}', '{$slut}', '{$pris}')";
	// uppdaterad med nya databas formatet, detta är fortfarande en dummy/exempel insert
	$sql = "INSERT INTO Resa (startLocation, destination, price, tripID, startTime, seatsAvailable, description, userID) VALUES ('$startLocation', '$destination', '$price', '" . createTripID() . "', '" . date('2020-09-15 22:20:31') . "' , '$seatsAvailable', '$description', '$userID')";
    queryDB($sql);
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
function printRows($result){
    if($result -> num_rows > 0){
        echo "<b><u>Resultat från query: </br></b></u>";
        while($row = mysqli_fetch_assoc($result)){
            echo "<li>" . $row["startLocation"] . " -> " . $row["destination"] . "</br>";
        }
    }
}
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
function filterExpiredTrips($extraConditions = null)
{
	$currentTime = date('d-m-y h:i:s');
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