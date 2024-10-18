<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/fetchAppsStarsModel.php';

    class FetchAppsStarsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getAppsStars() {
            $newFetchAppsStarsModel = new FetchAppsStarsModel($this->pdo);
            $stars = $newFetchAppsStarsModel->setAppsStars();

            if($stars) {
                echo json_encode(['success' => true, 'stars' => $stars]);
            } else {
                echo json_encode(['success' => false]);
            }

        }
    }

    $newFetchAppsStarsController = new FetchAppsStarsController($pdo);
    $newFetchAppsStarsController->getAppsStars();