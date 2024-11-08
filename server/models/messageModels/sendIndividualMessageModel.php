<?php

    class SendIndividualMessageModel {
        private $userId;
        private $message;
        private $messageImage;
        private $receiverId;
        private $pdo;

        public function __construct($userId, $message, $messageImage, $receiverId, $pdo) {
            $this->userId = $userId;
            $this->receiverId = $receiverId;
            $this->message = $message;
            $this->messageImage = $messageImage;
            $this->pdo = $pdo;
        }

        public function setSendIndividualMessage() {
            $sql = 'INSERT INTO Messages (user_id, message, message_image, receiver_id)
                    VALUES (:user_id, :message, :message_image, :receiver_id)';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':user_id' => $this->userId,
                ':message' => $this->message,
                ':message_image' => $this->messageImage,
                ':receiver_id' => $this->receiverId
            ]);
        }
    }