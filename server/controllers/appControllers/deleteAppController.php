<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/deleteAppModel.php';

    class DeleteAppController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getDelete() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appName = filter_input(INPUT_POST, 'appName', FILTER_SANITIZE_SPECIAL_CHARS);
                $appId = filter_input(INPUT_POST, 'appId', FILTER_SANITIZE_NUMBER_INT);
                $newDeleteAppModel = new DeleteAppModel($appId, $appName, $this->pdo);
                $deleteApp = $newDeleteAppModel->setDeleteApp();

                if($deleteApp) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => $_SESSION['error']]);
                }
            }
        }
    }

    $newDeleteAppController = new DeleteAppController($pdo);
    $newDeleteAppController->getDelete();