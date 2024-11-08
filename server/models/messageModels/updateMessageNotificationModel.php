<?php

    class UpdateMessageNotificationModel {
        private $userIdX;
        private $userIdY;
        private $pdo;

        public function __construct($userIdX, $userIdY, $pdo) {
            $this->userIdX = $userIdX;
            $this->userIdY = $userIdY;
            $this->pdo = $pdo;
        }

        public function setUpdateMessageNotification() {
            $sql = ' UPDATE Messages
                     SET message_status = :seen
                     WHERE user_id = :userIdY
                     AND receiver_id = :userIdX
                     AND message_status != :empty;
            ';
            $stmt = $this->pdo->prepare($sql);
            $seen = 'seen';
            $empty = '';
            return $stmt->execute([
                ':userIdX' => $this->userIdX,
                ':userIdY' => $this->userIdY,
                ':seen' => $seen,
                ':empty' => $empty
            ]);
        }
    }