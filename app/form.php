<?php

if($_SERVER["REQUEST_METHOD"] == "POST")
{
    $name = $_POST["name"];
    $phone = $_POST["phone"];

    $subject = 'Запрос с формы на сайте';

    $to = 'info@webnet.kz';

    $headers = "From: webnet@webnet.kz\r\n";
    $headers .= "Reply-To: dbqqbq@gmail.com\r\n"; 
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        header('Location: ../index.html');
    } else {
		header('Location: ../index.html');
    }
}