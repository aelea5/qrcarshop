<?php
require_once 'config.php';

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
}

// Get current user data
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }
    
    return [
        'id' => $_SESSION['user_id'] ?? null,
        'email' => $_SESSION['user_email'] ?? null,
        'name' => $_SESSION['user_name'] ?? null
    ];
}

// Logout user
function logout() {
    $_SESSION = [];
    session_destroy();
}

// Require login (redirect if not logged in)
function requireLogin($redirectTo = 'auth.html') {
    if (!isLoggedIn()) {
        header("Location: $redirectTo");
        exit;
    }
}

// Handle logout request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'logout') {
    logout();
    jsonResponse(['success' => true, 'message' => 'Logged out successfully']);
}

// Return user session info as JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'check_session') {
    header('Content-Type: application/json');
    
    if (isLoggedIn()) {
        jsonResponse([
            'success' => true,
            'logged_in' => true,
            'user' => getCurrentUser()
        ]);
    } else {
        jsonResponse([
            'success' => true,
            'logged_in' => false,
            'user' => null
        ]);
    }
}
?>
