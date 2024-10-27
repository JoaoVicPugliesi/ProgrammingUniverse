<?php
    class SearchUserModel {
        private $searchedUser;
        private $pdo;

        public function __construct($searchedUser, $pdo) {
            $this->searchedUser = $searchedUser;
            $this->pdo = $pdo;
        }

        public function searchName () {
            $sql = 'SELECT * FROM User WHERE username LIKE :searchedUsername LIMIT 5';
            $stmt = $this->pdo->prepare($sql);
            $searchTerm = '%' . $this->searchedUser . '%';
            $stmt->bindParam(':searchedUsername', $searchTerm, PDO::PARAM_STR);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function searchNameExcept($userId) {
            $sql = ' SELECT u.*
                     FROM User u
                     LEFT JOIN Friendships f
                     ON (u.user_id = f.sender_id OR u.user_id = f.receiver_id)
                     AND (f.request_status = :accepted OR f.request_status = :checked)
                     AND (f.sender_id = :user_id OR f.receiver_id = :user_id)
                     WHERE u.user_id != :user_id
                     AND (f.friendship_id IS NULL)
                     AND u.username LIKE :searchedUsername
                     LIMIT 5';

            $accepted = 'accepted';
            $checked = 'checked';

            $stmt = $this->pdo->prepare($sql);
            $searchTerm = '%' . $this->searchedUser . '%';
            $stmt->execute([
                ':searchedUsername' => $searchTerm,
                ':user_id' => $userId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
    }