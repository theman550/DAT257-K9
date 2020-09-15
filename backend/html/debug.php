<?php 
include("api.php");
#Endast för debugging, använd readTrips utan "from" i produktion
function printAllTrips(){ 
    #    $sql = "SELECT * FROM Resa WHERE Slut IS Stockholm";
        $sql = "SELECT * FROM Resa";
        $result = queryDB($sql, true);
        printRows($result);
}

?>