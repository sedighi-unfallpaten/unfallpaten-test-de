var counterTeaserL = $('#inViewport');
var winHeight = $(window).height();
if (counterTeaserL.length) {
    var firEvent = false, objectPosTop = counterTeaserL.offset().top;
    var elementViewInBottom = objectPosTop - winHeight;
    $(window).on('scroll', function () {
        var currentPosition = $(document).scrollTop();
        if (currentPosition > elementViewInBottom && firEvent === false) {
            firEvent = true;
            $('.count').each(function () {
                $(this).prop('Counter', 0).animate({
                    Counter: $(this).text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function (now) {
                        $(this).text(Math.ceil(now));
                    }
                });
            });
        }
    });
}
