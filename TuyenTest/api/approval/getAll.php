<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$requestMethod = $_SERVER["REQUEST_METHOD"]; 
if ($requestMethod !== 'GET') {
    http_response_code(400);
    echo "Only GET method is allowed";
    die();
} 

$page = isset($_GET['page']) ? $_GET['page'] : die();
$step = isset($_GET['step']) ? $_GET['step'] : die();
$search_txt = isset($_GET['search_txt']) ? $_GET['search_txt'] : '';

include_once '../../config/Database.php';
include_once '../../models/Approval.php';

// Instantiate DB & connect
$database = new Database();
  
$db = $database->connect();
$approval = new Approval($db);

$result = $approval->getByPage($page, $step, $search_txt);

if ($result) {
    $obj_arr['data'] = array();

    while($row = mysqli_fetch_assoc($result)) {

        $obj_item = array(
            'id' => $row['id'],
            'name' => $row['name'],
        );

        array_push($obj_arr['data'], $obj_item);
    }

    echo json_encode($obj_arr);

} else {
    echo json_encode(
      array(
        'message' => 'No feature Found'
      )  
    );
}

?>