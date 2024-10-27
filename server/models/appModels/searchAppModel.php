<?php

    class SearchAppModel {
        private $userId;
        private $searchedApp;
        private $pdo;

        public function __construct($userId, $searchedApp, $pdo) {
            $this->userId = $userId;
            $this->searchedApp = $searchedApp;
            $this->pdo = $pdo;
        }

        public function setSearchApp() {
            $sql = ' SELECT p.*
                     FROM App p
                     JOIN User u ON p.user_id = u.user_id
                     WHERE p.user_id != :user_id
                     AND p.app_visibility = :app_visibility
                     AND p.app_name LIKE :searchedApp
            ';

            $stmt = $this->pdo->prepare($sql);
            $searchTerm = '%' . $this->searchedApp . '%';
            $appVisibility = 'public';
            $stmt->execute([
                ':searchedApp' => $searchTerm,
                ':user_id' => $this->userId,
                ':app_visibility' => $appVisibility
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
}