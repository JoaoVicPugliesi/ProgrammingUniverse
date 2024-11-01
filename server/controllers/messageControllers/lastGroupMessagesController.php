<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/lastGroupMessagesModel.php';

    class LastGroupMessagesController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLastGroupMessages() {
            $newLastMessagesModel = new LastGroupMessagesModel($this->pdo);
            $messages = $newLastMessagesModel-> setLastGroupMessages();
            $lastMessage = $newLastMessagesModel->setLatestGroupMessage();
            $groupMessages = $newLastMessagesModel->setGroupMessages();

            if($messages && $lastMessage) {
                echo json_encode(['success' => true, 'messages' => $messages, 'lastMessage' => $lastMessage, 'groupMessages' => $groupMessages]);
            } else {
                echo json_encode(['success' => false]);
            }
        }
    }

    try {
        $newLastMessagesController = new LastGroupMessagesController($pdo);
        $newLastMessagesController->getLastGroupMessages();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }