<?php
    class SearchUserModel {
        private $searchedUser;
        private $pdo;

        public function __construct($searchedUser, $pdo) {
            $this->searchedUser = $searchedUser;
            $this->pdo = $pdo;
        }

        public function searchName () {
            $sql = 'SELECT * FROM User WHERE username LIKE :searchedUsername LIMIT 5';
            $stmt = $this->pdo->prepare($sql);
            $searchTerm = '%' . $this->searchedUser . '%';
            $stmt->bindParam(':searchedUsername', $searchTerm, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }