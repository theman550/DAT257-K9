<?php

function logout($email, $token)
{
	$tokenFromDB = getTokenFromDB($email);
	if($tokenFromDB == $token)
	{ 
		$interval = new DateInterval("P0Y");
		setExpire($email, $interval); // sätter till nuvarande tiden, dvs nästa gång användaren försöker logga in har token expireat
	}
}

function logUserIn($email)
{
	$token = "";
	if(!hasTokenExpired($email))
		$token = getTokenFromDB($email);
	else
		$token = createToken($email);
	setExpire($email, new DateInterval("PT1H"));
	$tokenMail = array( "email" => $email,
                    "token" => $token);
	return $tokenMail;
}


// https://stackoverflow.com/questions/1354999/keep-me-logged-in-the-best-approach eller https://developer.okta.com/blog/2019/02/04/create-and-verify-jwts-in-php länk om hur man lägger till bra säkerhet enkelt.
// jämnför om lösenord i plaintext angivet för en email matchar den hashade verisionen av det lösenordet
function tryLogin($email, $password, $rememberMe=0)
{	
	$token = "error";
	$row = mysqli_fetch_assoc(getPassword($email));
	if(password_verify($password, $row['password'])) 
	{
		$token = logUserIn($email);
		http_response_code(201); 	
	}
	else
	{
		http_response_code(400);
	}
	return $token; //$token == "error" om något token inte lyckats fås
}

// returnar lösenordsHash i databas
function getPassword($email)
{
	$query = "SELECT password FROM Users WHERE email ='$email'";
	$password = queryDB($query);
	return $password;
}

// skapar nytt konto i databas om mail inte redan finns inlagd, lösenord hashas också innan
function createAccount($email, $password, $firstname, $lastname){
	$userID = createUserID();
	$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
	if(!validMail($email))
	{
		// hantera, JSON retur?
		return null; 
	}
	$sql = "INSERT INTO Users (userID, email, firstname, lastname, password) VALUES ('$userID', '$email', '$firstname', '$lastname', '$hashedPassword')";
	queryDB($sql);
	return $userID;
}
// kollar så att mailen inte redan finns i databas
function validMail($email)
{
	$sql = "SELECT * FROM Users WHERE email = '$email'";
	$result = queryDB($sql);
	if (mysqli_num_rows($result) > 0)
	{
		return false;
	}	
	return true;
}

// genererar user-id på form "user-xxxx...x"
function createUserID()
{
	return (uniqid('user-', true));
}

function getUserGETParameters(){
	return array("userID", "email", "firstname", "lastname");
}





/* Ej implementerat */
/*

		if($rememberMe !== 0) // rememberMe=0 innebär att inte komma ihåg
		{
			setRememberMeCookie($email, $token);
		}



function setRememberMe($email, $token)
{
	$cookie = $email . ':' . $token;
	$mac = hash_hmac('sha256', $cookie, SECRET_KEY);
	$cookie .= ':' . $mac;
	setcookie('rememberme', $cookie);
	$interval = new DateInterval("P1Y");
	setExpire($email, $interval);
}
function rememberMe() {
    $cookie = isset($_COOKIE['rememberme']) ? $_COOKIE['rememberme'] : '';
    if ($cookie) {
        list ($email, $token, $mac) = explode(':', $cookie);
        if (!hash_equals(hash_hmac('sha256', $email . ':' . $token, SECRET_KEY), $mac)) {
            return false;
        }
        $usertoken = getTokenFromDB($email);
        if (hash_equals($usertoken, $token)) {
			setRememberMe($email, $token);
            logUserIn($user);
        }
    }
}

*/

?>