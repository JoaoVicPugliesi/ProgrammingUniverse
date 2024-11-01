<?php

    class AcceptModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setAccept() {
            $sql = 'UPDATE Friendships
                    SET request_status = :request_status
                    WHERE sender_id = :sender_id
                    AND receiver_id = :receiver_id
                    AND request_status NOT IN (:declined, :norelation)';
            $stmt = $this->pdo->prepare($sql);
            $status = 'accepted';
            $declined = 'declined';
            $none = 'none';
            return $stmt->execute([
                ':request_status' => $status,
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
                ':declined' => $declined,
                ':norelation' => $none
            ]);
        }
    }