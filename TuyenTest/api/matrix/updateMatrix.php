<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'PUT') {
    http_response_code(400);
    echo "Only Post method is allowed";
    die();
} 

$matrix_rs = json_decode(file_get_contents("php://input"));

$matrix_1 = array(
  'id' => $matrix_rs->id,
  'alias' => $matrix_rs->alias,
  'min_Range' => $matrix_rs->min_Range,
  'max_Range' => $matrix_rs->max_Range,
  'feature_id' => $matrix_rs->feature_id
);

include_once '../../config/Database.php';
include_once '../../models/Matrix.php';

// Instantiate DB & connect
$database = new Database();
  
$db = $database->connect();
$matrix = new Matrix($db);

$result = $matrix->update($matrix_1);

$obj_arr['data'] =  array('value' => $result);

echo json_encode($obj_arr);

?>