<?php

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/appModels/newAppModel.php';
    require_once 'newAppInputController.php';


    class NewAppController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getApp() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userIdApp =  filter_input(INPUT_POST, 'userIdApp', FILTER_SANITIZE_NUMBER_INT);
                $appName = filter_input(INPUT_POST, 'appName', FILTER_SANITIZE_SPECIAL_CHARS);
                $appDescription = filter_input(INPUT_POST, 'appDescription', FILTER_SANITIZE_SPECIAL_CHARS);
                $appURL = filter_input(INPUT_POST, 'appURL', FILTER_SANITIZE_URL);
                $appVisibility = filter_input(INPUT_POST, 'appVisibility', FILTER_SANITIZE_SPECIAL_CHARS);

                if(empty($appName) || empty($appURL) || empty($appVisibility)) {
                    echo json_encode(['success' => false, 'error' => 'The App needs to have a logo, name, url and chosen visibility']);
                    return;
                }

                $newAppInputController = new NewAppInputController($appName, $appDescription, $appURL, $this->pdo);

                $appURLValidation = $newAppInputController->appURL();
                $appDescriptionValidation = $newAppInputController->appDescription();
                $appNameValidation = $newAppInputController->appName();
                $alreadyTaken = $newAppInputController->alreadyTaken();

                if($alreadyTaken && $appNameValidation && $appDescriptionValidation && $appURLValidation) {

                    $newFileName = $newAppInputController->appLogo();

                    if($newFileName) {

                    $newAppModel = new NewAppModel($userIdApp, $appName, $appDescription, $newFileName, $appVisibility, $appURL, $this->pdo);
                    $newApp = $newAppModel->setApp();

                    if($newApp) {
                        echo json_encode(['success' => true]);
                    } else {
                        echo json_encode(['success' => false, 'error' => $_SESSION['error']]);
                    }
                    } else {
                        echo json_encode(['success' => false, 'error' => $_SESSION['error']]);
                    }

                } else {
                    echo json_encode(['success' => false, 'error' => $_SESSION['error']]);
                }
            }
        }
    }

    $newAppController = new NewAppController($pdo);
    $newAppController->getApp();