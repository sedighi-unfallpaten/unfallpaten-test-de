function openNav() {
    document.getElementById("pagenav").style.width = "100%";
    $('#pagenav').show();
}

function closeNav() {
    document.getElementById("pagenav").style.width = "0%";
    // $('#pagenav').hide();
    $('#submenu-mobile').hide();
    $('.fa-angle-up').hide();
    $('.fa-angle-down').show();
}

$(document).ready(function () {
    $('#pagenav').hide();

    $('#submenu-mobile').hide();
    $('.fa-angle-up').hide();

    $('nav li ul').hide().removeClass('fallback');
    $('nav li').hover(
        function () {
            $('ul', this).stop().slideDown(100);
        },
        function () {
            $('ul', this).stop().slideUp(100);
        }
    );

    $('#dropdown-mobile').click(function () {
        var submenuMobile = $('#submenu-mobile');
        submenuMobile.toggle();
        if (submenuMobile.is(":visible")) {
            $('.fa-angle-down').hide();
            $('.fa-angle-up').show();
        }
        if (submenuMobile.is(":hidden")) {
            $('.fa-angle-down').show();
            $('.fa-angle-up').hide();
        }
    });
});

$(window).scroll(function () {
    var sticky = $('.nav-sticky'),
        scroll = $(window).scrollTop();
    if (scroll >= 150) {
        sticky.css('background-color', 'rgb(34, 34, 34)');
    } else {
        sticky.css('background-color', 'transparent');
    }
});
