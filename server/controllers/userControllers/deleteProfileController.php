<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/deleteProfileModel.php';

    class DeleteProfileController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getDelete() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $newDeleteProfileModel = new DeleteProfileModel($password, $email, $userId, $this->pdo);
                $newDeleteProfileModel->setDelete();

                $success = $_SESSION['success'];
                $user = $_SESSION['user'];
                $error = $_SESSION['error'];

                if($success) {
                    echo json_encode(['success' => $success, 'user' => $user]);
                } else {
                    echo json_encode(['success' => $success, 'user' => $user, 'error' => $error]);
                }
            }
        }
    }
    

    $newDeleteProfileController = new DeleteProfileController($pdo);
    $newDeleteProfileController->getDelete();