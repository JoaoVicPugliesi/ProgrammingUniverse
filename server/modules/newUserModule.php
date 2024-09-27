<?php

    class NewUserModel {
         private $username;
         private $email;
         private $password;
         private $pdo;

         public function __construct($username, $email, $password, $pdo) {
            $this->username = $username;
            $this->email = $email;
            $this->password = $password;
            $this->pdo = $pdo;
        }

        public function setNewUser() {

            $sql = 'SELECT * FROM User WHERE username = :fetchusername OR email = :fetchemail';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                'fetchusername' => $this->username,
                'fetchemail' => $this->email
            ]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                if ($user['username'] == $this->username) {
                    $_SESSION['error'] = "The username is already Taken";
                }

                if($user['email'] == $this->email) {
                    $_SESSION['error'] = "The email is already Taken";
                }

                throw new PDOException($_SESSION['error']);
            }


            $sql = 'INSERT INTO User(username, email, password) VALUES (:username, :email, :pass)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':username' => $this->username,
                ':email' => $this->email,
                ':pass' => $this->password,
            ]);
            
        }
    }