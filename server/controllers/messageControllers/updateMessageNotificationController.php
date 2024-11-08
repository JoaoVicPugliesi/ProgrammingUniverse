<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/updateMessageNotificationModel.php';


    class UpdateMessageNotificationController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUpdateMessageNotification() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userIdX = filter_input(INPUT_POST, 'userIdX', FILTER_SANITIZE_NUMBER_INT);
                $userIdY = filter_input(INPUT_POST, 'userIdY', FILTER_SANITIZE_NUMBER_INT);

                $newUpdateMessageNotificationModel = new UpdateMessageNotificationModel($userIdX, $userIdY, $this->pdo);
                $update = $newUpdateMessageNotificationModel->setUpdateMessageNotification();

                if($update) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
    $newUpdateMessageNotificationController = new UpdateMessageNotificationController($pdo);
    $newUpdateMessageNotificationController->getUpdateMessageNotification();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }