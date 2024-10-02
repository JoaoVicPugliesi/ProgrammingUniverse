<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../core/pdo.php';
    require_once '../models/searchUsernameModel.php';

    class SearchUsernameController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUsername() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                    $searchedUsername = filter_input(INPUT_POST, 'searchedUsername', FILTER_SANITIZE_SPECIAL_CHARS);
                    $searchUsernameModel = new SearchUsernameModel($searchedUsername, $this->pdo);
                    $searchUsernameModel->searchName();

                    $user = $_SESSION['user'];
                    $success = $_SESSION['success'];
                    
                    if($user) {
                        echo json_encode(['success' => $success, 'user' => $user]);
                    } else {
                        echo json_encode(['success' => $success, 'user' => 'No Users Found']);
                    }
            }
        }
    }

$searchUsernameController = new SearchUsernameController($pdo);
$searchUsernameController->getUsername();