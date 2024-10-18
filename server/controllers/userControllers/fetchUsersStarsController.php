<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/fetchUsersStarsModel.php';

    class FetchUsersStarsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUsersStars()  {
            $newFetchUsersStarsModel = new FetchUsersStarsModel($this->pdo);
            $stars = $newFetchUsersStarsModel->setUsersStars();

            if($stars) {
                echo json_encode(['success' => true, 'stars' => $stars]);
            } else {
                echo json_encode(['success' => false]);
            }
        }
    }

    $newFetchUsersStarsController = new FetchUsersStarsController($pdo);
    $newFetchUsersStarsController->getUsersStars();
