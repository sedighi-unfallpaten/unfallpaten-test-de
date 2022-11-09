$(document).ready(function () {

    $("#newsletter").submit(function (event) {
        event.preventDefault();
    });

    $("#submit-newsletter").click(function () {
        if ($('#email').val().length === 0) {
            return;
        }
        postNewsletterAjaxRequest();
    });

});

function postNewsletterAjaxRequest() {

    $(document).ajaxStart(function () {
        Pace.restart();
    });
    var overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            $.ajax({
                type: "PUT",
                contentType: 'application/x-www-form-urlencoded',
                url: "https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/newsletters",
                data: $('form[name=newsletter]').serialize(),
                complete: function (xhr, status) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        location.replace("https://www.unfallpaten.de/erfolg-eingang.html");
                    } else {
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    }
                },
            });

        }, 3000);
}
