<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/fetchUsersModel.php';

    class ProfileController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getProfiles() {
            $profileModel = new ProfileModel($this->pdo);
            $users = $profileModel->setProfiles();

            if($users) {
                 echo json_encode(['success' => true, 'users' => $users]);
            } else {
                 echo json_encode(['success' => false, 'message' => "No Users Found"]);
            }
        }

    }

    $profileController = new ProfileController($pdo);
    $profileController->getProfiles();
