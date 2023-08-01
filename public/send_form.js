document.querySelector("#feedback form").addEventListener("submit", function(event)
{
    event.preventDefault();

    console.log(event);

    let name = document.querySelector("input[name='name']").value;
    let phone = document.querySelector("input[name='phone']").value;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "./app/send_message_tel.php", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function()
    {
        if (xhr.status === 200)
        {
            console.log(xhr.responseText); // Вывод ответа в консоль (для отладки)
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
});