$(document).ready(function() {
    $(".handling-accident-step-accordian .handling-accident-step-heading").click(function() {
        if (!$(this).parent().hasClass("active")) {
            $(".handling-accident-step-accordian").removeClass("active");
            $(".handling-accident-step-accordian .handling-accident-step-content").slideUp();
        }
        $(this).parent().toggleClass("active");
        $(this).parent().find(".handling-accident-step-content").slideToggle();
    });

    $(".rental-car-wrap .rental-car-content a").click(function() {
        $(".rental-car-wrap .rental-car-content ul.rental-car-hide-show").slideToggle();
    });

    $(".stadt-right-content ul li a").click(function() {
        $(this).parent().find(".more-text").slideToggle();
    });
});

$('.customers-say-slider').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [{
            breakpoint: 767,
            settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: "<button type='button' class='slick-prev pull-left'><img src='assets/img/page/left-arrow.svg' alt=''></button>",
                nextArrow: "<button type='button' class='slick-next pull-right'><img src='assets/img/page/right-arrow.svg' alt=''></button>"
            }
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});

jQuery(window).scroll(startCounter);

function startCounter() {
    var hT = jQuery('.counter-wrap').offset().top,
        hH = jQuery('.counter-wrap').outerHeight(),
        wH = jQuery(window).height();
    //   console.log(hT);
    //   console.log(hH);
    var a = jQuery(window).scrollTop();
    //   console.log(a);
    var b = (hT + hH - wH);
    var c = b - a;
    //   console.log(c);
    if (jQuery(window).scrollTop() > hT + hH - wH) {
        jQuery(window).off("scroll", startCounter);
        jQuery('.count').each(function() {
            var $this = jQuery(this);
            jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.ceil(this.Counter).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."));
                }
            });
        });
    }
}