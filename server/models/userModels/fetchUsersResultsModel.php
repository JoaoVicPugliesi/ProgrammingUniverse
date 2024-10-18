<?php

    class FetchUsersResultsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUsersResults() {
            $sql = 'SELECT * FROM User WHERE user_id != :user_id ORDER BY RAND() LIMIT 50';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':user_id' => $this->userId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }