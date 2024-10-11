<?php

    class DeleteAppModel {
        private $appId;
        private $pdo;

        public function __construct($appId, $pdo) {
            $this->appId = $appId;
            $this->pdo = $pdo;
        }

        public function setDeleteApp() {
            $sql = 'DELETE FROM App WHERE app_id = :appId';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':appId', $this->appId, PDO::PARAM_INT);
            $stmt->execute();
        }
    }