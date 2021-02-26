$(document).ready(function(){
    $('.carousel__inner').slick({
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/chevron-left-solid.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron-right-solid.png"></button>',
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
  });