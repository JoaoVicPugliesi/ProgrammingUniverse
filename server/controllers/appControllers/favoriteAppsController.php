<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/favoriteAppsModel.php';


    class FavoriteAppsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFavoriteApps() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newFavoriteAppsModel = new FavoriteAppsModel($userId, $this->pdo);
                $apps = $newFavoriteAppsModel->setFavoriteApps();

                if($apps) {
                    echo json_encode(['success' => true, 'apps' => $apps]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newFavoriteAppsController = new FavoriteAppsController($pdo);
    $newFavoriteAppsController->getFavoriteApps();