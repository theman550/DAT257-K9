<?php

	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	//include(ABS_PATH . "/DAT257-K9/backend/html/api.php");
	include(ABS_PATH . "/api.php");
	//include(ABS_PATH . "/agilecourse/api.php");

	/* include(dirname(__FILE__) . "\api.php");
	include(dirname(__FILE__) . "\debug.php");
	 */
	 headers();
	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
		headers();
	}

	else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		$data = json_decode(file_get_contents("php://input", true));
		if(isset($data->loggedInEmail) && isset($data->token))
		{		
			if(verifyToken($data->loggedInEmail, $data->token) && !hasTokenExpired($data->loggedInEmail))
			{	
				logout($data->loggedInEmail, $data->token);
			}
		}
	}

?>