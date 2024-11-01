<?php

    class LastMessageTrackerModel {
        private $messageId;
        private $pdo;

        public function __construct($messageId, $pdo) {
            $this->messageId = $messageId;
            $this->pdo = $pdo;
        }

        public function setLastMessageTracker() {
            $sql = 'SELECT m.message_id
                    FROM Messages m
                    WHERE m.message_id > :message_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':message_id', $this->messageId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }