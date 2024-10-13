<?php

    class NewAppInputController {
        private $appName;
        private $appDescription;
        private $appURL;
        private $pdo;

        public function __construct($appName, $appDescription, $appURL, $pdo) {
            $this->appName = $appName;
            $this->appDescription = $appDescription;
            $this->appURL = $appURL;
            $this->pdo = $pdo;
        }

        public function setError($error) {
            return $_SESSION['error'] = $error;
         }

        public function alreadyTaken() {

            $sql = 'SELECT * FROM App WHERE LOWER(app_url) = LOWER(:app_url)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':app_url', $this->appURL);
            $stmt->execute();
            $app = $stmt->fetch(PDO::FETCH_ASSOC);

            if($app) {
                $this->setError('The URL Is Already Taken');
                return false;
            }
            
            return true;
        }

        public function appName() {
            if(strlen($this->appName) > 50) {
                $this->setError('Please, the app cannot exceed 50 characters');
                return false;
            }

            if(!preg_match("/^[a-zA-Z0-9^~´]+$/i", $this->appName)) {
                $this->setError("App name must contain only letters, numbers and no empty spaces");
                return false;
            }

            return true;
        }

        public function appDescription() {
            if(strlen($this->appDescription) > 255) {
                $this->setError('The App description cannot exceed 255 characters');
                return false;
            }

            if (!preg_match("/^[a-zA-Z0-9\s.,!?'^~\"´áéíóúãõâêîôûçÇ]*$/", $this->appDescription)) {
                $this->setError("Description can only contain letters, numbers, spaces, and basic punctuation.");
                return false;
            }

            if (stripos($this->appDescription, '<script>') !== false) {
                $this->setError("Description contains invalid content.");
                return false;
            }

            return true;
        }

        public function appUrl() {
           if(!filter_var($this->appURL, FILTER_VALIDATE_URL)) {
                $this->setError('Invalid URL');
                return false;
           }
           return true;
        }

        public function appLogo() {

            if ($_FILES['appLogo']['error'] !== UPLOAD_ERR_OK) {
                $this->setError('Upload error: ' . $_FILES['appLogo']['error']);
                return false;
            }

            if ($_FILES['appLogo']["size"] > 5000000) {
                $this->setError("Sorry. Your File is Too Large");
                return false;
            }
        
            $fileExtension = strtolower(pathinfo($_FILES['appLogo']['name'], PATHINFO_EXTENSION));
            if ($fileExtension !== 'png') {
                $this->setError('Invalid File Type. Only PNG Files Are Allowed');
                return false;
            }
        
            $uploadsDir = __DIR__ . '/uploads/';
            
            if (!is_dir($uploadsDir)) {
                mkdir($uploadsDir, 0755, true);
            }
        
            $newFileName = uniqid() . '.' . $fileExtension;
            $destinationPath = $uploadsDir . $newFileName;

            error_log("Moving to: " . $destinationPath);
        
            if (file_exists($destinationPath)) {
                $this->setError('The File Already Exists');
                return false;
            }
        
            if (!move_uploaded_file($_FILES['appLogo']['tmp_name'], $destinationPath)) {
                $errorDetails = error_get_last();
                error_log("Move Uploaded File Error: " . print_r($errorDetails, true));
                $this->setError("There was an error uploading the file: " . $errorDetails['message']);
                return false;
            }
        
            return $newFileName;
        }
    }

