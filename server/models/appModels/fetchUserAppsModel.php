<?php

    class FetchUserAppsModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setUserApps() {
            $sql = 'SELECT * FROM App WHERE user_id = :user_id ORDER BY app_id ASC LIMIT 10';
            $stmt = $this->pdo->prepare($sql);
            $stmt->execute([':user_id' => $this->userId]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function setUserAppsIfFriend($loggedUserId) {

            $sql = 'SELECT * FROM Friendships WHERE 
                ((sender_id = :sender_id AND receiver_id = :receiver_id) 
                OR (sender_id = :receiver_id AND receiver_id = :sender_id))
                AND (request_status = :accepted OR request_status = :checked)';
        
            $stmt = $this->pdo->prepare($sql);
        
            $accepted = 'accepted';
            $checked = 'checked';
        
            $stmt->execute([
                ':sender_id' => $this->userId,
                ':receiver_id' => $loggedUserId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);
        
            $friendship = $stmt->fetch(PDO::FETCH_ASSOC);
        
            if ($friendship) {
                $sql = 'SELECT App.*,
                        (CASE WHEN Ratings.user_id = :loggedUserId THEN 1 ELSE 0 END) AS is_starred
                        FROM App
                        LEFT JOIN Ratings ON App.app_id = Ratings.app_id AND Ratings.user_id = :loggedUserId
                        WHERE App.user_id = :user_id
                        ORDER BY App.app_id DESC
                        LIMIT 50';
        
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute([
                    ':user_id' => $this->userId,
                    ':loggedUserId' => $loggedUserId
                ]);
            } else {
                
                $sql = 'SELECT App.*,
                        (CASE WHEN Ratings.user_id = :loggedUserId THEN 1 ELSE 0 END) AS is_starred
                        FROM App
                        LEFT JOIN Ratings ON App.app_id = Ratings.app_id AND Ratings.user_id = :loggedUserId
                        WHERE App.user_id = :user_id AND App.app_visibility = :app_visibility
                        ORDER BY App.stars_count DESC
                        LIMIT 50';
        
                $stmt = $this->pdo->prepare($sql);
                $appVisibility = 'public';
                $stmt->execute([
                    ':user_id' => $this->userId,
                    ':loggedUserId' => $loggedUserId,
                    ':app_visibility' => $appVisibility
                ]);
            }
        
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
}