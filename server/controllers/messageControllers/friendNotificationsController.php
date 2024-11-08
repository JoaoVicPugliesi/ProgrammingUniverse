<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/friendNotificationsModel.php';

    class FriendNotificationsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFriendNotifications() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);

                $newFriendNotificationsModel = new FriendNotificationsModel($userId, $this->pdo);
                $notifications = $newFriendNotificationsModel->setFriendNotifications();

                if($notifications) {
                    echo json_encode(['success' => true, 'notifications' => $notifications]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newFriendNotificationsController = new FriendNotificationsController($pdo);
        $newFriendNotificationsController->getFriendNotifications();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }

    