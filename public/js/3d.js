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
		  let container = document.querySelector('section.layers');
		  let beta = (Math.round(event.beta) / 180) * 6;
		  let gamma = (Math.round(event.gamma) / 90) * 3;
  
		  const maxRotation = 30;
		  beta *= maxRotation;
		  gamma *= maxRotation;
  
		  container.style.transform = 'rotateX(' + -beta + 'deg) rotateY(' + gamma + 'deg)';
		}, true);


    }
})