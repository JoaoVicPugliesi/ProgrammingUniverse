<?php

    class DeleteAppModel {
        private $appId;
        private $pdo;

        public function __construct($appId, $pdo) {
            $this->appId = $appId;
            $this->pdo = $pdo;
        }

        public function setDeleteApp() {

            $sql = 'SELECT app_logo FROM App WHERE app_id = :appId';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':appId', $this->appId, PDO::PARAM_INT);
            $stmt->execute();

            $app = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($app) {
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
            }

            return false;
        }
}