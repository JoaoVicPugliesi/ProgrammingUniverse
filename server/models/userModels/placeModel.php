<?php

    class PlaceModel {
        private $userId;
        private $userPlace;
        private $pdo;

        public function __construct($userId, $userPlace, $pdo) {
            $this->userId = $userId;
            $this->userPlace = $userPlace;
            $this->pdo = $pdo;
        }

        public function setPlace() {
            $sql = 'UPDATE User SET user_place = :user_place WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            return $stmt->execute([
                ':user_place' => $this->userPlace,
                ':user_id' => $this->userId
            ]);
        }
    }