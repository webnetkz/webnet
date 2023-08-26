async function trackScrolling()
{
    while(true)
    {
        await new Promise((resolve) => {
            window.addEventListener('scroll', resolve, { once: true });
        });

        const scrollY = window.scrollY;


        if(scrollY >= 3)
        {
            document.querySelector('header').style.height = '30px';
        }
        else
        {
            document.querySelector('header').style.height = '55px';
        }
    }
}

trackScrolling();
