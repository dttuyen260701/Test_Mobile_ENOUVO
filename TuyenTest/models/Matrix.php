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
      	for ($i = 0; $i < count($array); $i++){
            if($i == 0){
              $str_feature = $str_feature."tbl_matrix.feature_id = ".$array[$i];
            } else { 
              if($i == count($array) - 1){
                $str_feature = $str_feature." AND";
              } else {
                $str_feature = $str_feature." OR tbl_matrix.feature_id = ".$array[$i];
              }
            }
        } 

        $query = "SELECT * FROM tbl_matrix WHERE ".$str_feature." tbl_matrix.alias LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
  
  	public function insertMatrix($page, $step, $search_txt)
    {
        $index = ($page - 1) * $step; 

        $query = "INSERT INTO `tbl_matrix` (`id`, `alias`, `min_Range`, `max_Range`, `feature_id`) VALUES (NULL, 'Transfer Add', '1000', '10000', '3');";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
}
