<?php

    class OpenAppModel {
        private $appId;
        private $pdo;

        public function __construct($appId, $pdo) {
            $this->appId = $appId;
            $this->pdo = $pdo;
        }

        public function setApp() {
            $sql = 'SELECT * FROM App WHERE app_id = :app_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':app_id', $this->appId, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }