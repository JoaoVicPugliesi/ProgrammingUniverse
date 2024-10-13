<?php

    class FetchUserAppsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUserApps() {
            $sql = 'SELECT * FROM App WHERE user_id = :user_id ORDER BY app_id ASC LIMIT 10';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':user_id' => $this->userId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }