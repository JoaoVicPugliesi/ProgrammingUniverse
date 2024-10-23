<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/acceptModel.php';

    class AcceptController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getAccept() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'sender_id', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                $newAcceptModel = new AcceptModel($senderId, $receiverId, $this->pdo);
                $accept = $newAcceptModel->setAccept();

                if($accept) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newAcceptController = new AcceptController($pdo);
    $newAcceptController->getAccept();