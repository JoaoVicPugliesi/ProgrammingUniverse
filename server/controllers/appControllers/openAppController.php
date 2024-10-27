<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/openAppModel.php';

    class OpenAppController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getApp() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appId = filter_input(INPUT_POST, 'app_id', FILTER_SANITIZE_NUMBER_INT);

                $newOpenAppModel = new OpenAppModel($appId, $this->pdo);
                $app = $newOpenAppModel->setApp();

                if($app) {
                    echo json_encode(['success' => true, 'app' => $app]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newOpenAppController = new OpenAppController($pdo);
    $newOpenAppController->getApp();

