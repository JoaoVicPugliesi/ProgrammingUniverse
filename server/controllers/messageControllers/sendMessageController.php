<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/sendGroupMessageModel.php';

    class SendGroupMessageController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getSendGroupMessage() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);
                $message = $_POST['message'];
                $messageImg = $_POST['meme'];

                if(empty($message) && empty($messageImg)) {
                    echo json_encode(['success' => false, 'error' => 'The message needs to have some content']);
                    return;
                }

                $newSendGroupMessageModel = new SendGroupMessageModel($userId, $message, $messageImg, $this->pdo);
                $newGroupMessage = $newSendGroupMessageModel->setSendGroupMessage();

                if($newGroupMessage) {
                    echo json_encode(['success' => true, 'newGroupMessage' => $newGroupMessage]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newSendGroupMessageController = new SendGroupMessageController($pdo);
        $newSendGroupMessageController->getSendGroupMessage();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }