<?php
/**
 * Authentication Handler
 * Handles user login and registration
 */

require_once 'config.php';

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set JSON content type
header('Content-Type: application/json');

// Enable CORS for local development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    $action = $input['action'] ?? '';
    
    switch ($action) {
        case 'login':
            handleLogin($input);
            break;
        
        case 'signup':
            handleSignup($input);
            break;
        
        default:
            throw new Exception('Invalid action');
    }
    
} catch (Exception $e) {
    // Log the error for debugging
    error_log("Auth error: " . $e->getMessage() . " | Data: " . json_encode($input ?? []));
    
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'debug' => [
            'input_received' => isset($input),
            'action' => $input['action'] ?? 'none',
            'env_loaded' => isset($_ENV['DB_HOST'])
        ]
    ]);
}

function handleLogin($data) {
    global $pdo;
    
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $remember = $data['remember'] ?? '0';
    
    if (empty($email) || empty($password)) {
        throw new Exception('Email and password are required');
    }
    
    // Get user from database
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Debug logging
    error_log("Login attempt for email: $email | User found: " . ($user ? 'yes' : 'no'));
    
    if (!$user) {
        throw new Exception('Invalid email or password');
    }
    
    // Verify password
    $passwordMatch = password_verify($password, $user['password']);
    error_log("Password verification for $email: " . ($passwordMatch ? 'success' : 'failed'));
    
    if (!$passwordMatch) {
        throw new Exception('Invalid email or password');
    }
    
    // Set session variables
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user'] = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'created_at' => $user['created_at']
    ];
    
    // Set remember me cookie if requested
    if ($remember === '1') {
        $token = bin2hex(random_bytes(32));
        // Store token in database (you might want to add a remember_tokens table)
        setcookie('remember_token', $token, time() + (30 * 24 * 60 * 60), '/'); // 30 days
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => $_SESSION['user']
    ]);
}

function handleSignup($data) {
    global $pdo;
    
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $confirmPassword = $data['confirm_password'] ?? '';
    
    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        throw new Exception('All fields are required');
    }
    
    if ($password !== $confirmPassword) {
        throw new Exception('Passwords do not match');
    }
    
    if (strlen($password) < 8) {
        throw new Exception('Password must be at least 8 characters long');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        throw new Exception('Email already registered');
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())");
    $stmt->execute([$name, $email, $hashedPassword]);
    
    $userId = $pdo->lastInsertId();
    
    // Set session variables
    $_SESSION['user_id'] = $userId;
    $_SESSION['user'] = [
        'id' => $userId,
        'name' => $name,
        'email' => $email,
        'created_at' => date('Y-m-d H:i:s')
    ];
    
    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully',
        'user' => $_SESSION['user']
    ]);
}
?>
