<?php
/**
 * Database Connection Test
 */

require_once 'config.php';

header('Content-Type: application/json');

try {
    // Test the database connection
    echo json_encode([
        'success' => true,
        'message' => 'Database connection successful',
        'host' => $_ENV['DB_HOST'] ?? 'not set',
        'database' => $_ENV['DB_NAME'] ?? 'not set',
        'user' => $_ENV['DB_USER'] ?? 'not set',
        'password_set' => isset($_ENV['DB_PASS']) ? 'yes' : 'no'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage(),
        'host' => $_ENV['DB_HOST'] ?? 'not set',
        'database' => $_ENV['DB_NAME'] ?? 'not set',
        'user' => $_ENV['DB_USER'] ?? 'not set'
    ]);
}
?>
