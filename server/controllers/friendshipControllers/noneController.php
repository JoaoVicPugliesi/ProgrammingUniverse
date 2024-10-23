<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/noneModel.php';

    class NoneController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getNone() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'sender_id', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                $newNoneModel = new NoneModel($senderId, $receiverId, $this->pdo);
                $none = $newNoneModel->setNone();

                if($none) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newNoneController = new NoneController($pdo);
    $newNoneController->getNone();

