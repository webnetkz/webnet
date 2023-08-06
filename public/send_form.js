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
            console.log(xhr.responseText);
            document.body.innerHTML += `<div class="mini-message">
            Заявка принята, наш менеджер скоро свяжится с вами.
            </div>`;

            setTimeout(() => {
                document.querySelector('.mini-message').remove();
            }, 3000);
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