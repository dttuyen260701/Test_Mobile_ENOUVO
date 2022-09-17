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
$feature_id = isset($_GET['feature_id']) ? $_GET['feature_id'] : die();
$search_txt = isset($_GET['search_txt']) ? $_GET['search_txt'] : '';

include_once '../../config/Database.php';
include_once '../../models/Matrix.php';
include_once '../../models/Approval.php';

// Instantiate DB & connect
$database = new Database();
  
$db = $database->connect();
$matrix = new Matrix($db);
$approval = new Approval($db);

$result = $matrix->getByFeatureID($page, $step, $search_txt, $feature_id);

if ($result) {
    $obj_arr['data'] = array();

    while($row = mysqli_fetch_assoc($result)) {
		$result_oppraval = $approval->getByMatrixID($row['id']);
        $obj_arr_opp['data'] = array();

        while($row_1 = mysqli_fetch_assoc($result_oppraval)) {

            $obj_item1 = array(
                'id' => $row_1['id'],
                'name' => $row_1['name'],
            );

            array_push($obj_arr_opp['data'], $obj_item1);
        }
        $obj_item = array(
            'id' => $row['id'],
            'alias' => $row['alias'],
            'min_Range' => $row['min_Range'],
            'max_Range' => $row['max_Range'],
            'feature_id' => $row['feature_id'],
          	'approvals' => $obj_arr_opp['data']
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