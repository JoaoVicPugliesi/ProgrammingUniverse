<?php

    class CheckModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setCheck() {
            $sql = 'UPDATE Friendships
                    SET request_status = :checked
                    WHERE ((sender_id = :sender_id AND receiver_id = :receiver_id)
                    OR (sender_id = :receiver_id AND receiver_id = :sender_id))
                    AND request_status = :accepted';
                    
            $stmt = $this->pdo->prepare($sql);
            $checked = 'checked';
            $accepted = 'accepted';
            return $stmt->execute([
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);
        }
    }