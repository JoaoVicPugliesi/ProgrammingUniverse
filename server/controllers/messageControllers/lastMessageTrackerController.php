<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/messageModels/lastMessageTrackerModel.php';


    class LastMessageTrackerController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLastMessageTracker() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $messageId = filter_input(INPUT_POST, 'message_id', FILTER_SANITIZE_NUMBER_INT);
                
                $newLastMessageTrackerModel = new LastMessageTrackerModel($messageId, $this->pdo);
                $tracker = $newLastMessageTrackerModel->setLastMessageTracker();

                if($tracker) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    try {
        $newLastMessageTrackerController = new LastMessageTrackerController($pdo);
        $newLastMessageTrackerController->getLastMessageTracker();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }