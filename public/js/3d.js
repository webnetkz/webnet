document.addEventListener('mousemove', e => 
{
	if(isMobile())
	{
		Object.assign(document.documentElement, 
		{
			style: `
				--move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
				--move-y: ${(e.clientY - window.innerHeight / 2) * .01}deg;
			`
		})
	}
})