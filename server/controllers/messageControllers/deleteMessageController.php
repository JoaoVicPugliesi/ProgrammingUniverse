<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/deleteMessageModel.php';


    class DeleteMessageController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getDeleteMessage() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $messageId = filter_input(INPUT_POST, 'message_id', FILTER_SANITIZE_NUMBER_INT);

                $newDeleteMessageModel = new DeleteMessageModel($messageId, $this->pdo);
                $delete = $newDeleteMessageModel->setDeleteMessage();

                if($delete) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newDeleteMessageController = new DeleteMessageController($pdo);
        $newDeleteMessageController->getDeleteMessage();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }