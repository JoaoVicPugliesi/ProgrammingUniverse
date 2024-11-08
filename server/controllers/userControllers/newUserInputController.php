<?php

    class NewUserInputController {
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

        public function setError($error) {
           return $_SESSION['error'] = $error;
        }


        public function alreadyTaken() {
            $sql = 'SELECT * FROM User WHERE LOWER(username) = LOWER(:fetchusername) OR LOWER(email) = LOWER(:fetchemail)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':fetchusername' => $this->username,
                ':fetchemail' => $this->email,
            ]);

            $user = $stmt->fetch(PDO::FETCH_ASSOC);


            if($user) {
            if (strtolower($user['username']) == strtolower($this->username)) {
                $this->setError("The username is already Taken");
                return false;
            }

            if (strtolower($user['email']) == strtolower($this->email)) {
                $this->setError("The email is already Taken");
                return false;
            }
            }
            
            return true;
        }

        public function usernameController() {
            if(strlen($this->username) < 3 || strlen($this->username) > 16) {
                $this->setError("Username must contain between 3 and 16 characters");
                return false;
            }

            if(!preg_match("/^[a-zA-Z0-9^~´`_]+$/i", $this->username)) {
                $this->setError("Username must contain letters, numbers and no spaces");
                return false;
            }

            return true;
        }

        public function descriptionController($description) {

            if (strlen($description) > 255) {
                $this->setError("Description must not exceed 255 characters.");
                return false;
            }
        
            if (!preg_match("/^[a-zA-Z0-9\s.,!?'^~\"´áéíóúãõâêîôûçÇ]*$/", $description)) {
                $this->setError("Description cannot contain special characters.");
                return false;
            }
            
        
            if (stripos($description, '<script>') !== false) {
                $this->setError("Description contains invalid content.");
                return false;
            }

            return true;
        }

        public function emailController() {
            list($local, $domain) = explode('@', $this->email);

            if(!preg_match('/@/', $this->email)) {
                $this->setError("Email must contain @");
                return false;
            }

            if(!preg_match("/^[a-z0-9_.-]+$/i", $local)) {
                $this->setError("Local must contain letters, numbers and certain symbols");
                return false;
            }


            if(!preg_match('/^[a-z0-9.-]+$/', $domain)) {
                $this->setError("Domain must contain lowercase and valid characters");
                return false;
            }

            if(!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
                $this->setError("Invalid Email format");
                return false;
            }

            $this->email = $local . '@' . strtolower($domain);
            return true;
        }

        public function passwordController() {
            if(strlen($this->password) < 8) {
                $this->setError("Your password must contain at least 8 characters");
                return false;
            }
            if(!preg_match("/\d+/", $this->password)) {
                $this->setError("Your password must contain at least one number");
                return false;
            }
            if(!preg_match("#[A-Z]+#", $this->password)) {
                $this->setError("Your password must contain at least one Capital Letter");
                return false;
            }
    
            if(!preg_match("#[a-z]+#", $this->password)) {
                $this->setError("Your password must contain at least one Lowercase Letter");
                return false;
            }
    
            if(!preg_match("/[\W]/", $this->password)) {
                $this->setError("Your password must contain at least one non-alphanumeric character");
                return false;
            }
    
            return true;
        }
    }