<?php
/**
 * Authentication Check Include
 * Include this file at the top of protected pages
 * 
 * Usage: include 'includes/auth-check.php';
 */

include_once 'common.php';

// Check if user is logged in via cookie
if (!isset($_COOKIE['microhost_admin_api_auth']) || empty($_COOKIE['microhost_admin_api_auth'])) {
    // Store current page for redirect after login
    $_SESSION['redirect_to'] = $_SERVER['REQUEST_URI'];
    
    // Redirect to login page
    header('Location: ' . $base_url . 'login.php');
    exit();
}

// Get auth token from cookie
$auth_token = $_COOKIE['microhost_admin_api_auth'];

// Optional: Validate token with API (uncomment if needed)
/*
$token_check = CALLAPI('GET', 'validate-token', ['token' => $auth_token]);
if (!$token_check || $token_check['rcode'] == 'error') {
    // Token is invalid, clear cookies and redirect to login
    setcookie('microhost_admin_api_auth', null, time() - 3600, "/", "$domain");
    unset($_COOKIE['microhost_admin_api_auth']);
    header('Location: ' . $base_url . 'login.php');
    exit();
}
*/

// Get current user info (if stored in session or from API)
$current_user = [
    'token' => $auth_token,
    'is_authenticated' => true
];
?>
