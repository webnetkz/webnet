<?php

  if (isset($_GET['msg']) && !empty($_GET['msg'])) {
    echo "<div class='message_of_user'>
    {$_GET['msg']}
    </div>
    
    <script>
      setTimeout(() => {
        document.querySelector('.message_of_user').remove();
      }, 3000);
    </script>
    ";
  }

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />

        <title><?=$title;?></title>

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />

        <meta name="keywords" content="<?=$keywords;?>">
        <meta name="description" content="<?=$description;?>">

        <!-- favicon -->
        <link
            rel="icon"
            type="image/x-icon"
            href="./img/favicon.ico"
        />

        <!-- libs css -->
        <link rel="stylesheet" href="libs/aos/aos.css" />

        <!-- main css -->
        <link rel="stylesheet" href="css/main.css" />
        <link rel="stylesheet" href="css/animation.css" />

        <!-- libs js -->
        <script defer src="libs/dynamic-adapt.js"></script>
        <script defer src="libs/jquery.min.js"></script>
        <script defer src="libs/jquery.inputmask.min.js"></script>
        <script defer src="libs/gsap/gsap.min.js"></script>
        <script defer src="libs/gsap/ScrollSmoother.min.js"></script>
        <script defer src="libs/gsap/ScrollTrigger.min.js"></script>
        <script defer src="libs/aos/aos.js"></script>

        <!-- main js -->
        <script defer src="js/main.js"></script>

        <!-- Yandex.Metrika counter -->
        <script type="text/javascript" >
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(99449211, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
          });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/99449211" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->
    </head>

    <body>
        <header class="header" data-aos="fade-down">
            <div class="container">
                <div class="header__container">
                    <div class="col-2 header__container-inner">
                        <a href="/" class="header__logo">
                            <img
                                src="img/logo.png"
                                alt="Logo"
                                class="header__logo-img"
                                style="width: 50px;"
                            />
                        </a>

                        <button
                            type="button"
                            class="header__hamburger"
                            aria-label="Hamburger menu"
                        >
                            <img
                                src="img/icons/hamburger.svg"
                                alt="Icon"
                                class="header__hamburger-icon icon-open"
                            />

                            <img
                                src="img/icons/close.svg"
                                alt="Icon"
                                class="header__hamburger-icon icon-close"
                            />
                        </button>
                    </div>

                    <div
                        class="col-2 header__menu-wrapper"
                        data-da=".header, 960, 1"
                    >
                        <nav class="header__menu">
                            <a href="/" class="header__menu-item _hul"
                                >Главная</a
                            >
                            <a href="о нас" class="header__menu-item _hul"
                                >О нас</a
                            >
                            <!-- <a href="услуги" class="header__menu-item _hul"
                                >Услуги</a
                            > -->
                            <a href="работы" class="header__menu-item _hul"
                                >Работы</a
                            >
                            <a
                                href="контакты"
                                class="header__menu-item _hul"
                                >Контакты</a
                            >
                        </nav>
                    </div>

                    <div class="col-2 header__btns">
                        <a href="контакты" class="header__btn btn _bd">
                            <span class="btn__inner">Заказать звонок</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>