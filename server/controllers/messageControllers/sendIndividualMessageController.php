<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/sendIndividualMessageModel.php';

    class SendIndividualMessageController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getSendIndividualMessage() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_NUMBER_INT);
                $message = $_POST['message'];
                $messageImage = $_POST['meme'];
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                if(empty($message) && empty($messageImage)) {
                    echo json_encode(['success' => false, 'error' => 'The message needs to have some content']);
                    return;
                }

                $newSendIndividualMessageModel = new SendIndividualMessageModel($userId, $message, $messageImage, $receiverId, $this->pdo);
                $individualMessage = $newSendIndividualMessageModel->setSendIndividualMessage();

                if($individualMessage) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newSendIndividualMessageController = new SendIndividualMessageController($pdo);
        $newSendIndividualMessageController->getSendIndividualMessage();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }