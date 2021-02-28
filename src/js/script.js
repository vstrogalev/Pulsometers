$(document).ready(function(){
	$('.carousel__inner').slick({
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
		dotsClass: "my-dots",
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__front').eq(i).toggleClass('catalog-item__front_active');
				$('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__linkBack');

	// Modals
	$("[data-modal=consultation]").on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

	// Validation forms
	function validateForm(formName) {
		$(formName).validate({
			rules: {
				userName: {
					required: true,
					minlength: 2
				},
				userPhone: {
					required: true
				},
				userEmail: {
					required: true,
					email: true
				}
			},
			messages: {
				userName: {
					required: "Пожалуйста, введите свое имя",
					minlength: jQuery.validator.format("По крайней мере {0} символов требуется ввести")
				},
				userPhone: {
					required: "Пожалуйста, введите номер Вашего телефона"
				},
				userEmail: {
					required: "Пожалуйста, введите адрес почты",
					email: "Ваш адрес должен быть в формате name@domain.com"
				}
			}
		});	
	}

	validateForm('#consultForm1');
	validateForm('#consultForm2');
	validateForm('#orderForm');
	
	// Masked phone input 
	$('input[name=userPhone]').mask("+9 (999) 999-99-99");

	// Mailer php
	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
				type: "POST",
				url: "mailer/smart.php",
				data: $(this).serialize()
		}).done(function() {
				$(this).find("input").val("");
				$('#consultation, #order').fadeOut();
				$('.overlay, #thanks').fadeIn('slow');

				$('form').trigger('reset');
		});
		return false;
});

});