<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/fetchUsersMedalsModel.php';

    class FetchUsersMedalsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUsersMedals() {
            $newFetchUsersMedalsModel = new FetchUsersMedalsModel($this->pdo);
            $medals = $newFetchUsersMedalsModel->setUsersMedals();

            if($medals) {
                echo json_encode(['success' => true, 'medals' => $medals]);
            } else {
                echo json_encode(['success' => false]);
            }
        }
    }

    $newFetchUsersMedalsController = new FetchUsersMedalsController($pdo);
    $newFetchUsersMedalsController->getUsersMedals();
