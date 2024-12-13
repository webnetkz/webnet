<?php

if(isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['phone']) && !empty($_POST['phone']))
{
    $bot_token = "7771527324:AAHEzU2g8xy17IKz-wcEEMLe3I6qDgrngzY";
    
    $message = "*Имя:* \n{$_POST['name']}\n";
    $message .= "*Телефон:* \n{$_POST['phone']}";

    $url = "https://api.telegram.org/bot$bot_token/sendMessage?chat_id=643910578&parse_mode=Markdown&text=" . urlencode($message);

    $result = file_get_contents($url);

    if($result === false)
    {
        echo "Ошибка при отправке сообщения.";
    }
    else
    {
        echo "Сообщение успешно отправлено!";
    }
}
