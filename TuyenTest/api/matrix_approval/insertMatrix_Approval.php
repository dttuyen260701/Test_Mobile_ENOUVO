<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'POST') {
    http_response_code(400);
    echo "Only Post method is allowed";
    die();
} 

$item = json_decode(file_get_contents("php://input"));

$matrix_1 = array(
  'id_matrix' => $item->id_matrix,
  'id_approval' => $item->id_approval,
);

$array = explode(" ", $matrix_1['id_approval']);

include_once '../../config/Database.php';
include_once '../../models/Matrix_Approval.php';

// Instantiate DB & connect
$database = new Database();
  
$db = $database->connect();
$matrix_Approval = new Matrix_Approval($db);

$done = true;
for ($i = 0; $i < count($array); $i++){

    $result = $matrix_Approval->create($matrix_1['id_matrix'], $array[$i]);

    if ($result) {

    } else {
      	$done = false;
    }
} 

if($done){
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