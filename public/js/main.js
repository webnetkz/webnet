document.addEventListener('DOMContentLoaded', () =>
{
    const classes = ['layer-1', 'layer-2', 'layer-5', 'layer-6'];
    const images = [
        './public/img/layer-1.webp',
        './public/img/layer-2.webp',
        './public/img/layer-5.webp',
        './public/img/layer-6.webp'
    ];

    classes.forEach((className, index) =>
    {
        const elements = document.getElementsByClassName(className);
        for(let i = 0; i < elements.length; i++)
        {
            elements[i].style.backgroundImage = `url(${images[index]})`;
        }
    });
});

