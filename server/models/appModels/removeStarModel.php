<?php

    class RemoveStarModel {
        private $appId;
        private $userId;
        private $pdo;

        public function __construct($appId, $userId, $pdo) {
            $this->appId = $appId;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setRemoveStar() {
            $sql = 'DELETE FROM Ratings WHERE app_id = :app_id AND user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':app_id' => $this->appId,
                ':user_id' => $this->userId
            ]);
        }
    }