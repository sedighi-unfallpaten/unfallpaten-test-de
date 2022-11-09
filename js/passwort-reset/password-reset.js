var passwordResetStepper;
document.addEventListener('DOMContentLoaded', function () {
    passwordResetStepper = new Stepper(document.querySelector('#passwort-reset-stepper'));
});

let resetPasswordEmailValid = false;

$(document).ready(function () {
    $("#stepper-submit-password-reset").prop("disabled", true).css("cursor", "not-allowed");
    $('#stepper-submit-password-reset').on('click touchstart', function () {
        postPasswordResetRequest();
    });
    $("#email-password-reset").on('input', function () {
        resetPasswordEmailValid = $("#email-password-reset").val().length > 0;
        validatePasswordReset();
    });

    if ($.urlParam('email') && $.urlParam('token')) {
        postPasswordResetConfirmationRequest();
    }
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
};

function validatePasswordReset() {
    if (resetPasswordEmailValid) {
        $("#stepper-submit-password-reset").prop("disabled", false).css("cursor", "pointer");
    } else {
        $("#stepper-submit-password-reset").prop("disabled", true).css("cursor", "not-allowed");
    }
}

function postPasswordResetRequest() {
    $(document).ajaxStart(function () {
        Pace.restart();
    });
    let overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            $("#stepper-submit-password-reset").prop("disabled", true);
            let request = {'email': $('#email-password-reset').val()};

            $.ajax({
                type: "POST",
                url: "https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/users/password-reset",
                data: JSON.stringify(request),
                contentType: 'application/json',
                complete: function (xhr, status) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        location.replace("https://www.unfallpaten.de/erfolg-email.html");
                    } else {
                        $('#stepper-submit-password-reset-opponent').prop("disabled", true);
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    }
                },
            });
        }, 3000);
}

function postPasswordResetConfirmationRequest() {
    $(document).ajaxStart(function () {
        Pace.restart();
    });
    let overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            $("#stepper-submit-password-reset").prop("disabled", true);
            let request = {'email': $.urlParam('email'), 'token': $.urlParam('token')};

            $.ajax({
                type: "POST",
                url: "https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/users/password-reset-confirmation",
                data: JSON.stringify(request),
                contentType: 'application/json',
                complete: function (xhr, status) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        location.replace("https://www.unfallpaten.de/erfolg-email.html");
                    } else {
                        $('#stepper-submit-password-reset-opponent').prop("disabled", true);
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    }
                },
            });
        }, 3000);
}
