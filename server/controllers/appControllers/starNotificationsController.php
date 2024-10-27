<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/starNotificationsModel.php';

    class StarNotificationsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getStarNotifications() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newStarNotificationsModel = new StarNotificationsModel($userId, $this->pdo);
                $star = $newStarNotificationsModel->setStarNotifications();

                if($star) {
                    echo json_encode(['success' => true, 'star' => $star]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newStarNotificationsController = new StarNotificationsController($pdo);
        $newStarNotificationsController->getStarNotifications();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        exit;
    }
  