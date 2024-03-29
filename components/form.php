<div id="feedback">
    <div class="login-box">
        <h2>Оставить заявку</h2>
        <form method="POST" onsubmit="isSendForm(event)">
            <div class="user-box">
            <input type="text" name="name" id="nameId" required>
            <label for="nameId">Имя</label>
            </div>
            <div class="user-box">
            <input type="tel" name="phone" id="phoneId" required>
            <label for="phoneId">Номер телефона</label>
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

<style>
#feedback
{
    width: 100vw;
    height: 50vh;
    margin-top: 10vh;
    position: relative;
    margin-bottom: 7vh;
}
.login-box
{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  border: 1px solid var(--white);
  border-radius: 10px;
}
.login-box h2
{
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.login-box .user-box
{
  position: relative;
}
.login-box .user-box input
{
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label
{
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label
{
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
.login-box form button.hover-button
{
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: var(--black);
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
  border: none;
  border-radius: 10rem;
}
.login-box button.hover-button:hover
{
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;}
.login-box button.hover-button span
{
  position: absolute;
  display: block;
}
.login-box button.hover-button span:nth-child(1)
{
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}
@keyframes btn-anim1
{
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box button.hover-button span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box button.hover-button span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box button.hover-button span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
</style>

<script>
    function isSendForm(event)
    {
        event.preventDefault();

        let name = document.querySelector("input[name='name']").value;
        let phone = document.querySelector("input[name='phone']").value;

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "./app/telegram/send_message_telegram.php", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function()
        {
            if (xhr.status === 200)
            {
                let messageBlock = document.querySelector('.mini-message');

                document.body.innerHTML += `<div class="mini-message">
                Заявка принята, наш менеджер скоро свяжится с вами.
                </div>`;

                messageBlock.addEventListener('click', () => {
                    messageBlock.remove();
                });

                setTimeout(() => {
                    messageBlock.remove();
                }, 7000);
            }
            else
            {
                console.error("Ошибка " + xhr.status + ": " + xhr.statusText);
            }
        };

        xhr.onerror = function()
        {
            console.error("Ошибка сети");
        };

        xhr.send("name=" + encodeURIComponent(name) + "&phone=" + encodeURIComponent(phone));
    }
</script>