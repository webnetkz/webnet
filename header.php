<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />

        <title>SITE | Blog</title>

        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="format-detection" content="telephone=no" />

        <!-- favicon -->
        <link
            rel="icon"
            type="image/x-icon"
            sizes="192x192"
            href="img/favicon.ico"
        />

        <!-- libs css -->
        <link rel="stylesheet" href="libs/aos/aos.css" />

        <!-- main css -->
        <link rel="stylesheet" href="css/main.css" />

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
    </head>

    <body>
        <header class="header" data-aos="fade-down">
            <div class="container">
                <div class="header__container">
                    <div class="col-2 header__container-inner">
                        <a href="index.php" class="header__logo">
                            <img
                                src="img/logo.svg"
                                alt="Logo"
                                class="header__logo-img"
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
                            <a href="about.html" class="header__menu-item _hul"
                                >About us</a
                            >
                            <a
                                href="services.html"
                                class="header__menu-item _hul"
                                >Services</a
                            >
                            <a
                                href="pricing.html"
                                class="header__menu-item _hul"
                                >Pricing</a
                            >
                            <a href="faq.html" class="header__menu-item _hul"
                                >FAQ</a
                            >
                            <a href="blog.php" class="header__menu-item _hul"
                                >Работы</a
                            >
                            <a
                                href="contact.php"
                                class="header__menu-item _hul"
                                >Контакты</a
                            >
                        </nav>
                    </div>

                    <div class="col-2 header__btns">
                        <a href="sign-up.html" class="header__btn btn _bd">
                            <span class="btn__inner">Sign up</span>
                        </a>
                        <a
                            href="log-in.html"
                            class="header__btn btn _bg-accent"
                        >
                            <span class="btn__inner">Sign in</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>