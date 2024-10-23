<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/friendshipModels/friendsModel.php';

    class FriendsController {
        private $pdo;
        

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getFriends() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);

                $newFriendsModel = new FriendsModel($userId, $this->pdo);
                $friends = $newFriendsModel->setFriends();

                if($friends) {
                    echo json_encode(['success' => true, 'friends' => $friends]);
                } else {
                    echo json_encode(['success' => false]);
                }
            }
        }
    }

    $newFriendsController = new FriendsController($pdo);
    $newFriendsController->getFriends();