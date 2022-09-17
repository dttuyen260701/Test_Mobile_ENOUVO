<?php
    class Database {
        // DB Params
        private $host = 'localhost';
        private $db_name = 'knwaaxwa_TuyenTestAPI';
        private $username = 'knwaaxwa_TuyenTestAPI';
        private $password = 'TuyenTestAPI';
        private $conn;
    
        // DB Connect
        public function connect() {
          $this->conn = null;
    
          $this->conn = mysqli_connect("$this->host","$this->username","$this->password","$this->db_name") or die("Lỗi kết nối database!");
          mysqli_query($this->conn ,"SET NAMES 'utf8'");
    
          return $this->conn;
        }
    }