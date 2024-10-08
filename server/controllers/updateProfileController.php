<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../core/pdo.php';
    require_once '../models/updateProfileModel.php';
    require_once 'newUserInputController.php';

    class UpdateProfileController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUpdatedProfile() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_SPECIAL_CHARS);
                $user_icon = $_POST['myIcon'];
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $validateController = new NewUserInputController();

                $validateDescription = $validateController->descriptionController($description);
                $validateEmail = $validateController->emailController($email);
                $validateUsername = $validateController->usernameController($username);

                if($validateDescription && $validateEmail && $validateUsername) {

                $newUpdateProfileModel = new UpdateProfileModel($username, $email, $description, $user_icon, $userId, $this->pdo);
                $user = $newUpdateProfileModel->setUpdatedProfile();
                
                if($user) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
                } else {
                    echo json_encode(['success' => false, 'error' => $_SESSION['error']]);
                }
            }
        }
    }

    $newUpdateProfileController = new UpdateProfileController($pdo);
    $newUpdateProfileController->getUpdatedProfile();