<?php
// $simple=true gör att den by default är true, så man behöver bara skriva queryDB(sql, false) om man vill ha databas-handle 
function queryDB($sql, $simple=true){
	$connection = connectDB();
	
    if(!$connection){
        echo "Error: " . PHP_EOL . "Error: " . mysqli_connect_errno() . PHP_EOL . mysqli_connect_error();
        exit;
    }
    
    $result = $connection -> query($sql);   
    if($simple){
        mysqli_close($connection);
        return $result;
    }
    else{
        return $result;
    }
}
function connectDB()
{
	$db_host        = '3.134.213.221';
    $db_user        = 'emil';
    $db_pass        = 'emilshemligaord';
    $db_database    = 'eda257'; 
    $db_port        = '3306';
    $connection = mysqli_connect($db_host,$db_user,$db_pass,$db_database,$db_port);
    $connection->set_charset('utf8');
	return $connection;
}
// Om man connectar utan att stänga behöver man en funktion att stänga samma connection manuellt. Att försöka connecta en redan connectad databas borde vara ok(?) och att "båda" stängs med close(?)
function disconnectDB()
{
	$connection = connectDB();
	mysqli_close($connection);
}
?>