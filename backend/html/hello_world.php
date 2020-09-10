<?php
    $response = getTrip();
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json');    
    echo json_encode($response);

function getTrip(){
    $connection = new mysqli("localhost","root","eda257");
    mysqli_select_db($connection, "eda257");
    if(!$connection){
        echo "Error: " . PHP_EOL . "Error: " . mysqli_connect_errno() . PHP_EOL . mysqli_connect_error();
        exit;
    }

    $sql = "SELECT eda257";
    $connection -> query($sql);
    $sql = "SELECT * FROM Resa";
    $result = $connection -> query( $sql);
    $return = array(); 
    if($result -> num_rows > 0){
        while($row = mysqli_fetch_assoc($result)){
            array_push($return, $row["Start"] . " -> " . $row["Slut"]);
        }
    }
    return $return[1];
}
?>