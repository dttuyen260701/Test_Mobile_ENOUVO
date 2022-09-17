<?php
class Approval{
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

        $query = "SELECT * FROM tbl_approval WHERE tbl_approval.name LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
  
    public function getByMatrixID($matrix_id)
    {
        $index = ($page - 1) * $step; 

        $query = "SELECT tbl_approval.* FROM tbl_approval INNER JOIN tbl_matrix_approval ON tbl_approval.id = tbl_matrix_approval.id_approval WHERE tbl_matrix_approval.id_matrix =".$matrix_id.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
}
