<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/updateStarModel.php';


    class UpdateStarController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUpdateStar() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appId = filter_input(INPUT_POST, 'app_id', FILTER_SANITIZE_NUMBER_INT);
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);

                $newUpdateStarModel = new UpdateStarModel($appId, $userId, $this->pdo);
                $update = $newUpdateStarModel->setUpdateStar();

                if($update) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
       $newUpdateStarController = new UpdateStarController($pdo);
       $newUpdateStarController->getUpdateStar();
    } catch(PDOException $e) {
       echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }