<?php

    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/languageModel.php';


    class LanguageController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getLanguage() {
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $userId = filter_input(INPUT_POST, 'userId', FILTER_SANITIZE_NUMBER_INT);
                $language = filter_input(INPUT_POST, 'language', FILTER_SANITIZE_SPECIAL_CHARS);
                
                if(empty($language)) {
                    echo json_encode(['success' => false, 'error' => 'Language not found']);
                }

                $newLanguageModel = new LanguageModel($userId, $language, $this->pdo);
                $language = $newLanguageModel->setLanguage();

                if($language) {
                    echo json_encode(['success' => true]);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Language not Found']);
                }
            }
        }
    }

    try {
        $newLanguageController = new LanguageController($pdo);
        $newLanguageController->getLanguage();
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }