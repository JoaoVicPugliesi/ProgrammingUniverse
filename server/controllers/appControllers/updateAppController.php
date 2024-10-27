<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/updateAppModel.php';
    require_once 'newAppInputController.php';


    class UpdateAppController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getUpdateApp() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $appId = filter_input(INPUT_POST, 'app_id', FILTER_SANITIZE_NUMBER_INT);
                $appName = filter_input(INPUT_POST, 'app_name', FILTER_SANITIZE_SPECIAL_CHARS);
                $appDescription = filter_input(INPUT_POST, 'app_description', FILTER_SANITIZE_SPECIAL_CHARS);
                $appURL = filter_input(INPUT_POST, 'app_url', FILTER_SANITIZE_URL);

                if(empty($appName) || empty($appURL)) {
                    echo json_encode(['success' => false, 'error' => 'The App needs to have a logo, name, url and chosen visibility']);
                    return;
                }

                $newAppInputController = new NewAppInputController($appName, $appDescription, $appURL, $this->pdo);

                $appURLValidation = $newAppInputController->appURL();
                $appDescriptionValidation = $newAppInputController->appDescription();
                $appNameValidation = $newAppInputController->appName();
                $alreadyTaken = $newAppInputController->alreadyTaken();

            }
        }
    }
