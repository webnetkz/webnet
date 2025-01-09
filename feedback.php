<section id="feedback" class="feedback">
  <div class="container">
      <div class="feedback__container">
          <div
              class="feedback__container-box box-style col-3"
              data-aos="fade-right"
          >
              <h1 class="feedback__title title">
                  Мы будем
                  <span class="_c-accent"
                      >рады</span
                  >
                  заявке от
                  <span class="_c-accent"
                      >Вас</span
                  >
              </h1>
              <p class="feedback__subtitle">
                  и с радостью ответим <br />
                  на все ваши вопросы
              </p>
          </div>

          <form
              class="feedback__form col-3"
              data-aos="fade-left"
              method="POST"
              action="./telegram.php"
          >
              <div class="feedback__form-inputs">
                  <input
                      class="feedback__form-input"
                      type="text"
                      name="name"
                      placeholder="Ваше имя"
                      required
                  />

                  <input
                      class="feedback__form-input"
                      type="tel"
                      name="phone"
                      placeholder="Ваш номер"
                      required
                  />

                  <textarea
                      class="feedback__form-textarea"
                      name="message"
                      placeholder="Напишите ваше сообщение..."
                  ></textarea>
              </div>

              <button
                  type="submit"
                  class="feedback__form-submit btn"
                  aria-label="Submit form"
              >
                  <span class="btn__inner">Отправить</span>
              </button>
          </form>
      </div>
  </div>
</section>