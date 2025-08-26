<?php
/**
 * Session Management
 * Handles session checking, user authentication status, and logout
 */

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set JSON content type
header('Content-Type: application/json');

// Get the action parameter
$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'check_session':
    case 'check':
        checkSession();
        break;
    
    case 'logout':
        logout();
        break;
    
    default:
        echo json_encode(['success' => false, 'message' => 'Invalid action']);
        break;
}

function checkSession() {
    $response = [
        'logged_in' => false,
        'user' => null
    ];
    
    if (isset($_SESSION['user_id']) && isset($_SESSION['user'])) {
        $response['logged_in'] = true;
        $response['user'] = $_SESSION['user'];
        $response['authenticated'] = true;
    }
    
    echo json_encode($response);
}

function logout() {
    // Destroy all session data
    session_unset();
    session_destroy();
    
    // Start a new session
    session_start();
    
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}
?>
