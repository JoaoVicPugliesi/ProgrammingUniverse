<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/updatePasswordModel.php';
    require_once 'newUserInputController.php';


    class UpdatePasswordController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUpdatePassword() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                $newPassword = filter_input(INPUT_POST, 'newPassword', FILTER_SANITIZE_SPECIAL_CHARS);

                $validateController = new NewUserInputController('', '', $newPassword, $this->pdo);
                
                $validatePassword = $validateController->passwordController();

                if($validatePassword) {
                    $newHashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

                    $newUpdatePasswordModel = new UpdatePasswordModel($userId, $email, $newHashedPassword, $this->pdo);
                    $update = $newUpdatePasswordModel->setNewPassword();

                    if($update) {
                        echo json_encode(['success' => true, 'message' => 'Password Updated Successfully']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Email does not match']);
                    }


                } else {
                    echo json_encode(['success' => false, 'message' => $_SESSION['error']]);
                }

            }
        }
    }
    
    try {
        $newUpdatePasswordController = new UpdatePasswordController($pdo);
        $newUpdatePasswordController->getUpdatePassword();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }