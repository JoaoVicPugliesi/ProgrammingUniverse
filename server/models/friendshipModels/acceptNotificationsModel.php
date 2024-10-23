<?php

    class AcceptNotificationsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setAcceptNotifications() {
            $sql = 'SELECT f.sender_id, u.username AS sender_username, u.user_icon AS sender_icon,
                    f.receiver_id, u2.username AS receiver_username, u2.user_icon AS receiver_icon
                    FROM Friendships f
                    JOIN User u ON f.sender_id = u.user_id
                    JOIN User u2 ON f.receiver_id = u2.user_id
                    WHERE (f.receiver_id = :user_id OR f.sender_id = :user_id)
                    AND f.request_status = :request_status';

            $stmt = $this->pdo->prepare($sql);
            $status = 'accepted';
            $stmt->execute([':user_id' => $this->userId, ':request_status' => $status]);

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }