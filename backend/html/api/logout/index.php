<?php
	define("ABS_PATH", $_SERVER['DOCUMENT_ROOT']);
	include(ABS_PATH . "/api.php");

	headers();

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	headers();
}

else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$data = json_decode(file_get_contents("php://input", true));
	logout($data->loggedInEmail, $data->token);
	http_response_code(201);
}
else{
	http_response_code(405);
}
?>