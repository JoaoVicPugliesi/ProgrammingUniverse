<?php

    class GroupMessagesModel {
        private $pdo;


        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setGroupMessages() {
            $sql = 'SELECT u.*, m.message, m.sent_at
                FROM User u
                JOIN Messages m ON u.user_id = m.user_id
                ORDER BY m.sent_at ASC';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }