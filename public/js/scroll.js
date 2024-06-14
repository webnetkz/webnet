async function trackScrolling()
{
    while (true)
    {
        await new Promise((resolve) => {
            window.addEventListener('scroll', resolve, { once: true });
        });

        const scrollY = window.scrollY;

        if (scrollY >= 3)
        {

        }
        else {

        }
    }
}

trackScrolling();
