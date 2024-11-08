<?php

    class FriendNotificationsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setFriendNotifications() {
            $sql = ' SELECT m.*, u.user_id, u.username, u.user_icon
                     FROM Messages m
                     JOIN User u ON m.user_id = u.user_id
                     WHERE m.receiver_id = :receiver_id
                     AND message_status = :sent;
                     ORDER BY m.sent_at DESC;
                ';
            $stmt = $this->pdo->prepare($sql);
            $sent = 'sent';
            $stmt->execute([
                ':receiver_id' => $this->userId,
                ':sent' => $sent
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }