<?php

    
    class FriendRequestModel {
        private $senderId;
        private $receiverId;
        private $pdo;

        public function __construct($senderId, $receiverId, $pdo) {
            $this->senderId = $senderId;
            $this->receiverId = $receiverId;
            $this->pdo = $pdo;
        }

        public function setFriendRequest() {

            $sql = 'SELECT * FROM Friendships WHERE (sender_id = :sender_id AND receiver_id = :receiver_id)
                    OR (sender_id = :receiver_id AND receiver_id = :sender_id)';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
            ]);

            $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($requests as $request) {
                if (in_array(trim($request['request_status']), ['checked', 'accepted', 'pending'], true)) {
                        switch (trim($request['request_status'])) {
                        case 'checked':
                        case 'accepted':
                            $_SESSION['error'] = 'You guys are already friends';
                            return false;
                        case 'pending':
                            $_SESSION['error'] = 'A friend request is already pending between you two';
                            return false;
                    }
                }
            }

            $sql = 'INSERT INTO Friendships (sender_id, receiver_id, request_status) VALUES (:sender_id, :receiver_id, :request_status)';
            $stmt = $this->pdo->prepare($sql);
            $status = 'pending';
            return $stmt->execute([
                ':sender_id' => $this->senderId,
                ':receiver_id' => $this->receiverId,
                ':request_status' => $status
            ]);
            
        }
    }