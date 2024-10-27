<?php

    class FetchUsersResultsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUsersResults() {
            $sql = 'SELECT u.*
                    FROM User u
                    LEFT JOIN Friendships f
                    ON (u.user_id = f.sender_id OR u.user_id = f.receiver_id)
                    AND (f.request_status = :accepted OR f.request_status = :checked)
                    AND (f.sender_id = :user_id OR f.receiver_id = :user_id)
                    WHERE u.user_id != :user_id
                    AND (f.friendship_id IS NULL)
                    ORDER BY RAND()
                    LIMIT 50';

            $accepted = 'accepted';
            $checked = 'checked';
            
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([
                ':user_id' => $this->userId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }