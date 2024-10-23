<?php

    class DeclineNotificationsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setDeclineNotifications() {
            $sql = 'SELECT f.receiver_id, u.username, u.user_icon
                    FROM Friendships f
                    JOIN User u on f.receiver_id = u.user_id
                    WHERE f.sender_id = :user_id AND f.request_status = :request_status';

            $stmt = $this->pdo->prepare($sql);
            $status = 'declined';
            $stmt->execute([':user_id' => $this->userId, ':request_status' => $status]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }