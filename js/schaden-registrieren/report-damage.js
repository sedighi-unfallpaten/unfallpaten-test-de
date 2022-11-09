let upg;
let zuordnungen = new Map([]);
$(document).ready(function () {
    if (!$.urlParam('upg')) {
        location.replace("https://www.unfallpaten.de/");
    } else {
        const parser = new UAParser();
        const result = parser.getResult();
        const supportedBrowsers = ["chrome", "chromium", "firefox", "safari", "mobile safari", "edge"];
        const includesSupportedBrowser = supportedBrowsers.includes(result.browser.name.toLowerCase());
        if (!includesSupportedBrowser) {
            location.replace("https://www.unfallpaten.de/fehler-browser.html");
        }
        upg = $.urlParam('upg');
        preflight();
        init();
    }
});

$('#last-next-button').click(function () {
    $("#signature-pad-wrapper").css({top: '0px', left: '0px', position: 'unset'});
    resizeCanvas();
});

$('#last-previous-button').click(function () {
    $("#signature-pad-wrapper").css({top: '-9999px', left: '-9999px', position: 'absolute'});
});

$('.btn-bg-orange').click(function () {
    window.scrollTo({top: 0, behavior: 'smooth'});
});


function nextStepperWithEvaluation() {
    schadenRegistrierenStepper.next();
    let activePane = $('.bs-stepper-pane.content.active.dstepper-block').attr('id');
    $('#step-' + zuordnungen.get(activePane)).find('.bs-stepper-circle').css('background-color', '#f39732')
}

function previousStepperWithEvaluation() {
    schadenRegistrierenStepper.previous();
    let activePane = $('.bs-stepper-pane.content.active.dstepper-block').attr('id');
    let activePaneNumber = Number(zuordnungen.get(activePane)) + 1;
    $('#step-' + activePaneNumber).find('.bs-stepper-circle').css('background-color', '#a0a6ab')
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);
    if (results == null) {
        return 0;
    }
    return results[1] || 0;
};

function detailsOfOpponentSelect() {
    var selectedValue = $('#details-of-opponent').val();
    if (selectedValue === "true") {
        $('#details-of-opponent-true').show()
    } else {
        $('#details-of-opponent-true').hide()
    }
}

function documentedByPoliceSelect() {
    var selectedValue = $('#documented-by-police').val();
    if (selectedValue === "true") {
        $('#documented-by-police-true').show()
    } else {
        $('#documented-by-police-true').hide()
    }
}

function compensation() {
    var selectedValue = $('#compensation').val();
    if (selectedValue === "Auszahlung") {
        $('#compensation-payment-true').show()
    } else {
        $('#compensation-payment-true').hide()
    }
}


function replacementVehicle() {
    var selectedValue = $('#replacement-vehicle').val();
}

function init() {

    $('#fotoupload-fahrzeug').fileupload({
        singleFileUploads: true,
    });

    $('#fotoupload-beschaedigungsbereich').fileupload({
        singleFileUploads: true,
    });

    $('#details-of-opponent-true').hide();
    $('#documented-by-police-true').hide();
    $('#compensation-payment-true').hide();

    var svgIcons = ['fahrzeugscheinvorne', 'fahrzeugscheinhinten', 'kilometerstand', 'unfallbericht', 'vornelinksquer', 'vornerechtsquer', 'hintenlinksquer',
        'hintenrechtsquer', 'unfallseite', 'nahaufnahme1', 'nahaufnahme2', 'nahaufnahme3', 'sonstiges1', 'sonstiges2'];
    svgIcons.forEach(function (entry) {
        $('#' + entry + '-icon').html(uploadSvg);
    });

    zuordnungen.set('test-l-1', '1');
    zuordnungen.set('test-l-2', '1');
    zuordnungen.set('test-l-3', '2');
    zuordnungen.set('test-l-4', '2');
    zuordnungen.set('test-l-5', '2');
    zuordnungen.set('test-l-6', '3');
    zuordnungen.set('test-l-7', '3');
    zuordnungen.set('test-l-8', '4');
    zuordnungen.set('test-l-9', '5');
    $('#step-1').find('.bs-stepper-circle').css('background-color', '#f39732')

}

const imagesToUpload = new Map();
const allowedFileTypes = ['heif', 'HEIF', 'heic', 'HEIC', 'jpg', 'JPG', 'jpeg', 'JPEG', 'png', 'PNG'];
const fileTypeError = 'Dateityp nicht erlaubt!';
const allowedMaxFileSize = 20 * 1024 * 1024;
const fileSizeError = 'Selektierte Datei zu groß!';


