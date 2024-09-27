<?php

    class NewUserInputController {

        public function setError($error) {
           return $_SESSION["error"] = $error;
        }

        public function usernameController($username) {
            if(strlen($username) < 8) {
                $this->setError("Username must contain at least 8 characters");
                return false;
            }

            if(!preg_match("/^[a-z0-9]+$/i", $username)) {
                $this->setError("Username must contain only letters and numbers");
                return false;
            }

            return true;
        }

        public function emailController($email) {
            list($local, $domain) = explode('@', $email);

            if(!preg_match('/@/', $email)) {
                $this->setError("Email must contain @");
                return false;
            }

            if(!preg_match('/^[a-z0-9.-]+$/', $domain)) {
                $this->setError("Domain must contain lowercase and valid characters");
                return false;
            }

            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $this->setError("Invalid Email format");
                return false;
            }

            $email = $local . '@' . strtolower($domain);
            return true;
        }

        public function passwordController($password) {
            if(strlen($password) < 8) {
                $this->setError("Your password must contain at least 8 characters");
                return false;
            }
            if(!preg_match("/\d+/", $password)) {
                $this->setError("Your password must contain at least one number");
                return false;
            }
            if(!preg_match("#[A-Z]+#", $password)) {
                $this->setError("Your password must contain at least one Capital Letter");
                return false;
            }
    
            if(!preg_match("#[a-z]+#", $password)) {
                $this->setError("Your password must contain at least one Lowercase Letter");
                return false;
            }
    
            if(!preg_match("/[\W]/", $password)) {
                $this->setError("Your password must contain at least one non-alphanumeric character");
                return false;
            }
    
            return true;
        }
    }