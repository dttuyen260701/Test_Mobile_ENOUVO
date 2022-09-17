<?php
class Matrix{
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    public function cleanText($text)
    {
        return htmlspecialchars(strip_tags($text));
    }

    public function getByPage($page, $step, $search_txt)
    {
        $index = ($page - 1) * $step; 

        $query = "SELECT * FROM tbl_matrix WHERE tbl_matrix.alias LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
  
  	public function getByFeatureID($page, $step, $search_txt, $feature_id)
    {
        $index = ($page - 1) * $step; 
      	$array = explode(" ", $feature_id);
      	$str_feature = "";
      	for ($i = 0; $i < count($array) - 1; $i++){
            if($i == 0){
              $str_feature = $str_feature."tbl_matrix.feature_id = ".$array[$i];
            } else { 
                $str_feature = $str_feature." OR tbl_matrix.feature_id = ".$array[$i];
            }
            if($i == count($array) - 2){
              $str_feature = $str_feature." AND";
            }
        } 

        $query = "SELECT * FROM tbl_matrix WHERE ".$str_feature." tbl_matrix.alias LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
  
  	public function create($matrix)
    {
        $query_MaxID = "SELECT MAX(id) FROM tbl_matrix";
      	$query_rs_MaxID = mysqli_query($this->conn, $query_MaxID);
        $result1 = mysqli_fetch_assoc($query_rs_MaxID);
        $result['Next_ID'] = $result1['MAX(id)'] + 1;

        $query = "INSERT INTO `tbl_matrix` (`id`, `alias`, `min_Range`, `max_Range`, `feature_id`) VALUES (".$result['Next_ID'].", '".$matrix['alias']."', '".$matrix['min_Range']."', '".$matrix['max_Range']."', '".$matrix['feature_id']."');";
        $query_rs = mysqli_query($this->conn, $query);
		if($query_rs) {
          return $result['Next_ID'];
        } else {
          return -1;
        }
    }
  
  	public function update($matrix)
    {
      	$query = "UPDATE `tbl_matrix` SET `alias`='".$matrix['alias']."',`min_Range`='".$matrix['min_Range']."',`max_Range`='".$matrix['max_Range']."',`feature_id`='".$matrix['feature_id']."' WHERE tbl_matrix.id = ".$matrix['id'].";";
        $query_rs = mysqli_query($this->conn, $query);
      
		return $query_rs;
    }
  
  	public function delete($id_matrix)
    {
      	$query = "DELETE FROM `tbl_matrix` WHERE tbl_matrix.id = ".$id_matrix.";";
        $query_rs = mysqli_query($this->conn, $query);
      
		return $query_rs;
    }
}
