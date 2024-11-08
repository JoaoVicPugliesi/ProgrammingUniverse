<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/friendMessagesModel.php';

    class FriendMessagesController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFriendMessages() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userIdX = filter_input(INPUT_POST, 'userIdX', FILTER_SANITIZE_NUMBER_INT);
                $userIdY = filter_input(INPUT_POST, 'userIdY', FILTER_SANITIZE_NUMBER_INT);

                $newFriendMessagesModel = new FriendMessagesModel($userIdX, $userIdY, $this->pdo);
                $friendMessages = $newFriendMessagesModel->setFriendMessages();
                
                if($friendMessages) {
                    echo json_encode(['success' => true, 'friendMessages' => $friendMessages]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newFriendMessagesController = new FriendMessagesController($pdo);
        $newFriendMessagesController->getFriendMessages();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }