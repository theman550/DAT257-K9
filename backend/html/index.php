<center><?php

    $connection = new mysqli("localhost","root","eda257");
    mysqli_select_db($connection, "eda257");
    if(!$connection){
        echo "Error: " . PHP_EOL . "Error: " . mysqli_connect_errno() . PHP_EOL . mysqli_connect_error();
        exit;
    }
    else{
        echo 'Connected successfully to database </br>';
    }
    $sql = "SELECT eda257";
    $connection -> query($sql);
    $sql = "SELECT * FROM Resa";
    $result = $connection -> query( $sql);

    if($result -> num_rows > 0){
        echo "Tillgängliga resor: </br>";
        while($row = mysqli_fetch_assoc($result)){
            echo $row["Start"] . " -> " . $row["Slut"] . "</br>";
        }
    }
    mysqli_close($connection);
?>

<!DOCTYPE HTML>
<html><head><body>

<p><br/><br/><br/><br/>
<h1> Landningssida för backend i EDA257 grupp K9 </h1>
<h2> <a href="/phpMyAdmin/index.php"> phpMyAdmin </a> </h2>
    <marquee scrollamount="12" behavior="slide" width="63%" style="float: right">
    <img src="MicrosoftTeams-image.png" width="40%">
</marquee> 
<br/>

<br/><br/>









<!-- 

### Kan användas för att skriva meddelanden till fil, om det är smidigt.
        $myFile = "log.txt";
        $fh = fopen($myFile, 'a') or die("can't open file");
        fwrite($fh, detSomSkaSkrivas);
        fclose($fh);
 -->