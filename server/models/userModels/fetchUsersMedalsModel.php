<?php

    class FetchUsersMedalsModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setUsersMedals() {
            $sql = 'SELECT * FROM User ORDER BY medal_count DESC LIMIT 50';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }