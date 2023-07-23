document.addEventListener('mousemove', e => 
{
	Object.assign(document.documentElement, 
    {
		style: `
			--move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
			--move-y: ${(e.clientY - window.innerHeight / 2) * .01}deg;
		`
	})

	/**
	 * Mobile
	 */

    if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1))
    {

		window.addEventListener("deviceorientation", function(event)
		{

			let beta = (Math.round(event.beta) / 180) * 6;
			let gamma = (Math.round(event.gamma) / 90) * 3;

			Object.assign(document.documentElement, 
			{
				style: `
					--move-x: ${(beta - window.innerWidth / 2) * -.005}deg;
					--move-y: ${(gamma - window.innerHeight / 2) * .01}deg;
				`
			})
		}, true);


    }
})