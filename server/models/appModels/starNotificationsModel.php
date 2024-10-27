<?php

    class StarNotificationsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setStarNotifications() {
            $sql = 'SELECT r.app_id,
                           r.user_id AS rater_user_id,
                           p.app_id,
                           p.app_logo,
                           p.app_name,
                           u.username
                    FROM Ratings r
                    JOIN App p ON r.app_id = p.app_id
                    JOIN User u ON r.user_id = u.user_id
                    WHERE p.user_id = :user_id
                    AND r.rating_status = :rating_status
                    ';
            $stmt = $this->pdo->prepare($sql);
            $ratingStatus = 'given';
            $stmt->execute([
                ':user_id' => $this->userId,
                ':rating_status' => $ratingStatus
            ]);

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }