<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'DELETE') {
    http_response_code(400);
    echo "Only DELETE method is allowed";
    die();
} 

$id_matrix = json_decode(file_get_contents("php://input"));

include_once '../../config/Database.php';
include_once '../../models/Matrix_Approval.php';

// Instantiate DB & connect
$database = new Database();
  
$db = $database->connect();
$matrix = new Matrix_Approval($db);

$result = $matrix->delete($id_matrix->id_matrix);

if ($result) {
    $obj_arr['data'] =  array('value' => true);

    echo json_encode($obj_arr);

} else {
    echo json_encode(
      array(
        'message' => 'Something wrong'
      )  
    );
}

?>