var firstnameSelfseriveValid = false;
var lastnameSelfServiceValid = false;
var emailSelfserviceValid = false;
var phoneSelfservice = false;

var streetnameSelfseriveValid = false;
var plzSelfServiceValid = false;
var citySelfserviceValid = false;
var dateOfAccidentSelfserviceValid = false;
var fahrzeugscheinVorneSelfserviceValid = false;

function validateKundendaten() {
    if (firstnameSelfseriveValid && lastnameSelfServiceValid && emailSelfserviceValid && phoneSelfservice) {
        $("#stepper-next-kundendaten").prop("disabled", false);
        $("#stepper-next-kundendaten").css("cursor", "pointer");
    } else {
        $("#stepper-next-kundendaten").prop("disabled", true);
        $("#stepper-next-kundendaten").css("cursor", "not-allowed");
    }
}

function validateAddress() {
    if (streetnameSelfseriveValid && plzSelfServiceValid && citySelfserviceValid) {
        $("#stepper-next-address").prop("disabled", false);
        $("#stepper-next-address").css("cursor", "pointer");
    } else {
        $("#stepper-next-address").prop("disabled", true);
        $("#stepper-next-address").css("cursor", "not-allowed");
    }
}

function validateAccidentDate() {
    if (dateOfAccidentSelfserviceValid) {
        $("#stepper-next-accident-details").prop("disabled", false);
        $("#stepper-next-accident-details").css("cursor", "pointer");
    } else {
        $("#stepper-next-accident-details").prop("disabled", true);
        $("#stepper-next-accident-details").css("cursor", "not-allowed");
    }
}

function validateFahrzeugscheinVorne() {
    if (fahrzeugscheinVorneSelfserviceValid) {
        $("#stepper-next-fotoupload").prop("disabled", false);
        $("#stepper-next-fotoupload").css("cursor", "pointer");
    } else {
        $("#stepper-next-fotoupload").prop("disabled", true);
        $("#stepper-next-fotoupload").css("cursor", "not-allowed");
    }
}

$(document).ready(function () {

    // kundendaten validation

    $("#stepper-next-kundendaten").prop("disabled", true);
    $("#stepper-next-kundendaten").css("cursor", "not-allowed");

    $("#firstname-selfservice").on('input', function () {
        firstnameSelfseriveValid = $("#firstname-selfservice").val().length > 0;
        validateKundendaten();
    });

    $("#lastname-selfservice").on('input', function () {
        lastnameSelfServiceValid = $("#lastname-selfservice").val().length > 0;
        validateKundendaten();
    });

    $("#email-selfservice").on('input', function () {
        emailSelfserviceValid = $("#email-selfservice").val().length > 0;
        validateKundendaten();
    });

    $("#phone-selfservice").on('input', function () {
        phoneSelfservice = $("#phone-selfservice").val().length > 0;
        validateKundendaten();
    });

    // address validation

    $("#stepper-next-address").prop("disabled", true).css("cursor", "not-allowed");

    $("#streetname").on('input', function () {
        streetnameSelfseriveValid = $("#streetname").val().length > 0;
        validateAddress();
    });

    $("#plz").on('input', function () {
        plzSelfServiceValid = $("#plz").val().length > 0;
        validateAddress();
    });

    $("#city").on('input', function () {
        citySelfserviceValid = $("#city").val().length > 0;
        validateAddress();
    });


    // accident details validation

    $("#stepper-next-accident-details").prop("disabled", true).css("cursor", "not-allowed");

    $("#date-of-accident").on('input', function () {
        dateOfAccidentSelfserviceValid = $("#date-of-accident").val().length > 0;
        validateAccidentDate();
    });

    // Fahrzeugschein validation

    //$("#stepper-next-fotoupload").prop("disabled", true).css("cursor", "not-allowed");

    /*    $("#fahrzeugscheinvorne-input").on('change', function() {
            fahrzeugscheinVorneSelfserviceValid = imagesToUpload.get('fahrzeugscheinvorne') !== undefined;
            // fahrzeugscheinVorneSelfserviceValid = $("#fahrzeugscheinvorne-input").val().length > 0;
            validateFahrzeugscheinVorne();
        });*/


    // form submits
    /*
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
        });*/
});

var modalFotoupload = document.getElementById("agb-modal-fotoupload");
var btnFotoupload = document.getElementById("agb-btn-fotoupload");
var spanFotoupload = document.getElementById("close");

document.body.style.overflow = "auto";

btnFotoupload.onclick = function () {
    modalFotoupload.style.display = "block";
    document.body.style.overflow = "hidden";
};


spanFotoupload.onclick = function () {
    modalFotoupload.style.display = "none";
    document.body.style.overflow = "auto";

};

window.onclick = function (event) {
    if (event.target === modalFotoupload) {
        modalFotoupload.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
