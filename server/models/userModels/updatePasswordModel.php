<?php

    class UpdatePasswordModel {
        private $userId;
        private $email;
        private $newPassword;
        private $pdo;

        public function __construct($userId, $email, $newPassword, $pdo) {
            $this->userId = $userId;
            $this->email = $email;
            $this->newPassword = $newPassword;
            $this->pdo = $pdo;
        }

        public function setNewPassword() {
            $sql = 'SELECT * FROM User
                    WHERE user_id = :user_id
                    AND email = :email;
            ';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'user_id' => $this->userId,
                'email' => $this->email
            ]);
            
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                $sql = 'UPDATE User
                        SET password = :newPassword
                        WHERE user_id = :user_id';

                $stmt = $this->pdo->prepare($sql);
                return $stmt->execute([
                    ':newPassword' => $this->newPassword,
                    ':user_id' => $user['user_id']
                ]);
            }

            return false;
        }
    }