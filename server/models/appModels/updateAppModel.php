<?php

    class NewAppModel {
        private $appName;
        private $appLink;
        private $appLogo;
        private $pdo;

        public function __construct($appName, $appLink, $appLogo, $appCreation, $userId, $pdo) {
            $this->appName = $appName;
            $this->appLink = $appLink;
            $this->appLogo = $appLogo;
            $this->appCreation = $appCreation;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setApp() {
            $sql = 'INSERT INTO App (app_name, app_link, app_logo, app_creation, user_id) VALUES (:app_name, :app_link, :app_logo, :app_creation, :user_id)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':app_name' => $this->appName,
                ':app_link' => $this->appLink,
                ':app_logo' => $this->appLogo,
                ':app_creation' => $this->appCreation,
                ':user_id' => $this->userId,
            ]);
        }
    }