$('#fotoupload-fahrzeug').bind('fileuploadadd', function (e, data) {
    var eventTargetId = e.delegatedEvent.originalEvent.target.id;
    var eventTarget = eventTargetId.replace('-input', '');

    imagesToUpload.delete(eventTarget);

    var uploadErrors = [];
    var ext = data.originalFiles[0].name.split('.').pop().toLowerCase();
    if ($.inArray(ext, allowedFileTypes) === -1) {
        uploadErrors.push(fileTypeError);
    }
    if (data.originalFiles[0].size > (allowedMaxFileSize)) {
        uploadErrors.push(fileSizeError);
    }

    if (uploadErrors.length > 0) {
        alert(uploadErrors.join("\n"));
        if (eventTargetId === 'fahrzeugscheinvorne-input') {
            $("#stepper-next-fotoupload").prop("disabled", true).css("cursor", "not-allowed");
            $('#' + eventTarget + '-button').css("color", "grey");
            $('#' + eventTarget + '-icon').html(uploadSvg);
            return;
        } else {
            $('#' + eventTarget + '-button').css("color", "grey");
            $('#' + eventTarget + '-icon').html(uploadSvg);
            return;
        }
    }

    imagesToUpload.set(eventTarget, data.files);
    onUploadImageChange(e.delegatedEvent.originalEvent.target.id);

    fahrzeugscheinVorneSelfserviceValid = imagesToUpload.get('fahrzeugscheinvorne') !== undefined;
    fahrzeugscheinVorneSelfserviceValid = true;
    validateFahrzeugscheinVorne();
});

$('#fotoupload-beschaedigungsbereich').bind('fileuploadadd', function (e, data) {
    var eventTargetId = e.delegatedEvent.originalEvent.target.id;
    var eventTarget = eventTargetId.replace('-input', '');

    imagesToUpload.delete(eventTarget);

    var uploadErrors = [];
    var ext = data.originalFiles[0].name.split('.').pop().toLowerCase();
    if ($.inArray(ext, allowedFileTypes) === -1) {
        uploadErrors.push(fileTypeError);
    }
    if (data.originalFiles[0].size > (allowedMaxFileSize)) {
        uploadErrors.push(fileSizeError);
    }

    if (uploadErrors.length > 0) {
        alert(uploadErrors.join("\n"));
        $('#' + eventTarget + '-button').css("color", "grey");
        $('#' + eventTarget + '-icon').html(uploadSvg);
        return;
    }

    imagesToUpload.set(eventTarget, data.files);
    onUploadImageChange(e.delegatedEvent.originalEvent.target.id)
});

$('#signature-pad-canvas').on('mouseup', function () {
    if (signaturePad._data.length > 0) {
        $("#stepper-submit-fotoupload").prop("disabled", false);
        $("#stepper-submit-fotoupload").css("cursor", "pointer");
    } else {
        $("#stepper-submit-fotoupload").prop("disabled", true);
        $("#stepper-submit-fotoupload").css("cursor", "not-allowed");
    }
});

$('#signature-pad-clear').on('click', function () {
    $("#stepper-submit-fotoupload").prop("disabled", true);
    $("#stepper-submit-fotoupload").css("cursor", "not-allowed");
});

function openUploadInfo(target) {
    document.getElementById("upload-info-" + target).style.width = "100%";
    $('#upload-info').show();
}

function closeUploadInfo(target) {
    document.getElementById("upload-info-" + target).style.width = "0%";
    $('#upload-info').hide();
}


function onUploadImageChange(inputId) {
    var plainId = inputId.replace('-input', '');

    /*    var titleSelector = $('#' + plainId + '-title');
        var titleValue = titleSelector.html();
        if (titleValue.includes('(')) {
            titleValue = titleValue.split('(')[0].trim()
        }

        var count = 0;
        for (let [key, value] of imagesToUpload) {
            if (key.includes(plainId)) {
                count++;
            }
        }
        titleSelector.html(titleValue + ' (' + count + ')');*/

    $('#' + plainId + '-button').css("color", "green");
    $('#' + plainId + '-icon').html(checkSvg);
}


