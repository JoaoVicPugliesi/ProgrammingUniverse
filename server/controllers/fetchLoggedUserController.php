<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../core/pdo.php';
    require_once '../models/fetchLoggedUserModel.php';

    class FetchLoggedUserController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFetchLoggedUser() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $newFetchLoggedUserModel = new FetchLoggedUserModel($userId, $this->pdo);
                $user = $newFetchLoggedUserModel->setFetchLoggedUser();

                if($user) {
                    echo json_encode(['success' => true, 'user' => $user]);
                } else {
                    echo json_encode(['success' => false, 'user' => null]);
                }
            }
        }
    }

    $newFetchLoggedUserController = new FetchLoggedUserController($pdo);
    $newFetchLoggedUserController->getFetchLoggedUser();