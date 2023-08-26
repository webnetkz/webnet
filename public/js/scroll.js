async function trackScrolling() {
    while (true) {
        await new Promise((resolve) => {
            window.addEventListener('scroll', resolve, { once: true });
        });

        const scrollY = window.scrollY;
        let header = document.querySelector('header');

        if (scrollY >= 3) {
            header.style.height = '30px';
        }
        else {
            header.style.height = '55px';
        }
    }
}

trackScrolling();
