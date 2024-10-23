<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/declineNotificationsModel.php';

    class DeclineNotificationsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getDeclineNotifications() {
           if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newDeclineNotificationsModel = new DeclineNotificationsModel($userId, $this->pdo);
                $declines = $newDeclineNotificationsModel->setDeclineNotifications();

                if($declines) {
                    echo json_encode(['success' => true, 'declines' => $declines]);
                } else {
                    echo json_encode(['success' => false]);
                }
           }
        }
    }

    $newDeclineNotificationsController = new DeclineNotificationsController($pdo);
    $newDeclineNotificationsController->getDeclineNotifications();