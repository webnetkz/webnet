<?php

require_once './app/telegram/visit_telegram.php';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="UTF-8">
	<meta name="description" content="WebNet разработка сайтов и приложений">
	<link rel="icon" type="image/png" href="./public/img/icon.png">
	<link rel="manifest" href="./manifest.json">
	<meta name="theme-color" content="#000"/>
	<meta name="google-site-verification" content="KnCNMaptYRR7po3CwfepSJQK-YphmObbrallV8LeKlA" />

    <title>WebNet</title>

    <link rel="stylesheet" href="./dist/min.css">
</head>
<body>
    <!-- <div class="logo" style="background-image: url(./public/img/logo.png); background-size: 50%;"></div> -->

	<section class="layers">
		<div class="layers-container">
			<div class="layers-item layer-1""></div>
			<div class="layers-item layer-2""></div>
			<div class="layers-item layer-3">
				<div class="hero-content">
					<h1>Разработка<span>цифровых продуктов</span></h1>
					<div class="hero-content-p">WEB, IOS, MacOS, Android, Windows, Linux</div>
					<a class="button" href="tel:+77076691424">+7 707 669 14 23</a>
				</div>
			</div>
			<div class="layers-item layer-4">
				<canvas class="rain"></canvas>
			</div>
			<div class="layers-item layer-5"></div>
			<div class="layers-item layer-6"></div>
		</div>
	</section>


    <div class="utp-section">	

		<section class="wrapper">
			<div class="top">WebNet</div>
			<div class="bottom" aria-hidden="true">WebNet</div>
		</section>

		<h1>Самые высокие мировые стандарты разработки!</h1>

        <div class="promo">
            <p>
				Прохождение всех тестов от 
				<b style="font-size: 2rem; display: inline-block;">
					<span style="color: #4284F3;">G</span> 
					<span style="color: #ea4436;margin: -7px;">O</span>
					<span style="color: #FABC08;margin: -3px;">O</span>
					<span style="color: #4284F3;margin: -3px;">G</span>
					<span style="color: #33A853;margin: -8px;">L</span>
					<span style="color: #ea4436;">E</span>
				</b>
				<br>
				<b>SEO</b> оптимизация на <b>100%</b>
				<br>
				Прогрессивные WEB приложения <b>PWA</b>
			</p>
            <button class="button" onclick="location.href = './pages/lighthouse.html'">Подробнее</button>
        </div>

    </div>

	<div id="feedback">
		<div class="login-box">
			<h2>Оставить заявку</h2>
			<form method="POST">
				<div class="user-box">
				<input type="text" name="name" required>
				<label>Имя</label>
				</div>
				<div class="user-box">
				<input type="tel" name="phone" required>
				<label>Номер телефона</label>
				</div>
				<button class="hover-button" type="submit">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Отправить
				</button>
			</form>
		</div>
	</div>


	<?php

	require_once './components/footer.php';

	?>




	<script src="./dist/min.js" async></script>
	<script src="./public/send_form.js"></script>



	<!-- Google tag (gtag.js) -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-NXX9RKVMT0"></script>
	<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'G-NXX9RKVMT0');
	</script>
	<script>
		// if('serviceWorker' in navigator)
		// {
		// 	window.addEventListener('load', function()
		// 	{
		// 		navigator.serviceWorker.register('/sw.js').then(function(registration)
		// 		{
		// 			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		// 		}, function(err)
		// 		{
		// 			// registration failed :(
		// 			console.log('ServiceWorker registration failed: ', err);
		// 		});
		// 	});
		// }

	</script>
</body>
</html>