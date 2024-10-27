<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/searchAppModel.php';


    class SearchAppController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getSearchApp() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $searchedApp = filter_input(INPUT_POST, 'searchedApp', FILTER_SANITIZE_SPECIAL_CHARS);

                $newSearchAppModel = new SearchAppModel($userId, $searchedApp, $this->pdo);
                $searchedApps = $newSearchAppModel->setSearchApp();

                if($searchedApps) {
                    echo json_encode(['success' => true, 'searchedApps' => $searchedApps]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }

    }

    $newSearchAppController = new SearchAppController($pdo);
    $newSearchAppController->getSearchApp();