<?php

$tmpdata = json_decode(file_get_contents('php://input'),true); 
$arrdataapi = print_r($tmpdata, true);
 
file_put_contents('apidata.txt', "Данные от бота: $arrdataapi", FILE_APPEND);
