<?php

    class ProfileModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setProfiles() {
            $sql = 'SELECT * FROM User ORDER BY user_id DESC LIMIT 5';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }