<?php
function queryDB($sql){
    $connection = connectDB();
    $result = $connection -> query($sql);   
    disconnectDB($connection);
    return $result;
}
function connectDB(){
    $db_host        = '3.134.213.221';
    $db_user        = 'emil';
    $db_pass        = 'emilshemligaord';
    $db_database    = 'eda257'; 
    $db_port        = '3306';
    $connection     = mysqli_connect($db_host,$db_user,$db_pass,$db_database,$db_port);
    $connection->set_charset('utf8');

    if(!$connection){
        echo "Error: " . PHP_EOL . "Error: " . mysqli_connect_errno() . PHP_EOL . mysqli_connect_error();
        exit;
    }
    return $connection;
}
function disconnectDB($connection){
    mysqli_close($connection);
}
?>