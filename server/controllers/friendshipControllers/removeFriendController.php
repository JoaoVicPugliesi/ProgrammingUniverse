<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/removeFriendModel.php';


    class RemoveFriendController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getRemoveFriend() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'sender_id', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                error_log("Sender ID: " . $senderId);
                error_log("Receiver ID: " . $receiverId);

                $newRemoveFriendModel = new RemoveFriendModel($senderId, $receiverId, $this->pdo);
                $remove = $newRemoveFriendModel->setRemoveFriend();

                if($remove) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
    $newRemoveFriendController = new RemoveFriendController($pdo);
    $newRemoveFriendController->getRemoveFriend();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }