<?php
/**
 * Create Test User (for debugging only)
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    $testEmail = 'test@example.com';
    $testPassword = 'password123';
    $testName = 'Test User';
    
    // Check if test user already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$testEmail]);
    $existingUser = $stmt->fetch();
    
    if ($existingUser) {
        echo json_encode([
            'success' => true,
            'message' => 'Test user already exists',
            'email' => $testEmail,
            'password' => $testPassword
        ]);
    } else {
        // Create test user
        $hashedPassword = password_hash($testPassword, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, NOW())");
        $stmt->execute([$testName, $testEmail, $hashedPassword]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Test user created successfully',
            'email' => $testEmail,
            'password' => $testPassword,
            'note' => 'Use these credentials to test login'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
