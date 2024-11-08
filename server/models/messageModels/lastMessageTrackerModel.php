<?php

    class LastMessageTrackerModel {
        private $messageId;
        private $pdo;

        public function __construct($messageId, $pdo) {
            $this->messageId = $messageId;
            $this->pdo = $pdo;
        }

        public function setLastGroupMessageTracker() {
            $sql = 'SELECT m.message_id
                    FROM Messages m
                    WHERE m.message_id > :message_id
                    AND m.receiver_id IS NULL';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':message_id', $this->messageId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function setLastIndividualMessageTracker($userIdX, $userIdY) {
            $sql = 'SELECT m.message_id
                    FROM Messages m
                    WHERE m.message_id > :message_id
                    AND ((m.user_id = :userIdX AND m.receiver_id = :userIdY)
                    OR (m.user_id = :userIdY AND m.receiver_id = :userIdX))';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':userIdX' => $userIdX,
                ':userIdY' => $userIdY,
                ':message_id' => $this->messageId
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }