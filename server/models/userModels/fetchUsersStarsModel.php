<?php

    class FetchUsersStarsModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setUsersStars() {
            $sql = 'SELECT * FROM User ORDER BY total_stars DESC LIMIT 50';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }