<?php

    class NoneModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setNone() {
            $sql = 'UPDATE Friendships
                    SET request_status = :request_status
                    WHERE ((sender_id = :sender_id AND receiver_id = :receiver_id)
                    OR (sender_id = :receiver_id AND receiver_id = :sender_id))
                    AND request_status = :declined';
            $stmt = $this->pdo->prepare($sql);
            $none = 'none';
            $declined = 'declined';
            return $stmt->execute([
                        ':sender_id' => $this->senderId,
                        ':receiver_id' => $this->receiverId,
                        ':request_status' => $none,
                        ':declined' => $declined
                    ]);
        }
    }