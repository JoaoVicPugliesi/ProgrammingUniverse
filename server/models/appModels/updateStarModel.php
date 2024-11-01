<?php

    class UpdateStarModel {
        private $appId;
        private $userId;
        private $pdo;

        public function __construct($appId, $userId, $pdo) {
            $this->appId = $appId;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUpdateStar() {

            $sql = 'UPDATE Ratings
                    SET rating_status = :rating_status
                    WHERE app_id = :app_id AND user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $ratingStatus = 'seen';
            
            return $stmt->execute([
                ':rating_status' => $ratingStatus,
                ':app_id' => $this->appId,
                ':user_id' => $this->userId
            ]);
        }
    }