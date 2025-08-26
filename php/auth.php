<?php
require_once 'config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['success' => false, 'message' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    jsonResponse(['success' => false, 'message' => 'Invalid JSON data'], 400);
}

$action = $input['action'] ?? '';

try {
    $pdo = getDBConnection();
    
    switch ($action) {
        case 'login':
            handleLogin($pdo, $input);
            break;
        case 'signup':
            handleSignup($pdo, $input);
            break;
        case 'reset_password':
            handlePasswordReset($pdo, $input);
            break;
        default:
            jsonResponse(['success' => false, 'message' => 'Invalid action'], 400);
    }
} catch (Exception $e) {
    error_log("Auth error: " . $e->getMessage());
    jsonResponse(['success' => false, 'message' => 'Server error occurred'], 500);
}

function handleLogin($pdo, $input) {
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Email and password are required']);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Invalid email format']);
    }
    
    $stmt = $pdo->prepare("SELECT id, name, email, password_hash, phone, created_at FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        jsonResponse(['success' => false, 'message' => 'Invalid email or password']);
    }
    
    if (!password_verify($password, $user['password_hash'])) {
        jsonResponse(['success' => false, 'message' => 'Invalid email or password']);
    }
    
    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET updated_at = NOW() WHERE id = ?");
    $updateStmt->execute([$user['id']]);
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_email'] = $user['email'];
    $_SESSION['user_name'] = $user['name'];
    $_SESSION['logged_in'] = true;
    
    jsonResponse([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'phone' => $user['phone']
        ]
    ]);
}

function handleSignup($pdo, $input) {
    $name = trim($input['name'] ?? '');
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    $phone = trim($input['phone'] ?? '');
    
    // Validation
    if (empty($name) || empty($email) || empty($password)) {
        jsonResponse(['success' => false, 'message' => 'Name, email, and password are required']);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Invalid email format']);
    }
    
    if (strlen($password) < 8) {
        jsonResponse(['success' => false, 'message' => 'Password must be at least 8 characters long']);
    }
    
    // Password strength validation
    if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/', $password)) {
        jsonResponse(['success' => false, 'message' => 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character']);
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (!empty($phone)) {
        $phone = preg_replace('/[^0-9]/', '', $phone); // Remove non-numeric characters
        if (strlen($phone) !== 10) {
            jsonResponse(['success' => false, 'message' => 'Phone number must be 10 digits']);
        }
    }
    
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        jsonResponse(['success' => false, 'message' => 'Email already registered']);
    }
    
    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash, phone, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())");
    
    if ($stmt->execute([$name, $email, $hashedPassword, $phone])) {
        $userId = $pdo->lastInsertId();
        
        // Set session for new user
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_email'] = $email;
        $_SESSION['user_name'] = $name;
        $_SESSION['logged_in'] = true;
        
        jsonResponse([
            'success' => true,
            'message' => 'Account created successfully',
            'user' => [
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone
            ]
        ]);
    } else {
        jsonResponse(['success' => false, 'message' => 'Failed to create account'], 500);
    }
}

function handlePasswordReset($pdo, $input) {
    $email = trim($input['email'] ?? '');
    
    if (empty($email)) {
        jsonResponse(['success' => false, 'message' => 'Email is required']);
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Invalid email format']);
    }
    
    // Check if email exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        // Don't reveal if email exists or not for security
        jsonResponse([
            'success' => true,
            'message' => 'If an account with that email exists, password reset instructions have been sent.'
        ]);
    }
    
    // Generate reset token
    $resetToken = bin2hex(random_bytes(32));
    $resetExpiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
    
    // Store reset token in database (you might want to create a password_resets table)
    $stmt = $pdo->prepare("UPDATE users SET password_reset_token = ?, password_reset_expires = ? WHERE id = ?");
    $stmt->execute([$resetToken, $resetExpiry, $user['id']]);
    
    // In a real application, you would send an email here
    // For now, we'll just return success
    jsonResponse([
        'success' => true,
        'message' => 'If an account with that email exists, password reset instructions have been sent.',
        'reset_token' => $resetToken // Remove this in production!
    ]);
}
?>
