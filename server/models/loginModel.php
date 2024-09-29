<?php

    class LoginModel {
        private $email;
        private $password;
        private $user;
        private $userId;
        private $pdo;

        public function __construct($email, $password, $user, $userId, $pdo) {
            $this->email = $email;
            $this->password = $password;
            $this->user = $user;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setLogin() {
            $sql = 'SELECT * FROM User WHERE user_id = :userId';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':userId', $this->userId, PDO::PARAM_INT);
            $stmt->execute();

            $this->user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($this->user && $this->email == $this->user['email'] && password_verify($this->password, $this->user['password'])) {
                $_SESSION['success'] = "Welcome User";
            } else {
                $_SESSION['error'] = "Invalid Password or User";
            }

        }
    }