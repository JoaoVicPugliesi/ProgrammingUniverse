<?php 
    header('Content-Type: application/json'); 
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    session_start();
    require_once '../../core/pdo.php';
    require_once '../../models/userModels/newUserModel.php';
    require_once 'newUserInputController.php';

    class NewUserController {
        private $pdo;

        public function __construct($pdo) {
            $this->pdo = $pdo;
        }

        public function getNewUser() {
            if($_SERVER["REQUEST_METHOD"] === "POST") {
                $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
                $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
                $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
                $myIcon = $_POST['myChosenIcon'];

                $validateController = new NewUserInputController($username, $email, $password, $this->pdo);
                
                $validatePassword = $validateController->passwordController();
                $validateEmail = $validateController->emailController();
                $validateUsername = $validateController->usernameController();
                $validateAlreadyTaken = $validateController->alreadyTaken();
              
                if($validateAlreadyTaken && $validateUsername && $validateEmail && $validatePassword) {
                    $hash = password_hash($password, PASSWORD_DEFAULT);
                    $newUser = new NewUserModel($username, $email, $hash, $myIcon, $this->pdo);
                    try {
                        $newUser->setNewUser();
                        echo json_encode(['success' => true]);
                        
                    } catch(Exception) {
                        echo json_encode(['success' => false, 'message' => $_SESSION['error'] ? $_SESSION['error'] : 'Unkown Error']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => $_SESSION['error']]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid request method']);
            }
        }
    }


    $newUserController = new NewUserController($pdo);
    $newUserController->getNewUser();