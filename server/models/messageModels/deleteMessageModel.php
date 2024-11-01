<?php

    class DeleteMessageModel {
        private $messageId;
        private $pdo;
        
        public function __construct($messageId, $pdo) {
            $this->messageId = $messageId;
            $this->pdo = $pdo;
        }

        public function setDeleteMessage() {
            $sql = 'DELETE FROM Messages WHERE message_id = :message_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':message_id', $this->messageId, PDO::PARAM_INT);
            return $stmt->execute();
        }
    }