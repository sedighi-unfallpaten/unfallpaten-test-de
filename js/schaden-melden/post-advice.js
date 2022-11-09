// opponent validation

var firstNameOpponentValid = false;
var lastNameOpponentValid = false;
var emailOpponentValid = false;
var phoneOpponentValid = false;
var dateOpponentValid = false;
var vehicleLocationOpponentValid = false;


function testOpponent() {
    if (firstNameOpponentValid && lastNameOpponentValid && emailOpponentValid && phoneOpponentValid && dateOpponentValid && vehicleLocationOpponentValid) {
        $("#submit-opponent").prop("disabled", false);
        $("#submit-opponent").css("cursor", "pointer");
    } else {
        $("#submit-opponent").prop("disabled", true);
        $("#submit-opponent").css("cursor", "not-allowed");
    }
}

// unclear validation

var firstNameUnclearValid = false;
var lastNameUnclearValid = false;
var emailUnclearValid = false;
var phoneUnclearValid = false;
var vehicleLocationUnclearValid = false;

function testUnclear() {
    if (firstNameUnclearValid && lastNameUnclearValid && emailUnclearValid && phoneUnclearValid && vehicleLocationUnclearValid) {
        $("#submit-unclear").prop("disabled", false);
        $("#submit-unclear").css("cursor", "pointer");
    } else {
        $("#submit-unclear").prop("disabled", true);
        $("#submit-unclear").css("cursor", "not-allowed");
    }
}

$(document).ready(function () {

    // opponent validation

    $("#submit-opponent").prop("disabled", true).css("cursor", "not-allowed");

    $("#firstname-opponent").on('input', function() {
        firstNameOpponentValid = $("#firstname-opponent").val().length > 0;
        testOpponent();
    });

    $("#lastname-opponent").on('input', function() {
        lastNameOpponentValid = $("#lastname-opponent").val().length > 0;
        testOpponent();
    });

    $("#email-opponent").on('input', function() {
        emailOpponentValid = $("#email-opponent").val().length > 0;
        testOpponent();
    });

    $("#phone-opponent").on('input', function() {
        phoneOpponentValid = $("#phone-opponent").val().length > 0;
        testOpponent();
    });

    $("#date-opponent").on('input', function() {
        dateOpponentValid = $("#date-opponent").val().length > 0;
        testOpponent();
    });
    $("#vehicle-location-opponent").on('input', function() {
        vehicleLocationOpponentValid = $("#vehicle-location-opponent").val().length > 0;
        testOpponent();
    });

    // unclear validation

    $("#submit-unclear").prop("disabled", true).css("cursor", "not-allowed");

    $("#firstname-unclear").on('input', function() {
        firstNameUnclearValid = $("#firstname-unclear").val().length > 0;
        testUnclear();
    });

    $("#lastname-unclear").on('input', function() {
        lastNameUnclearValid = $("#lastname-unclear").val().length > 0;
        testUnclear();
    });

    $("#email-unclear").on('input', function() {
        emailUnclearValid = $("#email-unclear").val().length > 0;
        testUnclear();
    });

    $("#phone-unclear").on('input', function() {
        phoneUnclearValid = $("#phone-unclear").val().length > 0;
        testUnclear();
    });
    $("#vehicle-location-unclear").on('input', function() {
        vehicleLocationUnclearValid = $("#vehicle-location-unclear").val().length > 0;
        testUnclear();
    });


    // form submits

    $("#form-input-opponent").submit(function (event) {
        event.preventDefault();
    });

    $("#submit-opponent").click(function () {
        postOpponentAjaxRequest();
    });

    $("#form-input-unclear").submit(function (event) {
        event.preventDefault();
    });

    $("#submit-unclear").click(function () {
        postUnclearAjaxRequest();
    });
});

function postOpponentAjaxRequest() {

    $(document).ajaxStart(function () {
        Pace.restart();
    });
    var overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            $("#submit-opponent").prop("disabled", true);
            var formData = $('form[name=form-input-opponent]').serialize();

            $.ajax({
                type: "POST",
                contentType: 'application/x-www-form-urlencoded',
                url: "https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/opponent",
                data: formData,
                complete: function (xhr, status) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        location.replace("https://www.unfallpaten.de/erfolg.html");
                    } else {
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    }
                },
            });
        }, 3000);
}

function postUnclearAjaxRequest() {

    $(document).ajaxStart(function () {
        Pace.restart();
    });
    var overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            $("#submit-unclear").prop("disabled", true);

            $.ajax({
                type: "POST",
                contentType: 'application/x-www-form-urlencoded',
                url: "https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/unclear",
                data: $('form[name=form-input-unclear]').serialize(),
                complete: function (xhr, status) {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        location.replace("https://www.unfallpaten.de/erfolg.html");
                    } else {
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    }
                },
            });
        }, 3000);
}


