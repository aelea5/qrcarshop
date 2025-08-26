<?php
/**
 * List Users (for debugging only)
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    // Get all users (just basic info for security)
    $stmt = $pdo->prepare("SELECT id, name, email, created_at FROM users ORDER BY created_at DESC LIMIT 10");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Users retrieved successfully',
        'count' => count($users),
        'users' => $users
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
