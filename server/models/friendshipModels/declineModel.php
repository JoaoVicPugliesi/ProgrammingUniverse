<?php

    class DeclineModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setDecline() {
            $sql = 'UPDATE Friendships
                    SET request_status = :request_status
                    WHERE sender_id = :sender_id
                    AND receiver_id = :receiver_id
                    AND request_status = :pending';
            $stmt = $this->pdo->prepare($sql);
            $status = 'declined';
            $pending = 'pending';
            return $stmt->execute([
                ':request_status' => $status,
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
                ':pending' => $pending
            ]);
        }
    }