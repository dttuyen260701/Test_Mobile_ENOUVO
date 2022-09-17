<?php
class Feature{
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

        $query = "SELECT * FROM tbl_feature WHERE tbl_feature.name LIKE '%".$search_txt."%' ORDER BY id DESC LIMIT ".$index.", ".$step.";";
        $query_rs = mysqli_query($this->conn, $query);

        return $query_rs;
    }
}
