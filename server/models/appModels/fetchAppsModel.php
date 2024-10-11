<?php

    class FetchAppsModel {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function setApps() {
            $sql = 'SELECT * FROM App WHERE LOWER(app_visibility) = LOWER(:app_visibility) ORDER BY app_id DESC LIMIT 5';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':app_visibility', 'public', PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }