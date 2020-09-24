<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
include(dirname(dirname(__FILE__)) . "/api.php");
if ($_SERVER['REQUEST_METHOD'] === 'GET') 
{
	$result = readTrips();
	if(mysqli_num_rows($result) > 0)
	{
		$post_arr = array();
		$post_arr['trips'] = array();

		while($row = mysqli_fetch_assoc($result))
		{
			$post_item = array(
			'startLocation' => $row['startLocation'],
			'destination'   => $row['destination'],
			'price'         => $row['price'],
			'tripID'        => $row['tripID'],
			'startTime'     => $row['startTime'],
			'seatsAvailable' => $row['seatsAvailable'],
			'description'   => $row['description'],
			'userID'        => $row['userID']
			);
			array_push($post_arr['trips'], $post_item);
		}
		echo json_encode($post_arr);
	}
}
else if($_SERVER['REQUEST_METHOD'] === 'POST')
{
	$data = json_decode(file_get_contents("php://input", true));
	$tripID = "error";
	if(!empty($data))
	{
		$test = $data->startLocation;
		$tripID = writeTrip($data->startLocation, $data->destination, $data->startTime, $data->price, $data->seatsAvailable, $data->description, $data->userID);
	}
	echo json_encode(
	array('message' => $tripID));
}
?>