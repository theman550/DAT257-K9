<?php


function writeTrip($data){ 
	$userID = findUserIDFromEmail($data->loggedInEmail);
	$validationResult = validateTrip($data, $userID);
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
			'{$userID}')";
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

// tar bort alla tider som gått ut, användning 0 parametrar ger alla tider som expireats utan filter, med extraconditions satt kan t.ex filterExpiredTrips("startLocation = 'lidkoping'"); som ger alla resor som inte gått ut och startar i lidkoping
function filterExpiredTrips($extraConditions = null)
{
	$currentTime = date('d-m-y h:i:s');
	echo $currentTime;
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


function tripExists($tripID){
	$query = "SELECT * FROM Resa WHERE tripID = '$tripID'";
	$result = queryDB($query);
	if(mysqli_num_rows($result) > 0)
		return true;
	return false;
}
function removeTrip($tripID){
	$sql = "DELETE FROM Resa WHERE tripID = '$tripID'";
	queryDB($sql);
}


// generar trip-id på form "trip-xxxxx...x"
function createTripID()
{
	return (uniqid('trip-', true));
} 


function getTripGETParameters(){
	return array("startLocation", "destination", "price", "tripID", "seatsAvailable", "description", "userID");
}

?>