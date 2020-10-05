<?php
require_once 'vendor/autoload.php';
use Assert\LazyAssertionException;
use Assert\Assert;

function validate($data){
	$dateString = "Y-m-d H:i:s";
		try{
			Assert::lazy() 
			->that($data->startLocation, 	"startLocation","Startlocation not defined")						 	-> notEmpty() -> string()
			->that($data->destination, 		"destination", 	"Destination not defined") 								-> notEmpty() -> string()
			->that($data->price, 			"price", 		"Price must be set and be an integer")		 			-> notEmpty() -> integer()
			->that($data->startTime,		"date", 		"Date must be set and in format YYYY-MM-DD HH:MM:SS")	-> notEmpty() -> date($dateString)
			->that($data->seatsAvailable, 	"Seats", 		"Seats must be defined and an integer")		 			-> notEmpty() -> integer()
			->that($data->description, 		"description", 	"Desciption missing")									-> notEmpty() -> string()
			->that($data->userID, 			"userID", 		"UserID invalid or not included with request")			-> notEmpty() -> string() -> startsWith("user-")
			->verifyNow();
		}
		catch(LazyAssertionException $errors){
			return createErrorResponse($errors);
		}
		return TRUE;

}

//Skapar en array med alla input-fel
function createErrorResponse($errors){ 
	$faults = array();
	$faults['faults'] = array();
	$errorList = $errors -> getErrorExceptions();
	foreach($errorList as $e){
		array_push($faults['faults'], $e->getMessage());
	}
	return $faults;
}


/* 
Här är koden jag tänkt använda till att validera användardata, börjar med trips tills jag vet mer om users bara.

 	if($type == 'trip'){
    
    }
	if($type == 'user'){
		try{
			Assert::lazy() 
			->that($data->userID, 		"userID",		"userID not complete")						 	-> notEmpty() -> string() -> startsWith("user-")
			->that($data->email, 		"email", 		"Incorrectly formatted email")					-> notEmpty() -> email()
			->that($data->firstname, 	"firstname", 	"First name must exist and be of type string")	-> notEmpty() -> string()
			->that($data->lastname,		"lastname", 	"Last name must exist and be of type string")	-> notEmpty() -> string()
			->that($data->password, 	"password", 	"Password will not pass")		 				-> notEmpty() -> integer()
			->verifyNow();
		}
		catch(LazyAssertionException $errors){
			return createErrorResponse($errors);
		}
	return TRUE;
	} */
?>