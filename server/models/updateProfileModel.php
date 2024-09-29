<?php

    class UpdateProfileModel {
        private $username;
        private $email;
        private $password;
        private $newEmail;
        private $newPassword;
        private $usericon;
        private $user;
        private $userId;
        private $pdo;


        public function __construct($username, $email, $password, $newEmail, $newPassword, $usericon, $user, $userId, $pdo) {
            $this->username = $username;
            $this->email = $email;
            $this->password = $password;
            $this->newEmail = $newEmail;
            $this->newPassword = $newPassword;
            $this->usericon = $usericon;
            $this->user = $user;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUpdatedProdile() {
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam('user_id', $this->userId, PDO::PARAM_INT);
            $stmt->execute();

            $this->user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($this->user && $this->email == $this->user['email'] && password_verify($this->password, $this->user['password'])) {
                $sql = 'UPDATE User SET username = :newUsername, email = :newEmail, password = :newPass, user_icon = :newUser_icon'; 
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute([
                ':newUsername' => $this->username,
                ':newEmail' => $this->newEmail,
                ':newPass' => $this->newPassword,
                ':newUser_icon' => $this->usericon
                ]);
            }
        }
    }