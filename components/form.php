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

<script>
    function isSendForm(event)
    {
        event.preventDefault();

        let messageBlock = document.createElement('div');
            messageBlock.classList.add('mini-message');
            messageBlock.innerHTML = 'Заявка принята, наш менеджер скоро свяжится с вами.';
                
        document.body.appendChild(messageBlock);

        messageBlock.addEventListener('click', () => {
            messageBlock.remove();
        });

        setTimeout(() => {
            messageBlock.remove();
        }, 7000);
        // END MINI-MESSAGE

        let name = document.querySelector("input[name='name']").value;
        let phone = document.querySelector("input[name='phone']").value;
        document.querySelector("input[name='name']").value = '';
        document.querySelector("input[name='phone']").value = '';

        let xhr = new XMLHttpRequest();

        xhr.open("POST", "./app/telegram/send_message_telegram.php", true);

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function()
        {
            if (xhr.status === 200)
            {
                
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