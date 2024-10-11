<?php

    class NewUserModel {
         private $username;
         private $email;
         private $password;
         private $usericon;
         private $pdo;

         public function __construct($username, $email, $password, $usericon, $pdo) {
            $this->username = $username;
            $this->email = $email;
            $this->password = $password;
            $this->usericon = $usericon;
            $this->pdo = $pdo;
        }

        public function setNewUser() {
            $sql = 'INSERT INTO User(username, email, password, user_icon) VALUES (:username, :email, :pass, :usericon)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':username' => $this->username,
                ':email' => $this->email,
                ':pass' => $this->password,
                ':usericon' => $this->usericon
            ]);
            
        }
    }