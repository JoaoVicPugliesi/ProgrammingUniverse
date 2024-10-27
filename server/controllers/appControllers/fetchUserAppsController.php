<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/fetchUserAppsModel.php';


    class FetchUserAppsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUserApps() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {

                if($_POST["userId"] && $_POST["loggedUserId"]) {
                    $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                    $loggedUserId = filter_input(INPUT_POST, 'loggedUserId', FILTER_SANITIZE_NUMBER_INT);

                    $newFetchUserAppsModel = new FetchUserAppsModel($userId, $this->pdo);
                    $userApps = $newFetchUserAppsModel->setUserAppsIfFriend($loggedUserId);

                    if($userApps) {
                        echo json_encode(['success' => true, 'userApps' => $userApps]);
                    } else {
                        echo json_encode(['success' => false]);
                    }
                } else {
                    $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                    $newFetchUserAppsModel = new FetchUserAppsModel($userId, $this->pdo);
                    $userApps = $newFetchUserAppsModel->setUserApps();

                    if($userApps) {
                        echo json_encode(['success' => true, 'userApps' => $userApps]);
                    } else {
                        echo json_encode(['success' => false]);
                    }
                }
                
            }
        }

    }

    $newFetchUserAppsController = new FetchUserAppsController($pdo);
    $newFetchUserAppsController->getUserApps();