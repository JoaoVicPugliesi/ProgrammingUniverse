<?php

    class NewAppModel {
        private $userId;
        private $appName;
        private $appAuthor;
        private $appDescription;
        private $appLogo;
        private $appVisibility;
        private $appURL;
        private $pdo;

        public function __construct($userId, $appName, $appAuthor, $appDescription, $appLogo, $appVisibility, $appURL, $pdo) {
            $this->userId = $userId;
            $this->appName = $appName;
            $this->appAuthor = $appAuthor;
            $this->appDescription = $appDescription;
            $this->appLogo = $appLogo;
            $this->appVisibility = $appVisibility;
            $this->appURL = $appURL;
            $this->pdo = $pdo;
        }

        public function setApp() {
            $sql = 'INSERT INTO App (user_id, app_name, app_author, app_description, app_logo, app_visibility, app_url) VALUES (:user_id, :app_name, :app_author, :app_description, :app_logo, :app_visibility, :app_url)';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':user_id' => $this->userId,
                ':app_name' => $this->appName,
                ':app_author' => $this->appAuthor,
                ':app_description' => $this->appDescription,
                ':app_logo' => $this->appLogo,
                ':app_visibility' => $this->appVisibility,
                ':app_url' => $this->appURL,
            ]);
        }
    }