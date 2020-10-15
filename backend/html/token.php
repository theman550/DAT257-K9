<?php

function createToken($email)
{
	$token = bin2hex(random_bytes(64));
	$query = "UPDATE Users SET auth = '$token' where email = '$email'";
	queryDB($query);
	return $token;
}
function setExpire($email, $dateInterval)
{
	date_default_timezone_set("Europe/Stockholm"); // använder stockholms tid i databasen, kanske går att sätta globalt istället?
	$currentDate = new DateTime();
	$currentDate->add($dateInterval); // formatet är P före YMD och T före HMS, detta gör att användaren har giltigt auth en timme.
	$dateToInsert = $currentDate->format('Y-m-d H:i:s'); // format för databasen
	$query = "UPDATE Users SET auth_expires = '$dateToInsert' where email = '$email'";
	queryDB($query);
}

function hasTokenExpired($email){
	date_default_timezone_set("Europe/Stockholm"); 
	$query = "SELECT auth_expires FROM Users where email = '$email'";
	$response = queryDB($query);
	if(mysqli_num_rows($response) > 0)
	{
		$currentTime = time();//date('d-m-y h:i:s');
		$row = $response->fetch_row(); // SKA bara ge tillbaka en rad eftersom email alltid är unik i databasen och ger max ett resultat
		if($currentTime > strtotime($row[0]))
			return true;
		else
		{
			return false;
		}
	}
	return false;
}

function getTokenFromDB($email){
	$query = "SELECT auth FROM Users where email = '$email'";
	$response = queryDB($query);
	if(mysqli_num_rows($response) > 0)
	{
		$row = $response->fetch_row();
		return $row[0];
	}
	return "error";
}
function verifyToken($email, $token)
{
	if($token == getTokenFromDB($email))
		return true;
	return false;
}

function checkToken($data){
	if(isset($data->loggedInEmail) && isset($data->token)){
		if(verifyToken($data->loggedInEmail, $data->token) && !hasTokenExpired($data->loggedInEmail)){
			return true;
		}
		else{
			http_response_code(401);
			return false;
		}
	}
	else{
		http_response_code(401);
		return false;
	}
}
?>