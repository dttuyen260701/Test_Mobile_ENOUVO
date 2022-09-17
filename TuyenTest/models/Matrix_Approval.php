<?php
class Matrix_Approval{
    private $conn;

    public function __construct($db){
        $this->conn = $db;
    }

    public function cleanText($text)
    {
        return htmlspecialchars(strip_tags($text));
    }

    public function getByPage($matrix_id)
    {
        $index = ($page - 1) * $step; 

        $query = "SELECT * FROM tbl_matrix WHERE tbl_matrix.alias LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
  
  	public function create($id_matrix, $id_approval)
    {
        $query = "INSERT INTO `tbl_matrix_approval` (`id_matrix`, `id_approval`) VALUES ('".$id_matrix."', '".$id_approval."');";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
}
