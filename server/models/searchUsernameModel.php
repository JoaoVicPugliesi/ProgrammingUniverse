<?php
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    class SearchUsernameModel {
        private $searchedUsername;
        private $pdo;

        public function __construct($searchedUsername, $pdo) {
            $this->searchedUsername = $searchedUsername;
            $this->pdo = $pdo;
        }

        public function searchName () {
            $sql = 'SELECT * FROM User WHERE username = :searchedUsername';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':searchedUsername', $this->searchedUsername, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                $_SESSION['success'] = true;
                $_SESSION['user'] = $user;
            } else {
                $_SESSION['success'] = false;
                $_SESSION['user'] = 'No Users Found';
            }
        }
    }