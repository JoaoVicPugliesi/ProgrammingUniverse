<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/removeStarModel.php';


    class RemoveStarController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getRemoveStar() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appId = filter_input(INPUT_POST, 'app_id', FILTER_SANITIZE_NUMBER_INT);
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);

                $newRemoveStarModel = new RemoveStarModel($appId, $userId, $this->pdo);
                $star = $newRemoveStarModel->setRemoveStar();

                if($star) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newRemoveStarController = new RemoveStarController($pdo);
    $newRemoveStarController->getRemoveStar();