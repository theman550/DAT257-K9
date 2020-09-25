<?php

include("api.php");

#### Endast funktioner för debugging #####

//Liten debug-sak jag använder typ hela tiden
//Kan printa typ allt - hela requests, queries, strängar...
function logga($text){ 
    ob_start();
    var_dump($text);
    $content = ob_get_clean();
    file_put_contents("log.txt", $content,  FILE_APPEND);
}

#Endast för debugging, använd readTrips utan "from" i produktion
function printAllTrips(){ 
    #    $sql = "SELECT * FROM Resa WHERE Slut IS Stockholm";
        $sql = "SELECT * FROM Resa";
        $result = queryDB($sql, true);
        printRows($result);
}

#Skriver en ny resa till databasen
function writeTripTest($startLocation, $destination, $startTime, $price, $seatsAvailable, $description, $userID/*la till variabler temp för testning, ska vara post senare*/){ 
	$tripID = createTripID();
	$sql = "INSERT INTO Resa (startLocation, destination, price, tripID, startTime, seatsAvailable, description, userID) VALUES ('$startLocation', '$destination', '$price', '$tripID', '" . $startTime/*date('2020-09-15 22:20:31')*/ . "' , '$seatsAvailable', '$description', '$userID')";
    queryDB($sql);
	return $tripID; // detta är mest för testningens skull, men borde kanske alltid returnera? Ponera: skapar resa, resa ändras direkt efter på frontend, förutsätter att en resa som läggs till ska visas någonstans och att man vill ha en referens i form av id till den resan
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
			array_push($allTrips, writeTripTest($row1[0], $row2[0], null, 300, 10, $row1[0] . " --> " . $row2[0], createUserID()));
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

function printRows($result){
    if($result -> num_rows > 0){
        echo "<b><u>Resultat från query: </br></b></u>";
        while($row = mysqli_fetch_assoc($result)){
            echo "<li>" . $row["startLocation"] . " -> " . $row["destination"] . "</br>";
        }
    }
}

?>