<?php

$bot_token = "6230787025:AAG5mWVd77Nha5SREwoGbRG_z42Tvb3izqg";
$ip_address = $_SERVER['REMOTE_ADDR'];
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$current_page = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

if (preg_match('/Mobile|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/', $user_agent)) {
    $device = "Mobile";
} else {
    $device = "PC";
}

$os = "Unknown";
if (preg_match('/Windows NT (\d+\.\d+)/', $user_agent, $matches)) {
    $os = "Windows " . $matches[1];
} elseif (preg_match('/Linux/', $user_agent)) {
    $os = "Linux";
} elseif (preg_match('/Mac OS X (\d+[._]\d+[._]\d+)/', $user_agent, $matches)) {
    $os = "Mac OS X " . str_replace('_', '.', $matches[1]);
}

if (preg_match('/MSIE (.*?);/', $user_agent, $matches)) {
    $browser = 'Internet Explorer ' . $matches[1];
} elseif (preg_match('/Trident\/.*?rv:(.*?);/', $user_agent, $matches)) {
    $browser = 'Internet Explorer ' . $matches[1];
} elseif (preg_match('/Firefox\/(.*?)/', $user_agent, $matches)) {
    $browser = 'Firefox ' . $matches[1];
} elseif (preg_match('/Opera[\/ ](.*?)/', $user_agent, $matches)) {
    $browser = 'Opera ' . $matches[1];
} elseif (preg_match('/Chrome\/(.*?)/', $user_agent, $matches)) {
    $browser = 'Chrome ' . $matches[1];
} elseif (preg_match('/Safari\/(.*?)/', $user_agent, $matches)) {
    $browser = 'Safari ' . $matches[1];
} else {
    $browser = 'Phantom browser';
}

// Get country and city using ipinfo.io
$access_key = 'e7fc1faca3d3d3'; // Replace with your ipinfo.io access key
$location_info = json_decode(file_get_contents("http://ipinfo.io/{$ip_address}/json?token={$access_key}"), true);
$country = $location_info['country'] ?? 'Unknown';
$city = $location_info['city'] ?? 'Unknown';

$message = "Device: $device\n";
$message .= "Country: $country\n";
$message .= "City: $city\n";
$message .= "IP: $ip_address\n";
$message .= "Operating System: $os\n";
$message .= "Browser: $browser\n";
$message .= "Page: $current_page";

$url = "https://api.telegram.org/bot$bot_token/sendMessage?chat_id=643910578&text=" . urlencode($message);
//$result = file_get_contents($url);