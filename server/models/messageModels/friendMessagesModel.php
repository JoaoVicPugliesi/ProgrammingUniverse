<?php

    class FriendMessagesModel {
        private $userIdX;
        private $userIdY;
        private $pdo;

        public function __construct($userIdX, $userIdY, $pdo) {
            $this->userIdX = $userIdX;
            $this->userIdY = $userIdY;
            $this->pdo = $pdo;
        }

        public function setFriendMessages() {
            $sql = 'SELECT m.*, u.username, u.is_online, u.user_icon, u.user_id
                    FROM Messages m
                    JOIN User u ON m.user_id = u.user_id
                    WHERE (m.user_id = :userIdX AND m.receiver_id = :userIdY)
                    OR (m.user_id = :userIdY AND m.receiver_id = :userIdX)
                    ORDER BY m.message_id ASC;
            ';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':userIdX' => $this->userIdX,
                ':userIdY' => $this->userIdY
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }