"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#errorMessage").show();
};

var handlePasswordChange = function handlePasswordChange(message) {
    $("#successMessage").text(message);
    $("#successMessage").show();
};
var sendAjax = function sendAjax(action, data) {
    $.ajax({
        cache: false,
        type: "POST",
        url: action,
        data: data,
        dataType: "json",
        success: (result, status, xhr) => {
            $('#errorMessage').hide();

            window.location = result.redirect;
        },
          error: (xhr, status, error) => {
            const messageObj = JSON.parse(xhr.responseText);
      
            handleError(messageObj.error);
          }   
    });
};


$(document).ready(function () {
    $("#signupForm").on("submit", function (e) {
        e.preventDefault();

        $("#errorMessage").hide();

        if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
            handleError("All fields are required");
            return false;
        }

        if ($("#pass").val() !== $("#pass2").val()) {
            handleError("Passwords do not match");
            return false;
        }

        sendAjax($("#signupForm").attr("action"), $("#signupForm").serialize());

        return false;
    });

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        $("#errorMessage").hide();

        if ($("#user").val() == '' || $('#pass').val() == '') {
            handleError("All fields required");
            return false;
        }

        sendAjax($("#loginForm").attr("action"), $("#loginForm").serialize());

        return false;
    });

    $("#changePasswordForm").on("submit", function (e) {
        e.preventDefault();


        if ($("#currentPassword").val() == '' || $("#newPass").val() == '' || $("#newPass2").val() == '') {
            handleError("All fields are required");
            return false;
        }

        if ($("#newPass").val() !== $("#newPass2").val()) {
            
            handleError("Passwords do not match");
            return false;
        }

        $("#errorMessage").hide();
        handlePasswordChange('Password successfully changed');

        sendAjax($("#changePasswordForm").attr("action"), $("#changePasswordForm").serialize());

        return false;
    });
});