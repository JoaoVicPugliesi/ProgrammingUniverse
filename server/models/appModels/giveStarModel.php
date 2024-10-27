<?php

    class GiveStarModel {
        private $appId;
        private $userId;
        private $pdo;

        public function __construct($appId, $userId, $pdo) {
            $this->appId = $appId;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setGiveStar() {
            $sql = 'INSERT INTO Ratings (app_id, user_id) VALUES (:app_id, :user_id)';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':app_id' => $this->appId,
                ':user_id' => $this->userId
            ]);
        }
    }