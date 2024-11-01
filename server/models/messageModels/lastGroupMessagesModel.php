<?php

    class LastGroupMessagesModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setLastGroupMessages() {
            $sql = 'SELECT m.*, u.username, u.user_icon, u.is_online
                    FROM Messages m
                    JOIN User u ON m.user_id = u.user_id
                    ORDER BY m.message_id DESC LIMIT 4';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function setLatestGroupMessage() {
            $sql = 'SELECT m.*, u.username, u.user_icon, u.is_online
                    FROM Messages m
                    JOIN User u WHERE m.user_id = u.user_id
                    ORDER BY m.message_id DESC LIMIT 1';
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function setGroupMessages() {
            $sql = ' SELECT m.*, u.username, u.user_icon, u.is_online
                     FROM Messages m
                     JOIN User u ON m.user_id = u.user_id
                     ORDER BY m.message_id ASC';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }
