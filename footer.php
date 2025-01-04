<?php
  require_once './feedback.php';
?>
<footer class="footer" data-aos="fade-up">
  <div class="container">
      <div class="footer__container">
          <div class="footer__top">
              <a href="index.html" class="footer__logo">
                  <img
                      src="img/logo.png"
                      alt="Logo"
                      class="footer__logo-img"
                  />
              </a>

              <div class="footer__social">
                  <a
                      href="https://www.instagram.com/"
                      class="footer__social-item btn"
                      target="_blank"
                  >
                      <span class="btn__inner">
                          <svg
                              class="footer__social-icon"
                              width="25"
                              height="26"
                              viewBox="0 0 25 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  d="M16.99 13.0281C16.99 15.5214 14.9614 17.55 12.4681 17.55C9.97477 17.55 7.9462 15.5214 7.9462 13.0281C7.9462 10.5348 9.97477 8.50623 12.4681 8.50623C14.9614 8.50623 16.99 10.5347 16.99 13.0281ZM24.8024 6.84683V19.1528C24.8024 22.5456 22.0421 25.3058 18.6494 25.3058H6.34342C2.95066 25.3058 0.19043 22.5456 0.19043 19.1528V6.84683C0.19043 3.45408 2.95066 0.693848 6.34342 0.693848H18.6494C22.0421 0.693848 24.8024 3.45408 24.8024 6.84683ZM19.2081 13.0281C19.2081 9.31158 16.1846 6.28814 12.4681 6.28814C8.75156 6.28814 5.72812 9.31158 5.72812 13.0281C5.72812 16.7447 8.75156 19.7681 12.4681 19.7681C16.1846 19.7681 19.2081 16.7447 19.2081 13.0281ZM21.7259 5.37258C21.7259 4.48778 21.0084 3.77034 20.1236 3.77034C19.2388 3.77034 18.5214 4.48778 18.5214 5.37258C18.5214 6.25738 19.2388 6.97481 20.1236 6.97481C21.0084 6.97468 21.7259 6.25738 21.7259 5.37258Z"
                                  fill="#3B82F6"
                              />
                          </svg>

                          <span>Instagram</span>
                      </span>
                  </a>

                  <a
                      href="https://t.me/"
                      class="footer__social-item btn"
                      target="_blank"
                  >
                      <span class="btn__inner">
                          <svg
                              class="footer__social-icon"
                              width="30"
                              height="25"
                              viewBox="0 0 30 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path
                                  d="M2.47397 10.8011C2.47397 10.8011 15.3016 5.3983 19.7504 3.49585C21.4559 2.73493 27.2394 0.299779 27.2394 0.299779C27.2394 0.299779 29.9088 -0.765506 29.6863 1.82172C29.6121 2.88711 29.019 6.61577 28.4258 10.6489C27.536 16.3561 26.5721 22.596 26.5721 22.596C26.5721 22.596 26.4238 24.3463 25.1633 24.6506C23.9028 24.955 21.8266 23.5853 21.4559 23.2809C21.1592 23.0526 15.8948 19.6283 13.9669 17.9541C13.4479 17.4976 12.8547 16.5845 14.041 15.5191C16.7104 13.0079 19.8987 9.88798 21.8266 7.90949C22.7164 6.99628 23.6061 4.8656 19.8987 7.45283C14.6343 11.1816 9.44389 14.682 9.44389 14.682C9.44389 14.682 8.25749 15.4429 6.03307 14.7581C3.80856 14.0733 1.21337 13.1601 1.21337 13.1601C1.21337 13.1601 -0.566081 12.0187 2.47397 10.8011Z"
                                  fill="#3B82F6"
                              />
                          </svg>

                          <span>Telegram</span>
                      </span>
                  </a>
              </div>
          </div>
            <div class="footer__middle">
                <form class="footer__form" action="./app/subscribe.php" method="POST" data-da=".footer__top, 960, 1">
                  <p class="footer__form-heading">
                    Подпишитесь и оставайтесь в курсе всех новостей.
                  </p>
                  <div class="footer__form-container">
                    <input
                      type="email"
                      name="E-mail"
                      placeholder="Your E-mail"
                      class="footer__form-input"
                      required
                    />

                    <button
                      type="submit"
                      class="footer__form-submit btn"
                      aria-label="Submit form"
                    >
                      <span class="btn__inner">
                        <svg
                          class="footer__form-icon"
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.4274 3.0783C20.9274 2.5673 20.1874 2.3783 19.4974 2.5783L3.40742 7.2273C2.67942 7.4293 2.16342 8.0063 2.02442 8.7383C1.88242 9.4843 2.37842 10.4323 3.02642 10.8283L8.05742 13.9003C8.57342 14.2163 9.23942 14.1373 9.66642 13.7093L15.4274 7.9483C15.7174 7.6473 16.1974 7.6473 16.4874 7.9483C16.7774 8.2373 16.7774 8.7083 16.4874 9.0083L10.7164 14.7693C10.2884 15.1973 10.2084 15.8613 10.5234 16.3783L13.5974 21.4283C13.9574 22.0273 14.5774 22.3683 15.2574 22.3683C15.3374 22.3683 15.4274 22.3683 15.5074 22.3573C16.2874 22.2583 16.9074 21.7273 17.1374 20.9773L21.9074 5.0083C22.1174 4.3283 21.9274 3.5883 21.4274 3.0783Z"
                            fill="#3B82F6"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </form>

                <div class="footer__contacts">
                    <a
                        href="tel:+77078453424"
                        class="footer__contacts-item"
                    >
                        <img
                            src="img/icons/call.svg"
                            alt="Icon"
                            class="footer__contacts-icon"
                        />

                        <span
                            class="footer__contacts-wrapper"
                        >
                            <span
                                class="footer__contacts-caption"
                                >Телефон:</span
                            >
                            <span
                                class="footer__contacts-data"
                                >+7(707) 845-3424</span
                            >
                        </span>
                    </a>

                    <a
                        href="mail:webnet.kz@gmail.com"
                        class="footer__contacts-item"
                        target="_blank"
                    >
                        <img
                            src="img/icons/mail.svg"
                            alt="Icon"
                            class="footer__contacts-icon"
                        />

                        <span
                            class="footer__contacts-wrapper"
                        >
                            <span
                                class="footer__contacts-caption"
                                >E-mail:</span
                            >
                            <span
                                class="footer__contacts-data"
                                >webnet.kz@gmail.com</span
                            >
                        </span>
                    </a>

                    <a
                        href="https://maps.app.goo.gl/AMfoEYkuL9mZ3yabA"
                        class="footer__contacts-item"
                        target="_blank"
                    >
                        <img
                            src="img/icons/location.svg"
                            alt="Icon"
                            class="footer__contacts-icon"
                        />

                        <span
                            class="footer__contacts-wrapper"
                        >
                            <span
                                class="footer__contacts-caption"
                                >Адрес:</span
                            >
                            <address
                                class="footer__contacts-data"
                            >
                                Ауэзова 64/2
                            </address>
                        </span>
                    </a>
                </div>
            </div>

            <div class="footer__bottom">
                <span class="footer__copyrights"
                    >©2018-<?=date('Y');?> WebNet
                </span>

                <button class="footer__btn btn">
                    <span class="btn__inner">
                        <svg
                            class="footer__btn-icon"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g
                                id="Iconly/Light/Arrow - Up 2"
                            >
                                <g id="Arrow - Up 2">
                                    <path
                                        id="Stroke 1"
                                        d="M2.91683 9.5415L7.00016 5.45817L11.0835 9.5415"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                            </g>
                        </svg>
                    </span>
                </button>
            </div>
          </div>
      </div>
  </footer>
</div>
</div>
</div>
</body>
</html>
