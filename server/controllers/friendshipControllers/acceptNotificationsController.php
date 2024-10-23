<?php
    
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/acceptNotificationsModel.php';


    class AcceptNotificationsController {

        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getAcceptNotifications() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newAcceptNotificationsModel = new AcceptNotificationsModel($userId, $this->pdo);
                $accepts = $newAcceptNotificationsModel->setAcceptNotifications();

                if($accepts) {
                    echo json_encode(['success' => true, 'accepts' => $accepts]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newAcceptNotificationsController = new AcceptNotificationsController($pdo);
    $newAcceptNotificationsController->getAcceptNotifications();