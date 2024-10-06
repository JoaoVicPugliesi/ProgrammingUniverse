<?php 

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../core/pdo.php';
    require_once '../models/logoutModel.php';

    class LogoutController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLogout() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $newLogoutModel = new LogoutModel($userId, $this->pdo);
                $user = $newLogoutModel->setLogout();

                if($user) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newLogoutController = new LogoutController($pdo);
    $newLogoutController->getLogout();