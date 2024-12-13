<?php

require_once 'config.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
	<meta name="description" content="WebNet разработка сайтов и приложений">
	<link rel="icon" type="image/png" href="/public/img/icon.png">
	<link rel="manifest" href="/manifest.json">
	<meta name="theme-color" content="#000"/>
	<meta name="google-site-verification" content="KnCNMaptYRR7po3CwfepSJQK-YphmObbrallV8LeKlA" />

    <title>WebNet</title>

  <?php
    if (defined('DEBUG') && DEBUG)
    {
      echo '<link rel="stylesheet" type="text/css" href="/public/css/styles.css">';
    } else {
      echo '<link rel="stylesheet" type="text/css" href="/public/css/min.css">';
    }
  ?>
</head>
<body>

	<header>
<!--		<menu>
			<a href="/index#">В начало</a>
			<a href="/test.php">Предложения</a>
      <a href="/pages/shooter.php">shooter</a>
			<a href="/test">Кейсы</a>
			<a href="/index#feedback">Контакты</a>
		</menu> -->
	</header>
