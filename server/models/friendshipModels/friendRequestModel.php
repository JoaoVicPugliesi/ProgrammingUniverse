<?php

    class FriendRequestModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setFriendRequest() {
            $sql = 'INSERT INTO Friendships (sender_id, receiver_id, request_status) VALUES (:sender_id, :receiver_id, :request_status)';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
                ':request_status' => 'pending'
            ]);
        }
    }