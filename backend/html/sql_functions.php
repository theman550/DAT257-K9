
			<?php 	
			addTripToDB();
			//header("Access-Control-Allow-Origin: *");
			//header('Content-Type: application/json');    
			function connect()
			{
				$connection = new mysqli("3.134.213.221","emil","emilshemligaord");
				mysqli_select_db($connection, "eda257");
				if(!$connection){
					echo "Error: " . PHP_EOL . "Error: " . mysqli_connect_errno() . PHP_EOL . mysqli_connect_error();
					exit;
				}
				else 
				{
					echo 'wohoooo';
				}			
				$sql = "SELECT eda257";
				$connection -> query($sql);
				return $connection;
			}
			
				function addTripToDB()//$startLocation, $destination, $startDate, $price, $seatsAvailable, $description, $tripID, $userID)
				{
					$connection = connect();
					$sql2 = "INSERT INTO Resa (Start, Slut, Pris, ID) VALUES ('Lidkoping', 'Alingsas', '200', '2020-09-15 14:37:38')";
					$connection -> query($sql2);
				}
		?> 
