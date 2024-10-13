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
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':user_id' => $this->userId]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                if($user['email'] == $this->email && password_verify($this->password, $user['password'])) {
                    $sql = 'UPDATE User SET last_activity = NOW(), last_seen = NOW(), is_online = 1 WHERE user_id = :user_id';
                    $stmt = $this->pdo->prepare($sql);
                    $stmt->execute([':user_id' => $this->userId]);

                    $_SESSION['success'] = true;
                    $_SESSION['user'] = $user;
                }

                if(!password_verify($this->password, $user['password'])) {
                    $_SESSION['success'] = false;
                    $_SESSION['user'] = $user;
                    $_SESSION['error'] = 'Invalid Password';
                }
    
                if($user['email'] !== $this->email) {
                    $_SESSION['success'] = false;
                    $_SESSION['user'] = $user;
                    $_SESSION['error'] = 'Invalid Email';
                }

                if(empty($this->email) || empty($this->password)) {
                    $_SESSION['success'] = false;
                    $_SESSION['user'] = $user;
                    $_SESSION['error'] = 'Please. Fill The Email and Password';
                }
             }
        }
    }
