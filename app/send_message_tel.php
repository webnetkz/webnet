<?php

if(isset($_POST['name']) && !empty($_POST['name']) && isset($_POST['phone']) && !empty($_POST['phone']))
{
    $bot_token = "6230787025:AAG5mWVd77Nha5SREwoGbRG_z42Tvb3izqg";
    $url = "https://api.telegram.org/bot$bot_token/sendMessage?chat_id=643910578&text=name:  {$_POST['name']};  phone:  {$_POST['phone']}";

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
