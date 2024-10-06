<?php 

    class LogoutModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setLogout() {
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':user_id', $this->userId, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                $sql = 'UPDATE User SET is_online = 0 WHERE user_id = :user_id';
                $stmt = $this->pdo->prepare($sql);
                $stmt->bindParam(':user_id', $this->userId, PDO::PARAM_INT);
                return $stmt->execute();
            }
        }
    }