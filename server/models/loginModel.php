<?php

    class LoginModel {
        private $email;
        private $password;
        private $userId;
        private $pdo;

        public function __construct($email, $password, $userId, $pdo) {
            $this->email = $email;
            $this->password = $password;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setLogin() {
            $sql = 'SELECT * FROM User WHERE user_id = :userId';
            $stmt = $this->pdo->prepare($sql);
            $stmt->bindParam(':userId', $this->userId, PDO::PARAM_INT);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user && $this->email == $user['email'] && password_verify($this->password, $user['password'])) {
                $_SESSION['success'] = true;
                $_SESSION['message'] = "Welcome";
                $_SESSION['user'] = $user;
            } else {
                $_SESSION['success'] = false;
                $_SESSION['user'] = $user;
            }

        }
    }