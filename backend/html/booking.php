<?php 
function bookTrip($data){
    $validationResult = validateBooking($data); //TBDeveloped, ger bara true
    if($validationResult === TRUE){
        
        $dbconnection = connectDB();
        
        /* Beräknar antalet säten */
        $trip = $dbconnection -> query("SELECT seatsAvailable, startLocation, destination, startTime
                                                FROM Resa
                                                WHERE tripID = '{$data->tripID}'
                                                ")
                                                ->fetch_assoc();

        if($trip['seatsAvailable'] >= (int)$data->seats){
            $bookingID = createBookingID();
            $userID = findUserIDFromEmail($data->loggedInEmail);
            $availableSeatsAfterBooking = $trip['seatsAvailable']-$data->seats;
            
            /* Skapar den nya bokningen */
            $dbconnection -> query("INSERT INTO Booking (userID, tripID, seats, bookingID, startLocation, destination, startTime) VALUES (
                                    '{$userID}',
                                    '{$data->tripID}',
                                    '{$data->seats}',
                                    '{$bookingID}',
                                    '{$trip['startLocation']}',
                                    '{$trip['destination']}',
                                    '{$trip['startTime']}'
                                    )");

            /* Sätter in bookingID och uppdaterar tillgängliga säten */
            $dbconnection -> query("UPDATE Resa 
                                    SET bookings = CONCAT_WS(',', IFNULL(bookings,''), '{$bookingID}'),
                                        seatsAvailable = '{$availableSeatsAfterBooking}'
                                    WHERE tripID = '{$data->tripID}'
                                    ");

            /* Registrerar bokningen hos användaren */
            $dbconnection -> query("UPDATE Users
                                    SET bookings = CONCAT_WS(',', IFNULL(bookings,''), '{$bookingID}')
                                    WHERE userID = '{$userID}'
                                    ");

            disconnectDB($dbconnection);
            http_response_code(201);
            return($bookingID);
        }
        else{
            http_response_code(400);
            return ("Not enough seats available.");
        }
    }
    else{
        http_response_code(400);
        //return $validationResult;
        return("Your data is such and such broken in such and such way");
    }
}

function deleteBooking($bookingID){
    $dbconnection = connectDB();
    $booking = $dbconnection -> query("SELECT * FROM Booking WHERE bookingID = '{$bookingID}'") -> fetch_assoc();
    $trimData = "," . $booking['bookingID'];
        
    /* Tar bort bokningen från användaren */
    $dbconnection -> query("UPDATE Users
            SET bookings = TRIM('{$trimData}' FROM bookings) 
            WHERE userID = '{$booking['userID']}'
    ");
    
    /* Tar bort bokningen från resan */
    /* Ökar antalet säten */
    $dbconnection -> query("UPDATE Resa
            SET bookings  = TRIM('{$trimData}' FROM bookings),
                seatsAvailable = seatsAvailable + '{$booking['seats']}'
            WHERE tripID = '{$booking['tripID']}'
    ");

    /* Tar bort själva bokningen */
    $dbconnection->query("DELETE FROM Booking WHERE bookingID = '{$bookingID}'");
    disconnectDB($dbconnection);
    return ("Succé!");
}

/* Den här funktionen kanske borde ligga i User-filen istället? */
/* Variabelnamnen är jättefina och ska så förbli. */
function getAllBookingsFromUser($userID){
    $fulsträng = queryDB("SELECT bookings FROM Users WHERE userID = '{$userID}'") -> fetch_assoc()['bookings'];
    $finarray['bookings'] = str_getcsv($fulsträng);
    array_shift($finarray['bookings']); 
    $dbconnection = connectDB();
    $maffigArray = array();
    for($i = 0; $i<count($finarray['bookings']); $i++){
        $maffigArray[$i] = $dbconnection -> query("SELECT * FROM Booking WHERE bookingID='" . $finarray['bookings'][$i] . "';") -> fetch_assoc();
    }
    logga($maffigArray);
    disconnectDB($dbconnection);
    return $maffigArray;
}

function createBookingID(){
	return (uniqid('booking-', true));
}

function getBooking($bookingID){
    return queryDB("SELECT * FROM Booking WHERE bookingID='{$bookingID}'");
}
?>
