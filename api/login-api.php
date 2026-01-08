<?php
/**
 * Login API Endpoint
 * 
 * This is a sample API file for handling login requests.
 * Integrate this with your existing user database/API.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Username and password are required'
    ]);
    exit();
}

$username = trim($data['username']);
$password = $data['password'];
$remember_me = isset($data['remember_me']) ? (bool)$data['remember_me'] : false;

// Validate username
if (strlen($username) < 3) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username'
    ]);
    exit();
}

// Validate password
if (strlen($password) < 4) {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid password'
    ]);
    exit();
}

/**
 * ============================================
 * INTEGRATE YOUR AUTHENTICATION LOGIC HERE
 * ============================================
 * 
 * Example using your existing API:
 * 
 * $api_response = CallAPI('POST', 'https://your-api.com/auth/login', [
 *     'username' => $username,
 *     'password' => $password
 * ]);
 * 
 * $result = json_decode($api_response, true);
 * 
 * if ($result['authenticated']) {
 *     // Start session and store user data
 *     session_start();
 *     $_SESSION['user_id'] = $result['user']['id'];
 *     $_SESSION['username'] = $result['user']['username'];
 *     $_SESSION['full_name'] = $result['user']['full_name'];
 *     $_SESSION['role'] = $result['user']['role'];
 *     
 *     echo json_encode([
 *         'success' => true,
 *         'message' => 'Login successful',
 *         'token' => $result['token'], // if your API provides tokens
 *         'user' => [
 *             'id' => $result['user']['id'],
 *             'username' => $result['user']['username'],
 *             'full_name' => $result['user']['full_name'],
 *             'role' => $result['user']['role']
 *         ]
 *     ]);
 * } else {
 *     echo json_encode([
 *         'success' => false,
 *         'message' => 'Invalid username or password'
 *     ]);
 * }
 */

// ============================================
// DEMO AUTHENTICATION (Replace with your API)
// ============================================
// This is a demo - replace with your actual authentication logic

$demo_users = [
    'admin' => [
        'id' => 1,
        'username' => 'admin',
        'password' => 'admin123', // In production, use password_hash() and password_verify()
        'full_name' => 'Administrator',
        'role' => 'admin'
    ],
    'sales' => [
        'id' => 2,
        'username' => 'sales',
        'password' => 'sales123',
        'full_name' => 'Sales User',
        'role' => 'sales'
    ],
    'support' => [
        'id' => 3,
        'username' => 'support',
        'password' => 'support123',
        'full_name' => 'Support User',
        'role' => 'support'
    ]
];

// Check credentials
if (isset($demo_users[$username]) && $demo_users[$username]['password'] === $password) {
    $user = $demo_users[$username];
    
    // Start session
    session_start();
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['last_activity'] = time();
    
    // Generate a simple token (in production, use JWT or similar)
    $token = bin2hex(random_bytes(32));
    $_SESSION['auth_token'] = $token;
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => $token,
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'full_name' => $user['full_name'],
            'role' => $user['role']
        ]
    ]);
} else {
    // Add slight delay to prevent brute force attacks
    sleep(1);
    
    echo json_encode([
        'success' => false,
        'message' => 'Invalid username or password'
    ]);
}
?>
