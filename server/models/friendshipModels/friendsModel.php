<?php

    class FriendsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setFriends() {
            $sql = 'SELECT u.user_id, u.username, u.user_icon, u.is_online
                    FROM Friendships f
                    JOIN User u ON (f.sender_id = u.user_id OR f.receiver_id = u.user_id)
                    WHERE (f.sender_id = :user_id OR f.receiver_id = :user_id)
                    AND (f.request_status = :accepted OR f.request_status = :checked)
                    AND u.user_id != :user_id;';

            $stmt = $this->pdo->prepare($sql);
            $accepted = 'accepted';
            $checked = 'checked';
            $stmt->execute([
                ':user_id' => $this->userId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }