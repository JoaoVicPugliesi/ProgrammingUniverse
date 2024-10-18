<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/fetchUsersResultsModel.php';

    class FetchUsersResultsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUsersResults() {

            if($_SERVER['REQUEST_METHOD'] === 'POST') {

                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $newFetchUsersResultsModel = new FetchUsersResultsModel($userId, $this->pdo);
                $users = $newFetchUsersResultsModel->setUsersResults();

                if($users) {
                    echo json_encode(['success' => true, 'users' => $users]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newFetchUsersResultsController = new FetchUsersResultsController($pdo);
    $newFetchUsersResultsController->getUsersResults();

