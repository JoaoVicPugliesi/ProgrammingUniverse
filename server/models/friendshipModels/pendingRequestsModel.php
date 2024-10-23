<?php

    class PendingRequestsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setPendingRequests() {
            $sql = 'SELECT f.sender_id, u.username, u.user_icon
                    FROM Friendships f
                    JOIN User u ON f.sender_id = u.user_id
                    WHERE f.receiver_id = :userId AND f.request_status = :request_status';

            $stmt = $this->pdo->prepare($sql);
            $status = 'pending';
            $stmt->execute([':userId' => $this->userId, ':request_status' => $status]);

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }