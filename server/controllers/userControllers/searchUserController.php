<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/searchUserModel.php';

    class SearchUserController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUsername() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $searchedUsername = filter_input(INPUT_POST, 'searchedUsername', FILTER_SANITIZE_SPECIAL_CHARS);
                    $searchUsernameModel = new SearchUserModel($searchedUsername, $this->pdo);
                    $users = $searchUsernameModel->searchName();

                    if ($users) {
                        echo json_encode(['success' => true, 'users' => $users]);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'No Users Found']);
                    }
            }
        }
    }

$searchUsernameController = new SearchUserController($pdo);
$searchUsernameController->getUsername();