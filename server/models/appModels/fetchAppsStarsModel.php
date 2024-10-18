<?php

    class FetchAppsStarsModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setAppsStars() {
            $sql = 'SELECT * FROM App WHERE app_visibility = :app_visibility ORDER BY stars_count DESC LIMIT 50';
            $stmt = $this->pdo->prepare($sql);
            $public = 'public';
            $stmt->bindParam(':app_visibility', $public, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }