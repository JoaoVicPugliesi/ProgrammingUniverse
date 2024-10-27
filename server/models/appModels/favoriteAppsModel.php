<?php

    class FavoriteAppsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setFavoriteApps() {
            $sql = ' SELECT p.*
                     FROM App p
                     JOIN Ratings r ON p.app_id = r.app_id
                     WHERE r.user_id = :user_id
                     ORDER BY p.stars_count
                     DESC LIMIT 5
            ';

            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':user_id', $this->userId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }