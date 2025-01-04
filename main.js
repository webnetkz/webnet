// Smooth scroll
const smoothWrapper = document.querySelector('#smooth-wrapper')
if (smoothWrapper) {
	ScrollSmoother.create({
		smooth: 1.5,
		speed: 0.8,
		effects: true,
	})
}
//

// Preloader
if ($('*').is('.preloader')) {
	setTimeout(() => {
		$('.preloader__logo').css('transform', 'scale(5)')
		$('.preloader').fadeToggle(1000)
	}, 1500)
}
//

// AOS
AOS.init({
	duration: 1000,
	once: true,
})

window.addEventListener('load scroll', () => {
	AOS.refresh()
})
//

// Remove aos delay on mobile
if (window.innerWidth <= 960) {
	document.querySelectorAll('[data-aos-delay]').forEach((item) => {
		item.removeAttribute('data-aos-delay')
	})
}
//

// Hamburger
$('.header__hamburger').on('click', function () {
	$('.header__hamburger').toggleClass('active')
	$('.header__menu-wrapper').fadeToggle()
	$('body').toggleClass('scroll-disabled')
})
//

// Phone number mask
if ($('*').is('input[type="tel"]')) {
	$('input[type=tel]').inputmask({
		mask: '+9999999999999',
		showMaskOnHover: false,
		placeholder: '',
	})
}
//

// Amount mask
if ($('*').is('.payment-input')) {
	$('.payment-input').inputmask({
		mask: '9999999999999',
		showMaskOnHover: false,
		placeholder: '',
	})
}
//

// Calendar and time mask
if ($('*').is('.calendar-input')) {
	$('.calendar-input').inputmask({
		mask: '99.99.9999',
		showMaskOnHover: false,
	})
}

if ($('*').is('.time-input')) {
	$('.time-input').inputmask({
		mask: '99:99',
		showMaskOnHover: false,
	})
}
//

// Dropdown
$('.dropdown-heading').on('click', function () {
	$(this).toggleClass('active').next().slideToggle()
	$('.dropdown-heading').not(this).removeClass('active').next().slideUp()
})

$(document).on('click', (e) => {
	const dropdownHead = $('.dropdown-heading')
	const dropdownBody = $('.dropdown-heading').next()

	if (
		!dropdownHead.is(e.target) &&
		dropdownHead.has(e.target).length === 0 &&
		!dropdownBody.is(e.target) &&
		dropdownBody.has(e.target).length === 0
	) {
		dropdownBody.slideUp().prev().removeClass('active')
	}
})
//

// Blog back btn
if ($('*').is('.main__btn')) {
	gsap.to('.main__btn', {
		duration: 1,
		translateX: '150%',
		ease: 'power4.out',
		scrollTrigger: {
			trigger: '.footer',
			start: 'top bottom',
			end: 'top 75%',
			scrub: true,
		},
	})
}
//

// Scroll to top
const toTop = document.querySelector('.footer__btn')
if (toTop) {
	toTop.addEventListener('click', () => {
		window.scrollTo(0, 0)
	})
}
//

// Password toggle
const passToggle = document.querySelectorAll('.form__item-toggle')

if (passToggle) {
	passToggle.forEach((item) => {
		item.addEventListener('click', (event) => {
			const $this = event.target
			const $input = $this.previousElementSibling

			$this.classList.toggle('active')

			if ($input.type === 'password') {
				$input.type = 'text'
			} else {
				$input.type = 'password'
			}
		})
	})
}
//

// Select2
if ($('*').is('.select2')) {
	$('.select2').select2({
		minimumResultsForSearch: -1,
		width: '100%',
		selectionCssClass: 'select__heading',
		dropdownCssClass: 'select__dropdown',
		placeholder: 'Choose from list',
	})
}
//

// Offers slider
if ($('*').is('.offers')) {
	$('.offers__slider').slick({
		infinite: false,
		slidesToShow: 3,
		variableWidth: true,
		speed: 1000,
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow: $('.offers__btn-prev'),
		nextArrow: $('.offers__btn-next'),
		responsive: [
			{
				breakpoint: 960,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	})
}
//

// Get rate
if ($('*').is('.account-rate__btn')) {
	$('.account-rate__btn').on('click', function () {
		$('.account-rate__wrapper').hide()
		$('.account-rate__container').fadeIn()
	})
}
//

// Show/Back stats
if ($('*').is('.back-stats')) {
	$('.back-stats').on('click', function () {
		$('.back-stats').hide()
		$('.account-stats__container').hide()
		$('.account__form-stats').fadeIn()
	})
}

if ($('*').is('.show-stats')) {
	$('.show-stats').on('click', function () {
		$('.account__form-stats').hide()
		$('.back-stats').show()
		$('.account-stats__container').fadeIn()
	})
}
//

// Delete notifications
if ($('*').is('.account-notify__delete')) {
	$('.account-notify__delete').on('click', function () {
		$(this).closest('.account-notify__item').remove()
	})
}
//

// Delete device
if ($('*').is('.account-settings__item-delete')) {
	$('.account-settings__item-delete').on('click', function () {
		$(this).closest('.account-settings__item').remove()
	})
}
//
