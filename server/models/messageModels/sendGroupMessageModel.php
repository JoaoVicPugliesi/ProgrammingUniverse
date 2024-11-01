<?php

    class SendGroupMessageModel {
        private $userId;
        private $message;
        private $messageImg;
        private $pdo;

        public function __construct($userId, $message, $messageImg, $pdo) {
            $this->userId = $userId;
            $this->message = $message;
            $this->messageImg = $messageImg;
            $this->pdo = $pdo;
        }

        public function setSendGroupMessage() {
            $sql = 'INSERT INTO Messages (user_id, message, message_image) VALUES (:user_id, :message, :message_image)';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':user_id' => $this->userId,
                ':message' => $this->message,
                ':message_image' => $this->messageImg
            ]);
        }

    }