<?php

    class DeleteProfileModel {
        private $password;
        private $email;
        private $userId;
        private $pdo;

        public function __construct($password, $email, $userId, $pdo) {
            $this->password = $password;
            $this->email = $email;
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setDelete() {
            $sql = 'SELECT * FROM User WHERE user_id = :user_id';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':user_id' => $this->userId]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if($user) {
                if($user['email'] == $this->email && password_verify($this->password, $user['password'])) {
                    $sql = 'DELETE FROM User WHERE user_id = :user_id';
                    $stmt = $this->pdo->prepare($sql);
                    $stmt->execute([
                        ':user_id' => $this->userId,
                    ]);

                    $_SESSION['success'] = true;
                    $_SESSION['user'] = $user;
                }
                    
                if($user['email'] !== $this->email) {
                    $_SESSION['success'] = false;
                    $_SESSION['user'] = $user;
                    $_SESSION['error'] = 'Invalid Email';
                }

                if(!password_verify($this->password, $user['password'])) {
                    $_SESSION['success'] = false;
                    $_SESSION['user'] = $user;
                    $_SESSION['error'] = 'Invalid Password';
                }
            } 

            } 
        }
    
    