<?php

    class UpdateProfileModel {
        private $username;
        private $email;
        private $description;
        private $usericon;
        private $userId;
        private $pdo;


        public function __construct($username, $email, $description, $usericon, $userId, $pdo) {
            $this->username = $username;
            $this->email = $email;
            $this->description = $description;
            $this->usericon = $usericon;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUpdatedProfile() {
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam('user_id', $this->userId, PDO::PARAM_INT);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                $sql = 'UPDATE User SET username = :newUsername, email = :newEmail, user_description = :newUserDescription, user_icon = :newUser_icon WHERE user_id = :user_id';
                $stmt = $this->pdo->prepare($sql);
                return $stmt->execute([
                ':newUsername' => $this->username,
                ':newEmail' => $this->email,
                ':newUserDescription' => $this->description,
                ':newUser_icon' => $this->usericon,
                ':user_id' => $this->userId,
                ]);
            }
        }
    }