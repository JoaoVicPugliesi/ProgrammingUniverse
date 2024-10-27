<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/giveStarModel.php';


    class GiveStarController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getGiveStar() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appId = filter_input(INPUT_POST, 'app_id', FILTER_SANITIZE_NUMBER_INT);
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);

                $newGiveStarModel = new GiveStarModel($appId, $userId, $this->pdo);
                $star = $newGiveStarModel->setGiveStar();

                if($star) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newGiveStarController = new GiveStarController($pdo);
    $newGiveStarController->getGiveStar();