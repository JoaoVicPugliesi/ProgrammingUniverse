<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/pendingRequestsModel.php';

    class PendingRequestsController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getPendingRequests() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $newPendingRequestsModel = new PendingRequestsModel($userId, $this->pdo);
                $requests = $newPendingRequestsModel->setPendingRequests();

                if($requests) {
                    echo json_encode(['success' => true, 'requests' => $requests]);
                } else {
                    echo json_encode(['success' => false]);
                }

            }
        }
    }

    $newPendingRequestsController = new PendingRequestsController($pdo);
    $newPendingRequestsController->getPendingRequests();