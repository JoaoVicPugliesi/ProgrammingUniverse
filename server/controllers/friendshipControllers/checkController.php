<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/checkModel.php';

    class CheckController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getCheck() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'sender_id', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiver_id', FILTER_SANITIZE_NUMBER_INT);

                $newCheckModel = new CheckModel($senderId, $receiverId, $this->pdo);
                $check = $newCheckModel->setCheck();

                if($check) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newCheckController = new CheckController($pdo);
    $newCheckController->getCheck();