<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/declineModel.php';

    class DeclineController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getDecline() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'sender_id', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                $newDeclineModel = new DeclineModel($senderId, $receiverId, $this->pdo);
                $decline = $newDeclineModel->setDecline();

                if($decline) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newDeclineController = new DeclineController($pdo);
    $newDeclineController->getDecline();