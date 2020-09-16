<?php
include("connectDB.php");

writeTrip("lidkoping", "skövde", null, 100, 5, "bästa resan nånsin!", createUserID());
#Här tänker jag mig att huvudlogiken för servern ska vara
if(isset($_GET['function'])){
    switch($_GET['function']){
        case "writeTrip":
            writeTrip();
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
        $sql = "SELECT * FROM Resa WHERE Start = '{$_GET['from']}'";
    }
    else{
        $sql = "SELECT * FROM Resa";
    }
    $result = queryDB($sql, true);
    //printRows($result);
    return $result;
}

#Skriver en ny resa till databasen
function writeTrip($startLocation, $destination, $startTime, $price, $seatsAvailable, $description, $userID/*la till variabler temp för testning, ska vara post senare*/){ 
    $POST = [ #Det här ska simulera den $_POST vi får från frontend
    'Start' => 'Myskoxe',
    'Slut' => 'Vildsvin',
    'Pris' => '321'
    ];
    $start = $POST['Start'];
    $slut = $POST['Slut'];
    $pris = $POST['Pris'];

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
            echo "<li>" . $row["Start"] . " -> " . $row["Slut"] . "</br>";
        }
    }
}
?>