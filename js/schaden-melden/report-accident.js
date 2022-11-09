var schadenMeldenStepper;
document.addEventListener('DOMContentLoaded', function () {
    schadenMeldenStepper = new Stepper(document.querySelector('#schaden-melden-stepper'));
});

function enableStepperNextButton() {
    var stepperButton = '#stepper-next-button';
    $(stepperButton).prop("disabled", false);
    $(stepperButton).css("cursor", "pointer")
}

function setWhiteBackground(id) {
    $(id).css("background-color", "white");
}

$(function () {
    $("#form-unclear").hide();
    $("#form-opponent").hide();
    $("#form-self").hide();
    $("#opponent-call").hide();


    $("#self").click(function () {
        setWhiteBackground("#opponent");
        setWhiteBackground("#unclear");
        $("#self").css("background-color", "#f39732");
        $("#form-self").show();
        $("#form-unclear").hide();
        $("#form-opponent").hide();
        $("#form-send").hide();
        $("#opponent-call").hide();
        enableStepperNextButton();
    });

    $("#opponent").click(function () {
        setWhiteBackground("#self");
        setWhiteBackground("#unclear");
        $("#opponent").css("background-color", "#f39732");
        $("#form-opponent").show();
        $("#form-self").hide();
        $("#form-unclear").hide();
        $("#form-send").show();
        $("#opponent-call").hide();
        enableStepperNextButton();
    });

    $("#unclear").click(function () {
            setWhiteBackground("#opponent");
            setWhiteBackground("#self");
            $("#unclear").css("background-color", "#f39732");
            $("#form-unclear").show();
            $("#form-opponent").hide();
            $("#form-self").hide();
            $("#form-send").show();
            $("#opponent-call").show();
            enableStepperNextButton();
        }
    );

    $("#insurance-present").change(function () {
            var selectedValue = $("#insurance-present option:selected").text();
            var insuranceName = "#name-insurance-company";
            var policeNumber = "#police-number";
            if (selectedValue === 'Nein') {
                $(insuranceName).prop('disabled', true);
                $(insuranceName).val(null);

                $(policeNumber).prop('disabled', true);
                $(policeNumber).val(null);
            } else {
                $(insuranceName).prop('disabled', false);
                $(policeNumber).prop('disabled', false);
            }
        }
    );


});

var modal = document.getElementById("agb-modal");
var btn = document.getElementById("agb-btn-first");
var btn2 = document.getElementById("agb-btn-second");
var span = document.getElementsByClassName("close")[0];

document.body.style.overflow = "auto";

btn.onclick = function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
};

btn2.onclick = function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

};

span.onclick = function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";

};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};
