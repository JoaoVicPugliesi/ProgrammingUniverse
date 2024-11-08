<?php

    class LastFriendMessagesModel {
        private $userId;
        private $pdo;

        public function __construct($userId, $pdo) {
            $this->userId = $userId;
            $this->pdo = $pdo;
        }

        public function setLastFriendMessages() {
            $sql = 'SELECT u.user_id,
                u.username,
                u.user_icon,
                u.is_online,
                m.message,
                m.message_image,
                m.message_id,
                m.message_status,
                m.sent_at
            FROM Friendships f
            JOIN User u ON (f.sender_id = u.user_id OR f.receiver_id = u.user_id)
            LEFT JOIN (
                SELECT m1.message, m1.message_image, m1.message_id, m1.message_status, m1.sent_at,
                    CASE
                        WHEN m1.user_id = :user_id THEN m1.receiver_id
                        ELSE m1.user_id
                    END AS friend_id
                FROM messages m1
                JOIN (
                    SELECT MAX(sent_at) AS last_sent_at,
                        CASE
                            WHEN user_id = :user_id THEN receiver_id
                            ELSE user_id
                        END AS friend_id
                    FROM messages
                    WHERE user_id = :user_id OR receiver_id = :user_id
                    GROUP BY friend_id
                ) AS latest_message ON m1.sent_at = latest_message.last_sent_at
                                    AND ((m1.user_id = :user_id AND m1.receiver_id = latest_message.friend_id) 
                                        OR (m1.receiver_id = :user_id AND m1.user_id = latest_message.friend_id))
            ) AS m ON m.friend_id = u.user_id
            WHERE (f.sender_id = :user_id OR f.receiver_id = :user_id)
            AND (f.request_status = :accepted OR f.request_status = :checked)
            AND u.user_id != :user_id';
 
            $stmt = $this->pdo->prepare($sql);
            $accepted = 'accepted';
            $checked = 'checked';
            $stmt->execute([
                ':user_id' => $this->userId,
                ':accepted' => $accepted,
                ':checked' => $checked
            ]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
                
        }
    }