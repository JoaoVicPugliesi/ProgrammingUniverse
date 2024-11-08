<?php

    class LanguageModel {
        private $userId;
        private $language;
        private $pdo;

        public function __construct($userId, $language, $pdo) {
            $this->userId = $userId;
            $this->language = $language;
            $this->pdo = $pdo;
        }

        public function setLanguage() {
            $sql = ' UPDATE User
                     SET user_language = :user_language
                     WHERE user_id = :user_id;
            ';

            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':user_id' => $this->userId,
                ':user_language' => $this->language
            ]);
        }
    }