<?php

    class DeleteProfileModel {
        private $password;
        private $user;
        private $userId;
        private $pdo;

        public function __construct($password, $user, $userId, $pdo) {
            $this->password = $password;
            $this->$user = $user;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setDelete() {
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':user_id', $this->userId, PDO::PARAM_INT);
            $stmt->execute();

            $this->user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($this->user && password_verify($this->password, $this->user['password'])) {
                $sql = 'DELETE FROM User WHERE user_id = :user_id AND password = :pass';
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute([
                    ':user_id' => $this->userId,
                    ':pass' => $this->password
                ]);

                $_SESSION['success'] = "Profile Deleted Successfully";
            } else {
                $_SESSION['error'] = "Invalid Password or User";
            }
        }
    }