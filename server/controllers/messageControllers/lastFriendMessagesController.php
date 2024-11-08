<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/lastFriendMessagesModel.php';

    class LastFriendMessagesController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLastFriendMessages() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {

                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newLastFriendMessagesModel = new LastFriendMessagesModel($userId, $this->pdo);
                $messages = $newLastFriendMessagesModel->setLastFriendMessages();

                if($messages) {
                    echo json_encode(['success' => true, 'messages' => $messages]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newLastFriendMessagesController = new LastFriendMessagesController($pdo);
        $newLastFriendMessagesController->getLastFriendMessages();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
   