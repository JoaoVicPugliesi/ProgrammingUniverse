<?php
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/friendRequestModel.php';


    class FriendRequestController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFriendRequest() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $senderId = filter_input(INPUT_POST, 'senderId', FILTER_SANITIZE_NUMBER_INT);
                $receiverId = filter_input(INPUT_POST, 'receiverId', FILTER_SANITIZE_NUMBER_INT);

                $newFriendRequestModel = new FriendRequestModel($senderId, $receiverId, $this->pdo);
                $friendRequest = $newFriendRequestModel->setFriendRequest();

                if($friendRequest) {
                    echo json_encode(['success' => true, 'message' => 'Friend request sent']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to send request']);
                }
            }
        }
    }


    $newFriendRequestController = new FriendRequestController($pdo);
    $newFriendRequestController->getFriendRequest();