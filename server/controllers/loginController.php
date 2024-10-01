<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../core/pdo.php';
    require_once '../models/newUserModel.php';


    class LoginController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLogin() {
            if($_SERVER['REQUEST_METHOD'] == 'POST') {
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                
                if(filter_var($email, FILTER_VALIDATE_EMAIL) && filter_id($userId, FILTER_VALIDATE_INT)) {
                    $loginModel = new LoginModel($email, $password, $userId, $this->pdo);
                    $loginModel->setLogin();

                    $success = $_SESSION['success'];
                    $message = $_SESSION['message'];
                    $user = $_SESSION['user'];

                    if($user) {
                        echo json_encode(['success' => $success, 'message' => $message, 'user' => $user]);
                    } else {
                        echo json_encode(['success' => $success, 'message' => 'Invalid Credentials', 'user' => $user]);
                    }
            }
        }
    }
}