$('#stepper-submit-fotoupload').on('click touchstart', function () {
    postFormUpload();
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function buildImagesToUploadFormData() {
    const formData = [];
    for (let [key, value] of imagesToUpload) {
        const base64 = await toBase64(value[0]);
        const image = {
            upgReference: upg,
            name: key,
            fileName: value[0].name,
            type: base64.split(";", 2)[0].replace('data:', ''),
            base64: base64.split("base64,", 2)[1]
        };
        formData.push(image);
    }

    const signature = signaturePad.toDataURL('image/png').split("base64,", 2)[1];
    formData.push({
        upgReference: upg,
        name: 'signatur',
        fileName: 'signatur.png',
        type: 'image/png',
        base64: signature
    });
    return formData;
}

function postFormUpload() {
    $(document).ajaxStart(function () {
        Pace.restart();
    });
    let overlay = $("#overlay");
    overlay.height($(document).height());
    overlay.show();

    let imagesToUpload = [];
    buildImagesToUploadFormData().then((value) => imagesToUpload = value);

    setTimeout(
        function () {
            const request = {};
            request.upgReference = upg;
            request.salutation = $('#salutation').val();
            request.firstName = $('#firstname-selfservice').val();
            request.lastName = $('#lastname-selfservice').val();
            request.email = $('#email-selfservice').val();
            request.phone = $('#phone-selfservice').val();
            request.address = $('#streetname').val();
            request.zip = $('#plz').val();
            request.city = $('#city').val();
            request.dateOfAccident = $('#date-of-accident').val();
            request.timeOfAccident = $('#time-of-accident').val();
            request.placeOfAccident = $('#place-of-accident').val();
            request.licensePlaceOpponent = $('#license-plate').val();
            request.detailsOfOpponentKnown = ($('#details-of-opponent').val() === 'true');
            request.firstNameOfOpponent = $('#first-name-of-opponent').val();
            request.lastNameOfOpponent = $('#last-name-of-opponent').val();
            request.streetOfOpponent = $('#street-of-opponent').val();
            request.postalCodeOfOpponent = $('#postal-code-of-opponent').val();
            request.cityOfOpponent = $('#city-of-opponent').val();
            request.insuranceOfOpponent = $('#insurance-of-opponent').val();
            request.ticketNumberOpponent = $('#ticket-number-opponent').val();
            request.insuranceNumberOfOpponent = $('#insurance-number-of-opponent').val();
            request.documentedByPolice = ($('#documented-by-police').val() === 'true');
            request.fileNumber = $('#file-number').val();
            request.policeDepartment = $('#police-department').val();
            request.detailedDamageDescription = $('#detailed-damage-description').val();
            request.replacementVehicle = ($('#replacement-vehicle').val() === 'true');
            request.compensation = $('#compensation').val();
            request.iban = $('#iban').val();
            request.comments = $('#comments').val();
            request.lawyerUsage = $('#lawyer-usage').is(":checked");


            $.ajax({
                url: 'https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/registration',
                data: JSON.stringify(request),
                contentType: 'application/json',
                type: 'POST',
                success: function (data, xhr, status) {
                    if (!data || data.registrationSuccess === false) {
                        postflight('registration-error', data, xhr, status);
                        location.replace("https://www.unfallpaten.de/fehler.html");
                    } else {
                        let successfulUploads = 0;
                        imagesToUpload.forEach(function (image) {
                            $.ajax({
                                url: 'https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/registration/attachment',
                                data: JSON.stringify(image),
                                contentType: 'application/json',
                                type: 'POST',
                                complete: function (data, xhr, status) {
                                    if (!data || data.registrationSuccess === false) {
                                        postflight('image-upload-error', data, xhr, status);
                                        location.replace("https://www.unfallpaten.de/fehler.html");
                                    } else {
                                        successfulUploads++;
                                        if (imagesToUpload.length === successfulUploads) {
                                            location.replace("https://www.unfallpaten.de/erfolg-eingang.html");
                                        }
                                    }
                                },
                            });
                        });
                    }
                }
            });
        }, 7000);
}

function preflight() {
    $(document).ajaxStart(function () {
        Pace.restart();
    });
    let overlay = $("#preflight-overlay");
    overlay.height($(document).height());
    overlay.show();

    setTimeout(
        function () {
            const request = {};
            request.upg = upg;
            request.browser = browserReportSync();
            $.ajax({
                url: 'https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/registration/preflight',
                data: JSON.stringify(request),
                contentType: 'application/json',
                dataType: 'json',
                type: 'POST',
                complete: function (data, xhr, status) {
                    if (!data.responseJSON) {
                        postflight('preflight-error', data, xhr, status);
                    }
                    overlay.hide();

                    var adviceData = data.responseJSON;

                    if (adviceData.salutation) {
                        $('#salutation').val(adviceData.salutation).change();
                    }
                    $('#firstname-selfservice').val(adviceData.firstName).trigger("input");
                    $('#lastname-selfservice').val(adviceData.lastName).trigger("input");
                    $('#email-selfservice').val(adviceData.email).trigger("input");
                    $('#phone-selfservice').val(adviceData.phone).trigger("input");
                    validateKundendaten();

                    $('#streetname').val(adviceData.street).trigger("input");
                    $('#plz').val(adviceData.zipCode).trigger("input");
                    $('#city').val(adviceData.city).trigger("input");
                    validateAddress();

                    $('#date-of-accident').val(adviceData.unfalldatum).trigger("input");
                    $('#time-of-accident').val(adviceData.unfallzeit).trigger("input");
                    $('#place-of-accident').val(adviceData.unfallort).trigger("input");
                    $('#detailed-damage-description').val(adviceData.detaillierteUnfallbeschreibung).trigger("input");
                    validateAccidentDate();

                    $('#license-plate').val(adviceData.gegenseiteKennzeichen).trigger("input");
                    if (adviceData.gegenseiteDetails) {
                        $('#details-of-opponent').val('true').change();
                    } else {
                        $('#details-of-opponent').val('false').change();
                    }
                    $('#first-name-of-opponent').val(adviceData.gegenseiteVorname).trigger("input");
                    $('#last-name-of-opponent').val(adviceData.gegenseiteNachname).trigger("input");
                    $('#street-of-opponent').val(adviceData.gegenseiteStrasse).trigger("input");
                    $('#postal-code-of-opponent').val(adviceData.gegenseitePlz).trigger("input");
                    $('#city-of-opponent').val(adviceData.gegenseiteStadt).trigger("input");
                    $('#insurance-of-opponent').val(adviceData.gegenseiteVersicherung).trigger("input");
                    $('#ticket-number-opponent').val(adviceData.schadennummer).trigger("input");
                    $('#insurance-number-of-opponent').val(adviceData.gegenseiteVersicherungsnummer).trigger("input");

                    if (adviceData.polizeilichAufgenommen) {
                        $('#documented-by-police').val('true').change();
                    } else {
                        $('#documented-by-police').val('false').change();
                    }

                    $('#file-number').val(adviceData.polizeiAktenzeichen).trigger("input");
                    $('#police-department').val(adviceData.polizeikommisariat).trigger("input");

                    if (adviceData.ersatzfahrzeugGewuenscht) {
                        $('#replacement-vehicle').val('true').change();
                    } else {
                        $('#replacement-vehicle').val('false').change();
                    }

                    if (adviceData.abrechnungsart) {
                        $('#compensation').val(adviceData.abrechnungsart).change();
                    }

                    if (adviceData.iban) {
                        $('#iban').val(adviceData.iban).trigger("input");
                    }
                },
            });
        }, 3500);
}

function postflight(errorType, data, xhr, status) {
    setTimeout(
        function () {
            const request = {};
            request.upg = upg;
            request.data = data;
            request.xhr = xhr;
            request.status = status;
            request.errorType = errorType;

            $.ajax({
                url: 'https://c1mntyc8ac.execute-api.eu-central-1.amazonaws.com/unfallpaten-service/api/assessments/advice/registration/postflight',
                data: JSON.stringify(request),
                contentType: 'application/json',
                type: 'POST',
                complete: function (xhr, status) {
                    location.replace("https://www.unfallpaten.de/fehler.html");
                },
            });
        }, 500);
}

function resetFormUpload() {
    imagesToUpload.clear();

    $('.fileinput-button').each(function () {

        var titleValue = $(this).parent().find('p').html();
        if (titleValue.includes('(')) {
            titleValue = titleValue.split('(')[0].trim()
        }
        $(this).parent().find('p').html(titleValue);

        $(this).css("color", "grey");
        $(this).find('span').html(uploadSvg);
    });

    $('.files').html('');
}

var checkSvg = `<svg class="bi bi-check" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
</svg>`;

var uploadSvg = `<svg class="bi bi-arrow-bar-up" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.354 5.854a.5.5 0 000-.708l-3-3a.5.5 0 00-.708 0l-3 3a.5.5 0 10.708.708L8 3.207l2.646 2.647a.5.5 0 00.708 0z" clip-rule="evenodd"/>
  <path fill-rule="evenodd" d="M8 10a.5.5 0 00.5-.5V3a.5.5 0 00-1 0v6.5a.5.5 0 00.5.5zm-4.8 1.6c0-.22.18-.4.4-.4h8.8a.4.4 0 010 .8H3.6a.4.4 0 01-.4-.4z" clip-rule="evenodd"/>
</svg>`;


var schadenRegistrierenStepper;
document.addEventListener('DOMContentLoaded', function () {
    schadenRegistrierenStepper = new Stepper(document.querySelector('#schaden-registrieren-stepper'));
});

