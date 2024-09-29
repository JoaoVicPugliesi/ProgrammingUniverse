<?php

    class ProfileModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setProfile() {
            $stmt = $this->pdo->query('SELECT * FROM User ORDER BY user_id DESC LIMIT 5');
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $_SESSION["user"] = $users;
            $_SESSION["user_id"] = $users['user_id'];
        }
    }