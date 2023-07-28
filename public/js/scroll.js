async function trackScrolling()
{
    while(true)
    {
        await new Promise((resolve) => {
            window.addEventListener('scroll', resolve, { once: true });
        });

        const scrollY = window.scrollY;
        const h1 = document.querySelector('h1');
        const h2 = document.querySelector('.hero-content-p');
        const button = document.querySelector('.hero-content .button');

        if(scrollY >= 3)
        {
            if((scrollY / 100) >= 1)
            {
                h1.style.transform = `scale(${scrollY / 100})`;
            }

            h2.style.marginLeft = `${scrollY}px`;
            button.style.marginRight = `${scrollY}px`;
        }
    }
}

trackScrolling();
