<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/placeModel.php';

    class PlaceController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getPlace() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);
                $userPlace = filter_input(INPUT_POST, 'user_place', FILTER_SANITIZE_SPECIAL_CHARS);

                $newPlaceModel = new PlaceModel($userId, $userPlace, $this->pdo);
                $place = $newPlaceModel->setPlace();

                if($place) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
                
            }
        }
    }


    $newPlaceController = new PlaceController($pdo);
    $newPlaceController->getPlace();