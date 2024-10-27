<?php

    class UpdateAppModel {
        private $appId;
        private $appName;
        private $appDescription;
        private $appURL;
        private $appLogo;
        private $pdo;

        public function __construct($appId, $appName, $appDescription, $appURL, $appLogo, $pdo) {
            $this->appId = $appId;
            $this->appName = $appName;
            $this->appDescription = $appDescription;
            $this->appURL = $appURL;
            $this->appLogo = $appLogo;
            $this->pdo = $pdo;
        }

        public function setUpdateApp() {
            $sql = 'UPDATE App
                    SET app_name = :app_name, app_description = :app_description, app_url = :app_url, app_logo = :app_logo
                    WHERE app_id = :app_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':app_id' => $this->appId,
                ':app_name' => $this->appName,
                ':app_description' => $this->appDescription,
                ':app_url' => $this->appURL,
                ':app_logo' => $this->appLogo,
            ]);
        }
    }