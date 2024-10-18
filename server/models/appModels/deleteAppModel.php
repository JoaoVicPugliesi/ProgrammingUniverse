<?php

    class DeleteAppModel {
        private $appId;
        private $appName;
        private $pdo;

        public function __construct($appId, $appName, $pdo) {
            $this->appId = $appId;
            $this->appName = $appName;
            $this->pdo = $pdo;
        }

        public function setDeleteApp() {

            $sql = 'SELECT app_logo, app_name FROM App WHERE app_id = :appId';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':appId', $this->appId, PDO::PARAM_INT);
            $stmt->execute();

            $app = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($app) {

                if(strtolower($app['app_name']) == strtolower($this->appName)) {

                $appLogoFile = $app['app_logo'];
        
                $sql = 'DELETE FROM App WHERE app_id = :appId';
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':appId', $this->appId, PDO::PARAM_INT);
                $success = $stmt->execute();

                if ($success && $appLogoFile) {

                    $uploadsDir = __DIR__ . '/../../controllers/appControllers/uploads/';
                    $filePath = $uploadsDir . $appLogoFile;
                    
                    if (file_exists($filePath)) {
                        if (unlink($filePath)) {
                            error_log("Successfully deleted file: " . $filePath);
                        } else {
                            error_log("Failed to delete file: " . $filePath);
                        }
                    } else {
                        error_log("File does not exist, unable to delete: " . $filePath);
                    }
                }

                return $success;
            } else {
                $_SESSION['error'] = 'The app name does not match';
            }
        }

            return false;
    }
}