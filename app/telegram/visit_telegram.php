<?php

$bot_token = "6230787025:AAG5mWVd77Nha5SREwoGbRG_z42Tvb3izqg";
$ip_address = $_SERVER['REMOTE_ADDR'];
$user_agent = $_SERVER['HTTP_USER_AGENT'];
$current_page = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$message = "IP: $ip_address; User-Agent: $user_agent; Page: $current_page";
$url = "https://api.telegram.org/bot$bot_token/sendMessage?chat_id=643910578&text=" . urlencode($message);
$result = file_get_contents($url);
