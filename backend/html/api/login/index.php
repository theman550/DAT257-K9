
<html>  
<body>
<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	//include(ABS_PATH . "/api.php");
	include(ABS_PATH . "/agilecourse/api.php");


/*	 if (session_status() == PHP_SESSION_NONE)
		session_start();
	 if(isset($_SESSION['loggedin']))
		{
			echo 'logged in from session';
		}*/
	 
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		header('Access-Control-Allow-Origin: http://localhost:3000');
		header('Content-Type: application/json');
		header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
		header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
		header('Access-Control-Max-Age: 1000');	
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$data = json_decode(file_get_contents("php://input", true));
		$email = "";
		$password = "";
		if(isset($data->email) && isset($data->password)) // om datan skickas i json, annars felmeddelande
		{
			$email = $data->email;
			$password = $data->password;
		}
		else // förutsätter att vanlig post används om datan inte skickats i JSON format
		{
			$email = $_POST['email'];
			$password = $_POST['password'];
		}
		$token = tryLogin($email, $password);
		// echo json_encode($token);
	}
	else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
		logout();
	}

?>

<form action="" method="post">
Name: <input type="text" name="password"><br>
E-mail: <input type="text" name="email"><br>
<input type="submit">
</form>

</body>
</html>

